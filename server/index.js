require('dotenv/config');
const argon2 = require('argon2');
const express = require('express');

const jwt = require('jsonwebtoken');
const db = require('./db');
const ClientError = require('./client-error');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const randomImages = require('./random-images');
const { clearInterval } = require('timers');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});
const jsonMiddleware = express.json();

const users = [];
const readyUsers = [];

app.use(staticMiddleware);
app.use(jsonMiddleware);

app.get('/api/test', (req, res) => {
  res.send('Server is working');
});

app.get('/api/auth/sign-up', (req, res, next) => {
  const { username } = req.body;
  const sql = `
  select "userId"
  from "users"
  where
    "username" = $1
  `;
  const params = [username];
  db.query(sql, params)
    .then(result => {
      const [user] = result.rows;
      res.status(200).json(user);
    })
    .catch(err => next(err));
});

app.get('/api/user/:userId', (req, res, next) => {
  const userId = Number(req.params.userId);
  if (!userId) {
    throw new ClientError(401, 'invalid user');
  }
  const sql = `
  select "firstName",
         "lastName",
         "email",
         "username"
      from "users"
    where "userId" = $1
  `;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      const [user] = result.rows;
      if (!user) {
        throw new ClientError(401, 'invalid user');
      }
      res.status(201).json(user);
    })
    .catch(err => next(err));

});

app.put('/api/user/:userId', (req, res, next) => {
  const userId = Number(req.params.userId);
  const { firstName, lastName, email, username } = req.body;
  if (!userId) {
    throw new ClientError(401, 'invalid user');
  }
  const sql = `
    update "users"
      set "firstName" = $2,
          "lastName" = $3,
          "email" = $4,
          "username" = $5
    where "userId" = $1
    returning "userId", "username"
  `;
  const params = [userId, firstName, lastName, email, username];

  db.query(sql, params)
    .then(result => {
      const [user] = result.rows;
      if (!user) {
        throw new ClientError(401, 'invalid user');
      }
      res.status(201).json(user);
    })
    .catch(err => next(err));
});

app.delete('/api/user/:userId', (req, res, next) => {
  const userId = Number(req.params.userId);
  if (!userId) {
    throw new ClientError(401, 'invalid user');
  }
  const sql = `
    delete from "users"
      where "userId" = $1
      returning "userId"
  `;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      const [user] = result.rows;
      if (!user) {
        throw new ClientError(401, 'invalid user');
      }
      res.status(201).json(user);
    })
    .catch(err => next(err));
});

app.post('/api/auth/sign-up', (req, res, next) => {

  const { firstName, lastName, email, userName, password } = req.body;
  if (!firstName || !lastName || !userName || !password) {
    throw new ClientError(400, 'First Name, Last Name, username and password are required fields');
  }
  argon2
    .hash(password)
    .then(hashedPassword => {
      const sql = `
        insert into "users" ("firstName", "lastName", "email", "username", "hashedPassword")
        values ($1, $2, $3, $4, $5)
        returning "userId", "username"
      `;
      const params = [firstName, lastName, email, userName, hashedPassword];
      return db.query(sql, params);
    })
    .then(result => {
      const [user] = result.rows;
      res.status(201).json(user);
    })
    .catch(err => next(err));
});

app.post('/api/auth/sign-in', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(401, 'invalid login');
  }
  const sql = `
    select "userId",
           "hashedPassword"
      from "users"
    where "username" = $1
  `;
  const params = [username];
  db.query(sql, params)
    .then(result => {
      const [user] = result.rows;
      if (!user) {
        throw new ClientError(401, 'invalid login');
      }
      const { userId, hashedPassword } = user;
      return argon2
        .verify(hashedPassword, password)
        .then(isMatching => {
          if (!isMatching) {
            throw new ClientError(401, 'invalid login');
          }
          const payload = { userId, username };
          const token = jwt.sign(payload, process.env.TOKEN_SECRET);
          res.status(201).json({ token, user: payload });
        });
    })
    .catch(err => next(err));

});

app.post('/api/games', (req, res, next) => {
  const { game } = req.body;
  if (!game) {
    throw new ClientError(401, 'invalid game');
  }
  const sql = `
    insert into "games" ("gameName")
    values ($1)
    returning *
  `;
  const params = [game];
  db.query(sql, params)
    .then(result => {
      const [game] = result.rows;
      res.status(201).json(game);
    })
    .catch(err => next(err));
});

app.get('/api/game/:gameName', (req, res, next) => {
  const gameName = req.params.gameName;
  if (!gameName) {
    throw new ClientError(401, 'invalid user');
  }
  const sql = `
  select *
    from "games"
    where "gameName" = $1
  `;
  const params = [gameName];
  db.query(sql, params)
    .then(result => {
      const [game] = result.rows;
      if (!game) {
        throw new ClientError(401, 'invalid game');
      }
      res.status(201).json(game);
    })
    .catch(err => next(err));
});

app.get('/api/cards', (req, res, next) => {
  const sql = `
    select "cardId",
          "cardName"
      from "cards"
  `;
  db.query(sql)
    .then(result => {
      const cards = result.rows;
      res.status(200).json(cards);
    })
    .catch(err => next(err));
});

