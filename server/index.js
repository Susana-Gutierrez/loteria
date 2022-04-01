require('dotenv/config');
const argon2 = require('argon2');
const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('./db');
const ClientError = require('./client-error');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');

const app = express();

const jsonMiddleware = express.json();

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

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
