/**
 * Public-repository auth defaults.
 *
 * OAuth credentials are intentionally not stored in source control. Deployments
 * that enable federated authentication must provide their own credentials through
 * the `GROK_AUTH_*` environment variables consumed by `server.ts`.
 */
export const PREVIEW_CLIENT_ID = "";
export const PREVIEW_CLIENT_SECRET = "";

/** Optional issuer override; deployments should provide this through the environment. */
export const GROK_ISSUER_DEFAULT = "";

/** Preview-only callback hosts; production deployments should use their own origin. */
export const PREVIEW_ALLOWED_HOSTS = ["*.grok-sandbox.com"] as const;
