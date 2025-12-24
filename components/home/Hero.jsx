import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative border-b border-white/10">
            <div className="max-w-7xl mx-auto px-6 py-32 md:py-40">
                <div className="max-w-4xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 mb-8">
                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                        <span className="text-xs text-white/80 uppercase tracking-wider">Now in Beta</span>
                    </div>

                    <h2 className="text-6xl md:text-8xl font-bold tracking-tight mb-8 leading-none">
                        Create Beautiful<br />Gradients Instantly
                    </h2>

                    <p className="text-xl md:text-2xl text-white/60 max-w-2xl mb-12 leading-relaxed">
                        Transform images into stunning mesh gradients. Extract colors, customize layouts, and export in seconds.
                    </p>

                    <div className="flex flex-col sm:flex-row items-start gap-4">
                        <Link href="/blend">
                            <Button size="lg" className="bg-white text-black hover:bg-white/90 font-medium px-8 group">
                                Start Creating Free
                                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                        <Link href="#features">
                            <Button size="lg" variant="outline" className="border-white/20 hover:bg-white hover:text-black transition-all">
                                See How It Works
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Grid Background */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }} />
            </div>
        </section>
    );
}
