import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const mode = process.env.MODE; // Access the MODE environment variable
    const url = new URL(request.url);
  
    // Check if MODE is production and the pathname is /api-doc
    if (mode === 'production' && url.pathname === '/api-doc') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  
    // If not redirecting, return the original response
    return NextResponse.next();
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/api-doc'],
}