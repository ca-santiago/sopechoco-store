import { createClient } from 'redis';

const redisClient = createClient({
  url: 'redis://default:sxXbHnxfuBhiNnznqzcoTmcRlABKdPDz@autorack.proxy.rlwy.net:59449',
});

redisClient.connect();

redisClient.on('connect', () => {
  console.log('[SERVER] Redis client connected');
});

redisClient.on('error', (err) => {
  console.error('[SERVER] Redis client error:', err);
});

export default redisClient;