// src/config.js
const config = {
  appName: "Blend",
  appDescription: "The SaaS starter kit.",
  domainName: "blend.so",
  
  // We will fill these in Phase 3
  paymentProvider: "dodo", // options: 'polar' | 'dodo'
  
  auth: {
    loginUrl: "/login",
    callbackUrl: "/auth/callback",
  }
};

export default config;