import Link from "next/link";
import config from "@/lib/config";

export default function Footer() {
    return (
        <footer className="border-t border-white/10 py-8">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
                    <div className="text-white/40">
                        © 2024 {config.appName}. All rights reserved.
                    </div>
                    <div className="flex items-center gap-8">
                        <Link href="/pricing" className="text-white/60 hover:text-white transition-colors">
                            Pricing
                        </Link>
                        <Link href="/login" className="text-white/60 hover:text-white transition-colors">
                            Sign In
                        </Link>
                        <Link href="/blend" className="text-white/60 hover:text-white transition-colors">
                            App
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
