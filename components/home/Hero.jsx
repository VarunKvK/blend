import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { ArrowRight } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center border-b border-white/10 bg-black overflow-hidden pt-20">
            {/* Grid Background Layer */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Center Vertical Line - Solid */}
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2" />

                {/* Content Width Vertical Lines - Dashed */}
                <div className="absolute left-1/2 top-0 bottom-0 w-full max-w-[1000px] -translate-x-1/2 border-x border-dashed border-white/10" />

                {/* Outer Vertical Lines - Dashed (Full width grid) */}
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
                            <span className="text-[10px] uppercase tracking-widest text-white/70">Now in Beta</span>
                        </Badge>
                    </div>
                </div>

                {/* Main Content Section */}
                <div className="w-full py-20 text-center px-6 backdrop-blur-[2px]">
                    <h2 className="text-6xl md:text-8xl font-serif tracking-tight mb-8 text-white leading-[0.9]">
                        Create Beautiful<br />
                        <span className="italic font-light">Gradients Instantly</span>
                    </h2>

                    <p className="text-lg md:text-xl text-white/50 max-w-lg mx-auto leading-relaxed mb-0 font-light">
                        Transform images into stunning mesh gradients. Extract colors, customize layouts, and export in seconds.
                    </p>
                </div>

                {/* Buttons Section */}
                <div className="w-full border-t border-dashed border-white/10 py-10 flex flex-col sm:flex-row items-center justify-center gap-6 backdrop-blur-[2px]">
                    <Link href="/blend">
                        <InteractiveHoverButton
                            text="Start Creating"
                            className="bg-white text-black hover:bg-zinc-200 border-white"
                        />
                    </Link>
                    <Link href="#features">
                        <span className="text-sm font-medium text-white/60 hover:text-white transition-colors cursor-pointer border-b border-transparent hover:border-white/60 pb-0.5">
                            See How It Works
                        </span>
                    </Link>
                </div>
            </div>

            {/* Decorative corners for the grid */}
            <div className="absolute top-[15%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white/20 rotate-45" />
            <div className="absolute bottom-[15%] left-[50%] -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-white/20 rotate-45" />
        </section>
    );
}
