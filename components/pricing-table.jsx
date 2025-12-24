// src/components/pricing-table.js
'use client'

import { Button } from "@/components/ui/button";
import { Check, Loader2 } from "lucide-react";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client"; 
import { useRouter } from "next/navigation";

export function PricingTable({ plans }) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      {plans.map((plan) => (
        <PricingCard key={plan.id} plan={plan} />
      ))}
    </div>
  );
}

function PricingCard({ plan }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleCheckout = async () => {
    setLoading(true);
    
    // 1. Get Current User
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login?next=/pricing");
      return;
    }

    try {
      // 2. Call the Route Handler we created in Task 3.2
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // The SDK expects this specific JSON structure for Sessions:
        body: JSON.stringify({
          product_cart: [
            {
              product_id: plan.paymentLinkId, // This is your DoDo Product ID
              quantity: 1
            }
          ],
          customer: {
            email: user.email,
            name: user.user_metadata?.full_name || user.email,
          },
          // Metadata is crucial for tracking who paid in your database later
          metadata: {
            user_id: user.id 
          },
          return_url: `${window.location.origin}/dashboard?sucecss=true` 
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("DoDo Error:", data);
        throw new Error("Failed to initiate checkout");
      }

      // 3. Redirect to the URL provided by the SDK
      if (data.checkout_url) {
        router.push(data.checkout_url);
      } else {
        throw new Error("No checkout URL received");
      }

    } catch (error) {
      console.error("Checkout Error:", error);
      alert("Error starting checkout. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
      <div className="mb-4">
        <h3 className="text-2xl font-bold">{plan.name}</h3>
        <p className="text-muted-foreground">{plan.description}</p>
      </div>
      <div className="mb-6">
        <span className="text-4xl font-bold">${plan.price}</span>
        <span className="text-muted-foreground">/month</span>
      </div>
      <ul className="mb-8 flex-1 space-y-2 text-sm text-muted-foreground">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-center">
            <Check className="mr-2 h-4 w-4 text-primary" />
            {feature}
          </li>
        ))}
      </ul>
      <Button onClick={handleCheckout} className="w-full" disabled={loading}>
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Subscribe
      </Button>
    </div>
  );
}