import { kv } from '@vercel/kv';

interface RateLimitConfig {
  maxRequests?: number;
  windowMs?: number;
}

export async function checkRateLimit(
  identifier: string,
  config: RateLimitConfig = {}
): Promise<{ success: boolean; remaining: number; resetTime: number }> {
  const maxRequests = config.maxRequests || 
    parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '5');
  const windowMs = config.windowMs || 
    parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'); // 15 minutes default

  const now = Date.now();
  const key = `ratelimit:${identifier}`;

  try {
    const data = await kv.get<{ count: number; resetTime: number }>(key);

    if (!data || now > data.resetTime) {
      const resetTime = now + windowMs;
      const ttlSeconds = Math.ceil(windowMs / 1000);
      
      await kv.set(key, { count: 1, resetTime }, { ex: ttlSeconds });
      
      return {
        success: true,
        remaining: maxRequests - 1,
        resetTime,
      };
    }

    if (data.count >= maxRequests) {
      return {
        success: false,
        remaining: 0,
        resetTime: data.resetTime,
      };
    }

    const newCount = data.count + 1;
    const ttlSeconds = Math.ceil((data.resetTime - now) / 1000);
    
    await kv.set(key, { count: newCount, resetTime: data.resetTime }, { ex: ttlSeconds });

    return {
      success: true,
      remaining: maxRequests - newCount,
      resetTime: data.resetTime,
    };
  } catch (error) {
    console.error('Rate limiter error:', error);
    // If Redis fails, allow the request.
    // This prevents the rate limiter from breaking the entire app
    return {
      success: true,
      remaining: maxRequests,
      resetTime: now + windowMs,
    };
  }
}
