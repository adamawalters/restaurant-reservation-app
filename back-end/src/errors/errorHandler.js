/**
 * Express API error handler.
 */


function logErrors(err, req, res, next) {
  console.error(err);
  next(err);
}

function errorHandler(err, req, res, next) {
  const { status = 500, message = "Something went wrong!" } = err;
  res.status(status).json({ error: message });
}

module.exports = {
  logErrors,
  errorHandler, 
}
