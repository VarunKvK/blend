import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navigation() {
    return (
        <nav className="border-b border-white/10 bg-black sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link href="/">
                        <h1 className="text-lg font-bold tracking-tight text-white cursor-pointer hover:opacity-80 transition-opacity">
                            BLEND
                        </h1>
                    </Link>
                </div>
                <div className="flex items-center gap-4">
                    <Link href="/pricing" className="text-sm text-white/60 hover:text-white transition-colors">
                        Pricing
                    </Link>
                    <Link href="/login">
                        <Button variant="outline" size="sm" className="border-white/20 hover:bg-white hover:text-black transition-all">
                            Sign In
                        </Button>
                    </Link>
                    <Link href="/blend">
                        <Button size="sm" className="bg-white text-black hover:bg-white/90">
                            Get Started
                        </Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
