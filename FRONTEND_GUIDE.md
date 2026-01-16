# Frontend API Guide: `/users/me`

This document serves as the reference for using the `/users/me` endpoint to bootstrap the user session, handle routing, and manage permissions on the frontend.

## 1. Request

The frontend should call the `/users/me` endpoint to retrieve the current user's information and permissions.

### Example Call

```typescript
import { fetchServer } from "@/lib/api-server";

const user = await fetchServer('/users/me');
```

## 2. Response Schema

```json
{
  "id": 101,
  "user_name": "Harvey Specter",
  "user_email": "harvey@pearson.com",
  
  // Organization Context
  "org_id": 50,
  "org_name": "Pearson Specter Litt",
  "org_type": "FIRM", // or "SOLO", depending on the user role

  // Roles and Permissions
  "user_roles": [
    "admin", // or "lawyer", "assistant", "tarik"
    "viewer"
  ],

  // Timestamps
  "created_at": "2023-01-01T12:00:00Z",
  "updated_at": "2023-01-10T12:00:00Z"
}
```

### Fields

- `id`: Unique identifier for the user.
- `user_name`: The display name of the user.
- `user_email`: The email address of the user.
- `org_id`: The unique identifier of the organization the user belongs to.
- `org_name`: The name of the organization.
- `org_type`: The type of organization (e.g., FIRM, SOLO).
- `user_roles`: An array of roles assigned to the user, determining their permissions.
- `created_at`: The timestamp when the user was created.
- `updated_at`: The timestamp when the user was last updated.

## 3. Usage

### A. Routing

The response from `/users/me` can be used to determine the appropriate dashboard or page to redirect the user after login.

### B. Permissions

Frontend components can check the `user_roles` array to conditionally render UI elements or pages based on the user's permissions.

---

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

### 2. Client Components (`src/lib/axios.ts`)
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

---

## 6. API Schemas & Payloads

### Signup Payload (`/auth/register`)

The backend expects a **flat structure** using booleans to distinguish user roles. Do not nest data.

**Schema:**
```json
{
  "law_firm": boolean,      // Set true for Law Firm Admin
  "lawyer": boolean,        // Set true for Solo Lawyer
  "tarik": boolean,         // Set true for Tarik Guy

  "law_firm_name": string,  // Required if law_firm=true
  "lawyer_name": string,    // Required if lawyer=true
  "tarik_name": string,     // Required if tarik=true
  "admin_name": string,     // Required if law_firm=true (Name of the Admin User)

  "email": string,          // Unique Email Address
  "password": string,       // Plain text password
  "confirm_password": string // Must match password
}
```

**Example (Law Firm Signup):**
```json
{
  "law_firm": true,
  "lawyer": false,
  "tarik": false,
  "law_firm_name": "Pearson Specter Litt",
  "lawyer_name": "",
  "tarik_name": "",
  "admin_name": "Harvey Specter",
  "email": "harvey@psl.com",
  "password": "pass",
  "confirm_password": "pass"
}
```

---

## 7. Role-Based Redirection

### Concept
We now support complex roles (Admin, Lawyer, Assistant, Tarik) and nested dashboard paths.
Instead of hardcoding redirects in every page, we use a central utility function.

### The Utility: `getDashboardUrl(user)`
Located in `src/lib/nav-utils.ts`.
*   Input: The full User object.
*   Output: The exact URL string (e.g., `/dashboard/firm/admin`).
*   Logic: Checks `org_type` first, then inspects `user_roles` array for specific capabilities.

### Directory Structure Updates
We have moved dashboard pages to be more explicit:

*   **Old**: `src/app/dashboard/solo/page.tsx`
*   **New**: `src/app/dashboard/solo/lawyer/page.tsx` (For the Solo Lawyer view)

*   **Old**: `src/app/dashboard/firm/page.tsx`
*   **New**: `src/app/dashboard/firm/admin/page.tsx` (For the Firm Admin view)

### How to Add a New Role View
1.  Create the folder: `src/app/dashboard/firm/new-role/page.tsx`.
2.  Update `src/lib/nav-utils.ts` to add a condition for that role.
3.  The App will automatically redirect users there on login.
