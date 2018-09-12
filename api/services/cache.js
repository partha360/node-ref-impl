const mongoose = require('mongoose')
const redis = require('redis')
const util = require('util')
require('dotenv').config()
// Setup redis
const redisUrl = `redis://${process.env.REDIS_URL}:${process.env.REDIS_PORT}`
const client = redis.createClient(redisUrl)
client.hget = util.promisify(client.hget)

// Hook redis cache into mongoose query
const exec = mongoose.Query.prototype.exec

mongoose.Query.prototype.cache = function(options = {}) {
  this.enableCache = true
  this.cacheKey = JSON.stringify(options.key || 'default') // Main cache key

  return this
}

mongoose.Query.prototype.exec = async function() {
  // Query from db if cache not enabled for the exec query
  if (!this.enableCache) {
    return exec.apply(this, arguments)
  }

  const key = JSON.stringify(
    Object.assign({}, this.getQuery(), {
      collection: this.mongooseCollection.name
    })
  )

  const cacheValue = await client.hget(this.cacheKey, key)

  if (cacheValue) {
    const cachedDoc = JSON.parse(cacheValue)
    console.log('Reading blogs from redis cache...')
    return Array.isArray(cachedDoc)
      ? cachedDoc.map(d => new this.model(d)) //eslint-disable-line
      : new this.model(cachedDoc) //eslint-disable-line
  }

  const result = await exec.apply(this, arguments)

  client.hset(this.cacheKey, key, JSON.stringify(result), 'EX', 1000) // Expire cache in 1000 secs
  console.log('Reading blogs from mongodb...')

  return result
}

module.exports = {
  clearCacheKey(cacheKey) {
    client.del(JSON.stringify(cacheKey))
  }
}
