"use client";

import { useEffect } from "react";
import Header from "@/components/Header";
// import dynamic from "next/dynamic";
import ProjectSlider from "@/components/ProjectSlider";
import ServicesSection from "@/components/ServicesSection";
import Tech from "@/components/Tech";
// import Portfolio from "@/components/PortfolioSections";

// Versão simplificada para teste
function SimpleHero() {
  return (
    <div className="max-w-[1441px] mx-auto px-4 sm:px-6 mt-40 relative">
      <div className="text-2xl md:text-4xl lg:text-6xl font-bold leading-tight mb-8 text-left max-w-[90%]">
        Nós criamos sites de outro mundo, qualidade de uma agência pelo preço de um profissional
      </div>
      <button className="px-8 py-4 bg-black text-white rounded-full text-lg font-medium">Faça um orçamento</button>
    </div>
  );
}

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
      <SimpleHero />
      <ProjectSlider />
      <ServicesSection />
      <Tech />
      {/* <Portfolio /> */}
    </div>
  );
}
