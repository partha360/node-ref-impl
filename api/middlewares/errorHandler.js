const logger = require('../config/logger')

module.exports = function(err, req, res, next) {
  console.log('inside error handler')
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  logger.error(
    `${err.status || 500} - ${err.message} - ${err.stack} - ${req.originalUrl} - ${req.method} - ${
      req.ip
    }`
  )

  // render the error page
  res.status(err.status || 500)
  res.send(err.status, err.message)
}
