// src/app/checkout/route.js
import { Checkout } from "@dodopayments/nextjs";

const envMode = process.env.DODO_PAYMENTS_ENVIRONMENT || "test_mode";

console.log(`Initializing DoDo Checkout in ${envMode}`); 

// POST request handler for creating Checkout Sessions
export const POST = Checkout({
  bearerToken: process.env.DODO_PAYMENTS_API_KEY,
  returnUrl: process.env.DODO_PAYMENTS_RETURN_URL,
  environment: process.env.DODO_PAYMENTS_ENVIRONMENT,
  type: "session", // We use 'session' for the most control (metadata, carts, etc)
});