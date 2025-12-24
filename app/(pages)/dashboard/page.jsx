// src/app/dashboard/page.js
import { getUserSubscription } from "@/lib/user";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function DashboardPage() {
  // Fetch subscription status
  const session = await getUserSubscription();
  
  // Guard clause: Should be handled by layout, but good for safety
  if (!session) return <div>Please log in</div>;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Overview</h3>
        <p className="text-sm text-muted-foreground">
          Status: <span className={session.isPro ? "text-green-600 font-bold" : "text-gray-500"}>
            {session.isPro ? "Pro Plan" : "Free Plan"}
          </span>
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
         {/* Standard Feature */}
         <div className="rounded-xl border bg-card p-6 shadow">
            <div className="text-sm font-medium">Projects</div>
            <div className="text-2xl font-bold">3/3</div>
         </div>

         {/* GATED FEATURE */}
         {session.isPro ? (
             <div className="rounded-xl border bg-indigo-50 p-6 shadow border-indigo-100">
                <div className="text-sm font-medium text-indigo-800">AI Credits (Pro)</div>
                <div className="text-2xl font-bold text-indigo-900">Unlimited</div>
             </div>
         ) : (
             <div className="rounded-xl border border-dashed p-6 shadow bg-gray-50 flex flex-col items-center justify-center gap-2 text-center">
                <div className="text-sm font-medium text-muted-foreground">AI Credits</div>
                <Link href="/pricing">
                  <Button size="sm" variant="secondary">Upgrade to Unlock</Button>
                </Link>
             </div>
         )}
      </div>
    </div>
  )
}