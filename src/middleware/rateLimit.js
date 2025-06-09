
const rateLimitWindowMs = 15 * 60 * 1000; // 15 minutes
const maxRequests = 100; // Max requests per IP
const ipRequestCounts = new Map(); // In-memory store

exports.rateLimiter = (req, res, next) =>{
  const ip = req.ip;
  const currentTime = Date.now();

  if (!ipRequestCounts.has(ip)) {
    ipRequestCounts.set(ip, []);
  }

  const timestamps = ipRequestCounts.get(ip);

  // Remove timestamps outside the rate limit window
  const updatedTimestamps = timestamps.filter(timestamp => currentTime - timestamp < rateLimitWindowMs);

  // Update the map
  updatedTimestamps.push(currentTime);
  ipRequestCounts.set(ip, updatedTimestamps);

  if (updatedTimestamps.length > maxRequests) {
    return res.status(429).json({ message: 'Too many requests. Please try again later.' });
  }

  next();
}