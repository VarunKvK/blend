// src/app/pricing/page.js
import { PricingTable } from "@/components/pricing-table";
import { createClient } from "@/lib/supabase/server";
// import Navbar from "@/components/navbar"; // We will create a simple navbar later if needed

// 1. Define your plans here (Ideally this comes from config.js or database)
const PLANS = [
  {
    id: "pro",
    name: "Pro Plan",
    description: "Perfect for solo founders",
    price: 19,
    paymentLinkId: process.env.NEXT_PUBLIC_DODO_PRODUCT_ID, // Put your Polar/DoDo ID here
    features: ["Unlimited Projects", "Priority Support", "Advanced Analytics"],
  },
];

export default async function PricingPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-gray-50">
       <div className="container mx-auto px-4 py-16">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight">Simple Pricing</h1>
          <p className="mt-4 text-lg text-gray-600">
            Start small, upgrade as you grow.
          </p>
        </div>
        
        {/* Pass the provider from env */}
        <PricingTable 
            plans={PLANS} 
        />
      </div>
    </div>
  );
}