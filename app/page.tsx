'use client';

import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experiences from "@/components/Experiences";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Papers from "@/components/Papers";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {

  return (
    <div className="font-sans bg-black text-white">
      <Navigation />
      <Hero />
      <About />
      <Experiences />
      <Skills />
      <Projects />
      <Papers />
      <Contact />
      <Footer />
    </div>
  );
}
