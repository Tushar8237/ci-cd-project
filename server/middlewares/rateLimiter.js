const rateLimitWindowsMS = 15 * 60 * 1000; // 15 minutes
const maxRequestsPerWindow = 100;

const ipRequestMap = new Map();

export const rateLimiter = (req, res, next) => {
    const ip = req.ip === '::1' ? '127.0.0.1' : req.ip;

    const now = Date.now();

    const requestLog = ipRequestMap.get(ip) || [];

    // Filter out request older than 15 minutes
    const recentRequest = requestLog.filter(
        (timestamp) => now - timestamp <= rateLimitWindowsMS
    );

    if (recentRequest.length >= maxRequestsPerWindow) {
        return res.status(429).json({
            message: "Too many request. Try again later",
        });
    }

    // Add the current timestamp and update map
    recentRequest.push(now);
    ipRequestMap.set(ip, recentRequest);

    next();
};
