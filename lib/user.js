// src/lib/user.js
import { createClient } from "@/lib/supabase/server";

export async function getUserSubscription() {
  const supabase = await createClient();
  
  // 1. Get Auth User
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  // 2. Get Profile Data (where we stored is_pro)
  const { data: profile } = await supabase
    .from('profiles')
    .select('is_pro, subscription_id')
    .eq('id', user.id)
    .single();

  return {
    user,
    isPro: profile?.is_pro || false,
    subscriptionId: profile?.subscription_id
  };
}