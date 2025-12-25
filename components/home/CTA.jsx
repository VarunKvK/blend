import Link from "next/link";
import { Button } from "@/components/ui/button";
import { InteractiveHoverButton } from "../ui/interactive-hover-button";

export default function CTA() {
    return (
        <section className="relative py-32">
            <div className="max-w-4xl mx-auto px-6 text-center">
                <h3 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                    Start Creating<br />Beautiful Gradients
                </h3>
                <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto">
                    Join designers and developers using Blend to create stunning visuals
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href="/blend">
                        <InteractiveHoverButton text="Try Blend Free" className="bg-white text-black hover:bg-white/90 font-medium px-12"/>
                    </Link>
                    <Link href="/pricing">
                        <Button size="lg" variant="ghost" className="rounded-full border-white/20 hover:bg-white hover:text-black px-12 transition-all">
                            View Pricing
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
