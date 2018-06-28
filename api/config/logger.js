const appRoot = require('app-root-path')
const winston = require('winston')

const options = {
  combined: {
    level: 'info',
    filename: `${appRoot}/api/logs/app-combined.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false
  },
  fileError: {
    level: 'error',
    filename: `${appRoot}/api/logs/app-error.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true
  }
}

const logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.combined),
    new winston.transports.File(options.fileError),
    new winston.transports.Console(options.console)
  ],
  exitOnError: false // do not exit on handled exceptions
})

logger.stream = {
  write: function(message, encoding) {
    logger.info(message)
  }
}

module.exports = logger
