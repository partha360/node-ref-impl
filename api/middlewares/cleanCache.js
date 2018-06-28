const { clearCacheKey } = require('../services/cache')

module.exports = async (req, res, next) => {
  await next() // Ensure request handler is run in route

  clearCacheKey(req.user.id)
}
