const redis = require('redis');

const redisClient = redis.createClient({
    url: process.env.REDIS_URL
});

redisClient.on('connect', () => console.log('Redis connected (utils)'));
redisClient.on('error', (err) => console.error('Redis error (utils):', err));
(async () => { try { await redisClient.connect(); } catch (e) { console.error(e); } })();

module.exports = redisClient; 