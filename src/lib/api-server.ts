import 'server-only';
import { cookies } from 'next/headers';

export async function fetchServer(endpoint: string, options: RequestInit = {}) {
  // Await cookies() for Next.js 15+ compatibility (it's also async in recent versions)
  // If you are on an older version where cookies() is synchronous, you can remove await, 
  // but await is safer for future-proofing.
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token');
  
  // Note: The backend expects the cookie named 'access_token'
  // We need to forward it in the Cookie header string
  const cookieHeader = token ? `access_token=${token.value}` : '';

  // Ensure leading slash
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

  // For Server Components, we want to talk directly to the backend to avoid 
  // the overhead of a self-request to the Next.js proxy.
  // We prioritize the BACKEND_URL.
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL 
    ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1` 
    : (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1');

  const res = await fetch(`${apiUrl}${cleanEndpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      Cookie: cookieHeader, // Forward the cookie to backend
      'Content-Type': 'application/json',
    },
    // Don't cache dynamic user data by default unless specified
    cache: options.cache || 'no-store', 
  });

  if (!res.ok) {
    if (res.status === 401) return null; 
    // You might want to throw or return null depending on usage
    // throw new Error('API Error');
    console.error(`Fetch failed for ${endpoint}: ${res.status} ${res.statusText}`);
    return null; 
  }

  return res.json();
}
