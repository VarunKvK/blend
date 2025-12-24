// src/config.js
const config = {
  appName: "SaaS Boilerplate",
  appDescription: "The SaaS starter kit.",
  domainName: "mymicrosaas.com",
  
  // We will fill these in Phase 3
  paymentProvider: "polar", // options: 'polar' | 'dodo'
  
  auth: {
    loginUrl: "/login",
    callbackUrl: "/auth/callback",
  }
};

export default config;