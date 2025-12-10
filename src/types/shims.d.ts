// Shims for third-party packages that don't ship TypeScript definitions.
// Replace `any` with proper interfaces as you migrate modules to typed APIs.

declare module 'pino-elasticsearch' {
  const plugin: any;
  export default plugin;
}

declare module 'pino-loki' {
  const plugin: any;
  export default plugin;
}

declare module 'openrouter-kit' {
  const kit: any;
  export default kit;
}

// Generic fallback for any other untyped modules you may add later.
declare module 'mongodb' {
  const whatever: any;
  export default whatever;
}
