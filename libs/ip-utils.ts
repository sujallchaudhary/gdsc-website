import { headers } from 'next/headers';

/**
 * Get the client's IP address from request headers
 * Checks multiple headers to handle various proxy configurations
 */
export async function getClientIp(): Promise<string> {
  const headersList = await headers();
  
  const cfIP = headersList.get("cf-connecting-ip");
  const forwarded = headersList.get("x-forwarded-for");
  const realIP = headersList.get("x-real-ip");
  const xClientIP = headersList.get("x-client-ip");
  const xForwarded = headersList.get("x-forwarded");
  const xCluster = headersList.get("x-cluster-client-ip");
  const forwarded2 = headersList.get("forwarded");

  if (cfIP) return cfIP;
  if (realIP) return realIP;
  if (xClientIP) return xClientIP;
  if (forwarded) return forwarded.split(",")[0].trim();
  if (xForwarded) return xForwarded.split(",")[0].trim();
  if (xCluster) return xCluster;
  if (forwarded2) {
    const match = forwarded2.match(/for=([^;,\s]+)/);
    if (match) return match[1].replace(/["\[\]]/g, "");
  }

  return "unknown";
}

/**
 * Validate if an IP address is valid
 */
export function isValidIp(ip: string): boolean {
  if (ip === 'unknown') return false;
  
  const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
  if (ipv4Regex.test(ip)) {
    const parts = ip.split('.');
    return parts.every(part => {
      const num = parseInt(part);
      return num >= 0 && num <= 255;
    });
  }
  
  const ipv6Regex = /^([0-9a-fA-F]{0,4}:){2,7}[0-9a-fA-F]{0,4}$/;
  return ipv6Regex.test(ip);
}
