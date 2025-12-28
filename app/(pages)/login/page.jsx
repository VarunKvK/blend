// src/app/login/page.js
'use client'

import { login, loginWithPassword } from './actions'
import { createClient } from '@/lib/supabase/client' // Import client creator
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState, useEffect } from 'react'
import { Loader2, FlaskConical } from 'lucide-react'

// Simple Google Icon Component
function GoogleIcon() {
  return (
    <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
  )
}

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false); // New state
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDev, setIsDev] = useState(false);

  // Check dev mode
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') setIsDev(true);
  }, []);

  // --- NEW: Google Login Logic ---
  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    const supabase = createClient();

    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        // Redirect to your callback route
        redirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });
    // No need to set loading false, as we redirect away
  };

  async function handleSubmit(formData) {
    setIsLoading(true);
    await login(formData);
    setIsLoading(false);
    setIsSuccess(true);
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-black text-white selection:bg-blue-500/30">

      {/* Background Elements (From Hero) */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Aurora Wave Effect - Layer 1 */}
        <div className="absolute top-[60%] left-1/2 -translate-x-1/2 w-[200%] h-[800px] rounded-[100%] opacity-60 blur-[100px] pointer-events-none rotate-12 mix-blend-screen flex animate-aurora will-change-transform">
          <div className="w-1/2 h-full flex-shrink-0 bg-gradient-to-r from-blue-700 via-indigo-500 to-blue-700" />
          <div className="w-1/2 h-full flex-shrink-0 bg-gradient-to-r from-blue-700 via-indigo-500 to-blue-700" />
        </div>

        {/* Aurora Wave Effect - Layer 2 */}
        <div className="absolute top-[65%] left-1/2 -translate-x-1/2 w-[200%] h-[700px] rounded-[100%] opacity-50 blur-[80px] pointer-events-none -rotate-12 mix-blend-screen flex animate-aurora will-change-transform" style={{ animationDirection: 'reverse', animationDuration: '25s' }}>
          <div className="w-1/2 h-full flex-shrink-0 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
          <div className="w-1/2 h-full flex-shrink-0 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
        </div>

        {/* Center Vertical Line - Solid */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 mix-blend-overlay" />

        {/* Content Width Vertical Lines - Dashed */}
        <div className="absolute left-1/2 top-0 bottom-0 w-full max-w-[1000px] -translate-x-1/2 border-x border-dashed border-white/10 mix-blend-overlay" />

        {/* Outer Vertical Lines */}
        <div className="absolute left-0 top-0 bottom-0 w-px border-r border-dashed border-white/5 mix-blend-overlay" />
        <div className="absolute right-0 top-0 bottom-0 w-px border-l border-dashed border-white/5 mix-blend-overlay" />

        {/* Horizontal Lines */}
        <div className="absolute top-[15%] left-0 right-0 border-b border-dashed border-white/10 mix-blend-overlay" />
        <div className="absolute bottom-[15%] left-0 right-0 border-t border-dashed border-white/10 mix-blend-overlay" />
      </div>

      {/* Decorative grid corners */}
      <div className="absolute top-[15%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white/20 rotate-45" />
      <div className="absolute bottom-[15%] left-[50%] -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-white/20 rotate-45" />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md p-8 backdrop-blur-xl bg-black/40 border border-white/10 rounded-2xl animate-appear shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-serif font-light text-white mb-2">Sign in</h2>
          <p className="text-white/50 text-sm">Welcome back to Blend</p>
        </div>

        {isDev && (
          <div className="rounded-md border border-yellow-500/20 bg-yellow-900/10 p-4 mb-6">
            <div className="flex items-center gap-2 text-yellow-500 font-bold mb-2">
              <FlaskConical className="h-4 w-4" />
              <span className="text-sm">Dev Mode Detected</span>
            </div>
            <form action={loginWithPassword}>
              <Button variant="secondary" className="w-full bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-500 border border-yellow-500/20">
                One-Click Login (Test User)
              </Button>
            </form>
          </div>
        )}

        {/* Google Button */}
        <div className="space-y-4">
          <Button
            variant="outline"
            className="w-full bg-white/5 border-white/10 hover:bg-white/10 text-white hover:text-white h-11"
            onClick={handleGoogleLogin}
            disabled={isGoogleLoading}
          >
            {isGoogleLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <GoogleIcon />}
            Sign in with Google
          </Button>

          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/10" /></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-transparent px-2 text-white/40">Or continue with</span></div>
          </div>

          {!isSuccess ? (
            <form action={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white/70">Email address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="name@example.com"
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-white/20 h-11"
                />
              </div>
              <Button type="submit" className="w-full bg-white text-black hover:bg-zinc-200 h-11 font-medium" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Sign in with Email
              </Button>
            </form>
          ) : (
            <div className="rounded-md bg-green-500/10 border border-green-500/20 p-4 text-center text-green-400">
              <p className="font-medium">Check your email!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}