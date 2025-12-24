// src/app/dashboard/layout.js
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserNav } from "./user-nav";
import config from "@/lib/config";

export default async function DashboardLayout({ children }) {
  const supabase = await createClient();

  // 1. Protect the route
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) {
    redirect("/login");
  }

  // 2. Render the layout
  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex gap-6 md:gap-10">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <span className="inline-block font-bold">{config.appName}</span>
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link
                href="/dashboard"
                className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Overview
              </Link>
              <Link
                href="/dashboard/settings"
                className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Settings
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            {/* Pass user email to the nav component */}
            <UserNav email={user.email} />
          </div>
        </div>
      </header>
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <nav className="grid items-start gap-2">
            <Link href="/dashboard">
              <span className="group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground">
                <span>Dashboard</span>
              </span>
            </Link>
            <Link href="/dashboard/settings">
              <span className="group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground">
                <span>Settings</span>
              </span>
            </Link>
          </nav>
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}