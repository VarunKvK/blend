import { Button } from "@/components/ui/button";
import config from "@/lib/config";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-4">
      <h1 className="text-4xl font-bold">{config.appName}</h1>
      <p className="text-muted-foreground">Boilerplate initialized.</p>
      <div className="flex gap-4">
        <Button>Get Started</Button>
        <Button variant="outline">Learn More</Button>
      </div>
    </main>
  );
}