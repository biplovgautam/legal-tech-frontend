# Cookie Handling & Authentication Changes

## Overview
We have migrated the application from manual client-side cookie management to a secure, HTTP-only cookie strategy handled by the backend and browser, with server-side verification in Next.js.

## Changes Made

### 1. `src/app/signin/page.tsx`
- **Removed Manual Cookie Setting**: Removed `js-cookie` (Cookies.set) logic. The backend now sends a `Set-Cookie` header with the `HttpOnly` flag.
- **Updated API Client**: Switched from direct `axios` usage to the centralized `@/lib/axios` client.
  - This client is configured with `withCredentials: true` to ensure cookies are sent/received automatically by the browser.
- **Fixed Infinite Loop**: Removed logic that redirected users to `/signin` if they weren't logged in (which caused loops when already on the sign-in page).
- **Added `router.refresh()`**: Triggers a server component update after login to ensure the new cookie is recognized by SSR.

### 2. `src/middleware.ts` (New)
- Added a Next.js Middleware to protect `/dashboard/*` routes.
- Checks for the presence of `access_token` cookie.
- Redirects unauthenticated users to `/signin`.
- Redirects authenticated users away from `/signin` and `/signup` to `/dashboard`.

### 3. `src/app/dashboard/layout.tsx` (New)
- Functions as the **Primary Auth Check** for the dashboard section.
- Uses `fetchServer` (Server Component safe fetch) to call `/users/me`.
- If the API call fails or returns 401, it redirects to `/signin` immediately.
- This ensures no protected content is ever rendered without a valid session, even if Middleware is bypassed.

### 4. `src/lib/axios.ts` & `src/lib/api-server.ts`
- **`axios.ts`**: Client-side singleton for making API requests with credentials.
- **`api-server.ts`**: Server-side helper that reads `cookies()` from headers and forwards them to the backend API, allowing SSR to perform authenticated requests.

## Why These Changes?
1.  **Security**: `HttpOnly` cookies cannot be accessed by JavaScript, preventing XSS attacks from stealing tokens.
2.  **Performance**: Server-side checks in Layout preventing loading UI flicker for unauthenticated users.
3.  **Reliability**: Centralized API clients prevent missed configuration (like forgetting `withCredentials`).
