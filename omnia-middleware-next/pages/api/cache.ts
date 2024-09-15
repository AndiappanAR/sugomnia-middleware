// pages/api/cache.js
import NodeCache from 'node-cache';

// Create a cache with a TTL (Time to Live) of 600 seconds (10 minutes)
const cache = new NodeCache({ stdTTL: 600 });

export default function handler(req, res) {
  const cacheKey = 'cachedData';

  if (req.method === 'GET') {
    // Retrieve cached data
    const data = cache.get(cacheKey);

    if (data) {
      // Return cached data if it exists
      res.status(200).json({ source: 'cache', data });
    } else {
      // If no data in cache, return an error or default value
      res.status(404).json({ message: 'Data not found in cache' });
    }
  } else if (req.method === 'POST') {
    // Store data in cache from the POST request body
    const dataToCache = req.body;

    // Save the data in the cache
    cache.set(cacheKey, dataToCache);

    // Confirm data was cached
    res.status(200).json({ message: 'Data cached successfully', data: dataToCache });
  } else {
    // Return method not allowed for non-GET/POST requests
    res.status(405).json({ message: 'Method not allowed' });
  }
}
