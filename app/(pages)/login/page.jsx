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
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-10 shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Sign in</h2>
        </div>

        {isDev && (
          <div className="rounded-md border-2 border-dashed border-yellow-400 bg-yellow-50 p-4">
            <div className="flex items-center gap-2 text-yellow-800 font-bold mb-2">
              <FlaskConical className="h-5 w-5" />
              <span>Dev Mode Detected</span>
            </div>
            <form action={loginWithPassword}>
               <Button variant="secondary" className="w-full bg-yellow-200 hover:bg-yellow-300 text-yellow-900">
                 One-Click Login (Test User)
               </Button>
            </form>
          </div>
        )}
        
        {/* --- NEW: Google Button --- */}
        <div className="space-y-3">
            <Button variant="outline" className="w-full" onClick={handleGoogleLogin} disabled={isGoogleLoading}>
                {isGoogleLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <GoogleIcon />}
                Sign in with Google
            </Button>
            
            <div className="relative">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
                <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-muted-foreground">Or continue with</span></div>
            </div>
        </div>

        {!isSuccess ? (
          <form action={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input id="email" name="email" type="email" required placeholder="name@example.com" />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Sign in with Email
            </Button>
          </form>
        ) : (
          <div className="rounded-md bg-green-50 p-4 text-center text-green-800">
            <p className="font-medium">Check your email!</p>
          </div>
        )}
      </div>
    </div>
  )
}