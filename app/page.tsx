'use client';

import { useState } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experiences from "@/components/Experiences";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Papers from "@/components/Papers";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { useAge } from "@/components/hooks/useAge";
import { useArxivPapers } from "@/components/hooks/useArxivPapers";

export default function Home() {
  const [activeAccordion, setActiveAccordion] = useState<string>('');
  const age = useAge('2001-09-23');
  const { papers, loading } = useArxivPapers();

  const toggleAccordion = (id: string) => {
    setActiveAccordion(activeAccordion === id ? '' : id);
  };

  return (
    <div className="font-sans bg-black text-white">
      <Navigation />
      <Hero />
      <About age={age} />
      <Experiences />
      <Skills />
      <Projects activeAccordion={activeAccordion} toggleAccordion={toggleAccordion} />
      <Papers papers={papers} loading={loading} />
      <Contact />
      <Footer />
    </div>
  );
}
