import Link from "next/link";
import Navigation from "@/components/home/Navigation";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { CheckoutButton } from "@/components/pricing/CheckoutButton";

const PLANS = [
  {
    id: "pro",
    name: "Pro Plan",
    description: "Perfect for creators & founders",
    price: 9,
    paymentLinkId: process.env.NEXT_PUBLIC_DODO_PRODUCT_ID,
    features: [
      "Unlimited Project Exports",
      "High Resolution (4K) Output",
      "Custom Aspect Ratios",
      "Priority Support",
      "Commercial License",
      "Early Access to New Features"
    ],
  },
];

export default function PricingPage() {
  const plan = PLANS[0]; // Focusing on the single pro plan for this design

  return (
    <main className="min-h-screen bg-black text-white font-sans selection:bg-white/20">
      <Navigation />

      <section className="relative min-h-screen flex flex-col items-center justify-center border-b border-white/10 overflow-hidden pt-20">
        {/* Grid Background Layer */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Center Vertical Line - Solid */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2" />

          {/* Content Width Vertical Lines - Dashed */}
          <div className="absolute left-1/2 top-0 bottom-0 w-full max-w-[1000px] -translate-x-1/2 border-x border-dashed border-white/10" />

          {/* Outer Vertical Lines - Dashed */}
          <div className="absolute left-0 top-0 bottom-0 w-px border-r border-dashed border-white/5" />
          <div className="absolute right-0 top-0 bottom-0 w-px border-l border-dashed border-white/5" />

          {/* Top Horizontal Line - Dashed */}
          <div className="absolute top-[15%] left-0 right-0 border-b border-dashed border-white/10" />
          {/* Bottom Horizontal Line - Dashed */}
          <div className="absolute bottom-[15%] left-0 right-0 border-t border-dashed border-white/10" />
        </div>

        <div className="relative z-10 w-full max-w-[1000px] mx-auto grid place-items-center">

          {/* Badge Section */}
          <div className="w-full border-b border-dashed border-white/10 py-8 flex justify-center backdrop-blur-[2px]">
            <div className="bg-black/80 px-4 py-1 rounded-full border border-white/20">
              <Badge className="bg-transparent hover:bg-transparent border-0 p-0 text-white flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
                <span className="text-[10px] uppercase tracking-widest text-white/70">Go Pro</span>
              </Badge>
            </div>
          </div>

          {/* Main Content Section */}
          <div className="w-full py-20 text-center px-6 backdrop-blur-[2px]">
            <h2 className="text-6xl md:text-8xl font-serif tracking-tight mb-8 text-white leading-[0.9]">
              Simple, Transparent<br />
              <span className="italic font-light">Pricing</span>
            </h2>

            <p className="text-lg md:text-xl text-white/50 max-w-lg mx-auto leading-relaxed mb-0 font-light">
              Start creating stunning content today. upgrade as you grow.
            </p>
          </div>

          {/* Pricing Card Section */}
          <div className="w-full border-t border-dashed border-white/10 py-16 flex flex-col items-center justify-center backdrop-blur-[2px]">
            <div className="w-full max-w-md bg-zinc-950/50 border border-white/10 px-8 py-10 relative overflow-hidden group hover:border-white/20 transition-all duration-500">
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-white/30" />
              <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-white/30" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-white/30" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-white/30" />

              <div className="text-center mb-8">
                <h3 className="text-2xl font-serif mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1 mb-2">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-white/40">/month</span>
                </div>
                <p className="text-sm text-white/50">{plan.description}</p>
              </div>

              <div className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-white/70">
                    <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    {feature}
                  </div>
                ))}
              </div>

              <CheckoutButton planId={plan.paymentLinkId} price={plan.price} />

              <p className="text-center text-[10px] text-white/30 mt-4 uppercase tracking-widest">
                7-day money back guarantee
              </p>
            </div>
          </div>
        </div>

        {/* Decorative corners for the grid */}
        <div className="absolute top-[15%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white/20 rotate-45" />
        <div className="absolute bottom-[15%] left-[50%] -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-white/20 rotate-45" />
      </section>
    </main>
  );
}