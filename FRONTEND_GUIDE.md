# Frontend Authentication & State Management Guide

This guide documents the architecture for authentication, state management, and backend communication in the Legal Tech Frontend.

## 1. Authentication Architecture (HttpOnly Cookies)

We have moved away from manual client-side cookie management to a secure, **Server-Managed HttpOnly Cookie** strategy.

### How it works:
1.  **Login**: The frontend POSTs credentials to `/auth/login`.
2.  **Cookie Set**: The Backend responds with a `Set-Cookie` header containing the `access_token`. This cookie is marked `HttpOnly`, meaning **JavaScript cannot read it**.
3.  **Persistence**: The browser automatically attaches this cookie to all subsequent requests to the API domain.

**Why?** This prevents XSS attacks (malicious scripts) from stealing the user's auth token.

---

## 2. Backend Communication

We have two distinct ways of talking to the backend, depending on where the code runs.

### A. Client Components (`src/lib/axios.ts`)
For all code running in the browser (forms, buttons, `useEffect`), use the centralized Axios instance.

```typescript
import api from "@/lib/axios";

// usage
await api.get('/users/me'); 
```
*   **Key Feature**: It is pre-configured with `withCredentials: true`, which is required for the browser to send the HttpOnly cookie.

### B. Server Components (`src/lib/api-server.ts`)
For code running on the server (Layouts, Pages), use the `fetchServer` helper.

```typescript
import { fetchServer } from "@/lib/api-server";

// usage in layout.tsx
const user = await fetchServer('/users/me');
```
*   **Key Feature**: It manually reads the incoming request cookies (using `next/headers`) and forwards them in the request to the backend. This is crucial for Server Side Rendering (SSR) to work with authenticated endpoints.

---

## 3. Hydration Strategy (Solving the "Stuck Spinner")

We use a "Hybrid Hydration" approach to ensure the user is logged in *instantly* without waiting for a second round-trip from the client.

### The Problem
When a user visits `/dashboard`:
1.  **Server** fetches user data to decide if they can view the page.
2.  **Client** loads the page. The client-side store (`useAuthStore`) is initially empty.
3.  **Result**: The user sees a spinner while the client fetches the user *again*.

### The Solution
We pass the data deemed "already fetched" by the server directly into the client store.

1.  **`src/app/dashboard/layout.tsx`**: Fetches the user server-side.
2.  **`src/app/dashboard/client-init.tsx`**: A tiny component that takes this `user` prop and immediately calls `useAuthStore.setState({ user })`.
3.  **Result**: The store is populated instantly on mount. The dashboard renders immediately. No spinner.

---

## 4. Routing & Protection

### Middleware (`src/proxy.ts`)
*   *Note: Renamed from middleware.ts to proxy.ts for Next.js 16 compatibility.*
*   Acts as the first line of defense.
*   Redirects unauthenticated users to `/signin`.
*   Redirects signed-in users away from `/signin` to `/dashboard`.

### Dashboard Layout (`src/app/dashboard/layout.tsx`)
*   Performs a hard authentication check.
*   If `fetchServer('/users/me')` fails (401), it redirects to `/signin`.
*   This ensures even if middleware fails, the layout will never render for an unauthenticated user.

### Auth Store (`src/store/use-auth-store.ts`)
*   Manages user state for the UI (displaying names, role-based visibility).
*   Actions: `fetchMe`, `setUser`, `logout`.
*   **Logout**: Calls backend `/auth/logout` (to clear cookie) -> Clears Store -> Refreshes Router -> Redirects to Signin.

---

## 5. Developer Checklist

- [ ] **Always use `@/lib/axios`** for client-side API calls.
- [ ] **Always use `@/lib/api-server`** for server-side API calls.
- [ ] **Do not read cookies manually**. Trust the browser and the backend.
- [ ] **Do not store tokens in local storage**.
- [ ] When adding a new main layout, remember to implement the **ClientInit** pattern if you need instant access to user data.
- [ ] **Production Deployment**: Ensure Frontend (`legal-tech.X.com`) and Backend (`api.X.com`) share the same root domain to support First-Party Cookies.
