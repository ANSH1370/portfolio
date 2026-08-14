import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Impact from "@/components/Impact";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Certifications from "@/components/Certifications";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative">
        <div className="bg-grid absolute inset-0 -z-10" />
        <Hero />
        <Impact />
        <Experience />
        <Projects />
        <Skills />
        <Certifications />
        <About />
        <Contact />
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
