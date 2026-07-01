import Navbar from "@/components/layout/Navbar";
import HeroBackground from "@/components/sections/HeroBackground";
import Hero from "@/components/sections/Hero";    
import SectionDivider from "@/components/ui/SectionDivider";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroBackground />
      <Hero />
      <SectionDivider />
      <Skills />
      <SectionDivider label="PROJECTS" />
      <Projects />
    </main>
  );
}