'use client';

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { Loader2 } from "lucide-react";

export function CheckoutButton({ planId, price }) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    const handleCheckout = async () => {
        setLoading(true);

        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            router.push("/login?next=/pricing");
            return;
        }

        try {
            const response = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    product_cart: [{ product_id: planId, quantity: 1 }],
                    customer: {
                        email: user.email,
                        name: user.user_metadata?.full_name || user.email,
                    },
                    metadata: { user_id: user.id },
                    return_url: `${window.location.origin}/dashboard?success=true`
                }),
            });

            const data = await response.json();

            if (!response.ok) throw new Error("Failed to initiate checkout");

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
        <div onClick={handleCheckout}>
            <InteractiveHoverButton
                text={loading ? "Loading..." : `Subscribe $${price}/mo`}
                className="bg-white text-black hover:bg-zinc-200 border-white w-full"
                disabled={loading}
            />
        </div>
    );
}
