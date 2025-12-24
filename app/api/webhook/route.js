import { Webhooks } from '@dodopayments/nextjs';
import { createClient } from '@supabase/supabase-js';

// Create a private Supabase client (Admin rights) to update users
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // You need to add this to .env.local
);

export const POST = Webhooks({
  webhookKey: process.env.DODO_PAYMENTS_WEBHOOK_KEY, // Add this to .env.local
  
  // Handle Successful Payment
  onPaymentSucceeded: async (payload) => {
    const { data } = payload;
    // We attached 'user_id' in the metadata during checkout
    const userId = data.metadata?.user_id;
    const subscriptionId = data.subscription_id || data.payment_id;

    if (userId) {
      // Update the user's profile or subscription table
      await supabaseAdmin
        .from('profiles')
        .update({ 
            is_pro: true, // Or update a specific 'plan' column
            subscription_id: subscriptionId 
        })
        .eq('id', userId);
        
      console.log(`User ${userId} upgraded successfully.`);
    }
  },
  
  // Handle Subscription Cancellation
  onSubscriptionCancelled: async (payload) => {
    const { data } = payload;
    const userId = data.metadata?.user_id;
    
    if (userId) {
        await supabaseAdmin
        .from('profiles')
        .update({ is_pro: false })
        .eq('id', userId);
    }
  }
});