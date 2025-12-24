// src/app/login/actions.js
'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

// 1. Magic Link Login (Production)
export async function login(formData) {
  const supabase = await createClient()
  const email = formData.get('email')

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      // Changed to redirect to Home Page as requested
      // We append ?next=/dashboard so the callback knows where to send them eventually
      // if you want them to land on home, remove ?next...
      emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/auth/callback?next=/`,
    },
  })

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  return { success: true }
}

// 2. Password Login (Dev Only)
export async function loginWithPassword() {
  const supabase = await createClient()

  // We use hardcoded credentials for the dev environment
  const { error } = await supabase.auth.signInWithPassword({
    email: 'test@example.com', 
    password: 'password123',
  })

  if (error) {
    console.error("Dev login failed:", error)
    return { success: false }
  }

  revalidatePath('/', 'layout')
  redirect('/') // Redirect to Home
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}