'use client';

import Navigation from "@/components/home/Navigation";
import Hero from "@/components/home/Hero";
import Preview from "@/components/home/Preview";
import Features from "@/components/home/Features";
import Stats from "@/components/home/Stats";
import CTA from "@/components/home/CTA";
import Footer from "@/components/home/Footer";
import InteractiveTeaser from "@/components/home/InteractiveTeaser";
import ExitIntentModal from "@/components/home/ExitIntentModal";
import FloatingCTA from "@/components/home/FloatingCTA";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <Navigation />
      <Hero />
      <InteractiveTeaser />
      <Preview />
      <Features />
      <Stats />
      <CTA />
      <Footer /> 
      <ExitIntentModal />
      <FloatingCTA />
    </main>
  );
}