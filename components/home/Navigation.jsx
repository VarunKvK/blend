'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { createClient } from '@/lib/supabase/client';
import { UserNav } from '@/app/(pages)/dashboard/user-nav';

export default function Navigation() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const supabase = createClient();
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
            setLoading(false);
        };
        checkUser();
    }, []);

    return (
        <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
            <div className="flex items-center gap-6 px-6 py-3 rounded-full border border-white/10 bg-black/50 backdrop-blur-xl shadow-2xl">
                <Link href="/">
                    <h1 className="text-sm font-bold tracking-tight text-white cursor-pointer hover:opacity-80 transition-opacity">
                        BLENDIT
                    </h1>
                </Link>

                <div className="h-4 w-px bg-white/10" />

                <div className="flex items-center gap-8">
                    <Link href="/pricing" className="text-sm text-white/60 hover:text-white transition-colors">
                        Pricing
                    </Link>

                    {!loading && (
                        user ? (
                            <UserNav email={user.email} />
                        ) : (
                            <Link href="/login" className="text-sm text-white/60 hover:text-white transition-colors">
                                Log In
                            </Link>
                        )
                    )}
                    <Link href="/blend">
                        <InteractiveHoverButton
                            text="Get Started"
                            className="bg-white text-black text-xs hover:bg-black hover:text-white border-white px-5 py-1.5"
                        />
                    </Link>
                </div>
            </div>
        </nav>
    );
}