app.get('/api/images', (req, res, next) => {
  const sql = `
    select "cardName",
           "imageId",
           "imageName",
           "imageUrl"
      from "cards"
    join "imagesAssigned" using ("cardId")
    join "images" using ("imageId")
  `;
  db.query(sql)
    .then(result => {
      const images = result.rows;
      res.status(200).json(images);
    })
    .catch(err => next(err));
});

app.post('/api/cards', (req, res, next) => {
  const { userId, cardId, gameId } = req.body;
  if ((!userId) && (!cardId) && (!gameId)) {
    throw new ClientError(401, 'invalid information');
  }
  const sql = `
    insert into "cardsAssigned"
                ("userId",
                 "cardId",
                 "gameId")
           values ($1, $2, $3)
           returning *
  `;

  const params = [userId, cardId, gameId];
  db.query(sql, params)
    .then(result => {
      const cardsAssigned = result.rows;
      res.status(201).json(cardsAssigned);
    })
    .catch(err => next(err));

});

app.post('/api/game', (req, res, next) => {
  const { cardId } = req.body;

  if (!cardId) {
    throw new ClientError(401, 'invalid information');
  }

  const sql = `
  select "cards"."cardId",
         "cards"."cardName",
         "images"."imageId",
         "images"."imageName",
         "images"."imageUrl"
         from "cards"
         join "imagesAssigned" using ("cardId")
         join "images" using ("imageId")
         where "imagesAssigned"."cardId" = $1

  `;
  const params = [cardId];
  db.query(sql, params)
    .then(result => {
      const card = result.rows;
      res.status(201).json(card);
    })
    .catch(err => next(err));
});

app.get('/api/game', (req, res, next) => {
  const sql = `
  select "imageId",
         "imageName",
         "imageUrl"
   from "images"
  `;
  db.query(sql)
    .then(result => {
      const images = result.rows;
      res.status(200).json(images);
    })
    .catch(err => next(err));
});

app.post('/api/points', (req, res, next) => {
  const { gameId, userId, points } = req.body;

  if ((!gameId) || (!userId) || (!points)) {
    throw new ClientError(401, 'invalid information');
  }

  const sql = `
    insert into "points"
                ("gameId",
                "userId",
                "points")
          values ($1, $2, $3)
          returning *
  `;
  const params = [gameId, userId, points];
  db.query(sql, params)
    .then(result => {
      const points = result.rows;
      res.status(201).json(points);
    })
    .catch(err => next(err));
});

app.post('/api/userPoints', (req, res, next) => {
  const { gameId, username } = req.body;
  if ((!gameId) && (!username)) {
    throw new ClientError(401, 'invalid information');
  }

  const sql = `
    select "users"."username",
           sum("points"."points") as "totalPoints"
           from "users"
           join "points" using ("userId")
           join "games" using ("gameId")
           where "users"."username" = $1
           and "games"."gameId" = $2
           group by "users"."username"
  `;
  const params = [username, gameId];
  db.query(sql, params)
    .then(result => {
      const [userPoints] = result.rows;
      if (userPoints === undefined) {
        const userPoints = {
          username: username,
          totalPoints: 0
        };

        res.status(201).json(userPoints);
      } else {
        res.status(201).json(userPoints);
      }
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

http.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);

});

io.on('connection', socket => {
  // eslint-disable-next-line no-console
  console.log(`Server connected: ${socket.id}`);

  socket.on('join', function (room, username) {
    socket.join(room);
    io.sockets.in(room).emit('connectedToRoom', username);

    const user = { room, username };
    const connectedUsers = [];
    users.push(user);

    for (let i = 0; i < users.length; i++) {
      if (users[i].room === room) {
        connectedUsers.push(users[i].username);
      }
    }

    io.sockets.in(room).emit('usersInRoom', connectedUsers);

    const roomReadyUsers = [];
    readyUsers.push(user);

    for (let i = 0; i < readyUsers.length; i++) {
      if (readyUsers[i].room === room) {
        roomReadyUsers.push(readyUsers[i].username);
      }
    }

    io.in(room).emit('ready', roomReadyUsers);

  });

  socket.on('startGame', function (game) {
    io.in(game).emit('enableButtons', false);

    function roomImageHandler(game) {
      const cardNumber = randomImages();
      io.in(game).emit('imageId', cardNumber);
    }

    this.timer = setInterval(roomImageHandler, 2000, game);

    socket.on('stopGetMessage', function (game) {
      clearInterval(this.timer);
      io.in(game).emit('stopGame', true, game);
      for (let i = readyUsers.length - 1; i >= 0; i--) {
        if (readyUsers[i].room === game) {
          readyUsers.splice(i, 1);
        }
      }
    });

  });

  socket.on('updatingPoints', function (game, username, points) {
    io.in(game).emit('receivingUpdatePoints', username, points);
  });

  socket.on('gettingLoteria', function (game, username) {
    io.in(game).emit('10points', true, username);
  });

  socket.on('disconnect', () => {
    // eslint-disable-next-line no-console
    console.log(`Server disconnect: ${socket.id}`);
  });

});
