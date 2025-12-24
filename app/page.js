'use client';

import Navigation from "@/components/home/Navigation";
import Hero from "@/components/home/Hero";
import Preview from "@/components/home/Preview";
import Features from "@/components/home/Features";
import Stats from "@/components/home/Stats";
import CTA from "@/components/home/CTA";
import Footer from "@/components/home/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <Navigation />
      <Hero />
      <Preview />
      <Features />
      <Stats />
      <CTA />
      <Footer />
    </main>
  );
}