const ClientError = require('./client-error');

function errorMiddleware(err, req, res, next) {
  if (err instanceof ClientError) {
    res.status(err.status).json({
      error: err.message
    });
  } else {
    console.error(err.message);
    if (err.message === 'duplicate key value violates unique constraint "users_username_key"') {
      res.status(500).json({
        error: 'user already exists'
      });
    } else {
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    }

  }
}

module.exports = errorMiddleware;
