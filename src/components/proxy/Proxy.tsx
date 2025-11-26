// Deprecated: use `ProtectedRoute` client-side wrapper instead of mixing useAuth with server middleware.
// Left as a placeholder to avoid accidental imports. This file previously attempted to use `useAuth` (a React hook)
// inside a server/middleware context which doesn't work.

export default function ProxyPlaceholder() {
  // No-op placeholder. Use `src/components/ProtectedRoute.tsx` for client-side protection.
  return null;
}
