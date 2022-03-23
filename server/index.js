require('dotenv/config');
const argon2 = require('argon2');
const express = require('express');
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

app.post('/api/auth/sign-up', (req, res, next) => {
  console.log('req.body', req.body);
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

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
