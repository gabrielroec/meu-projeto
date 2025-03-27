"use client";

import { useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProjectSlider from "@/components/ProjectSlider";
import ServicesSection from "@/components/ServicesSection";
import Tech from "@/components/Tech";
// import Portfolio from "@/components/PortfolioSections";
export default function Home() {
  useEffect(() => {
    // Inicializa Lenis apenas no lado do cliente
    const initLenis = async () => {
      const Lenis = (await import("lenis")).default;

      const lenis = new Lenis({
        autoRaf: true,
      });

      // Listen for the scroll event and log the event data
      lenis.on("scroll", (e) => {
        console.log(e);
      });
    };

    initLenis();
  }, []);

  return (
    <div className="">
      <Header />
      <HeroSection />
      <ProjectSlider />
      <ServicesSection />
      <Tech />
      {/* <Portfolio /> */}
    </div>
  );
}
