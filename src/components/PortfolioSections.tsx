import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Portfolio = () => {
  const sectionRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const card1 = card1Ref.current;
    const card2 = card2Ref.current;
    const card3 = card3Ref.current;

    if (section && card1 && card2 && card3) {
      // Criar timeline para animar os cards sequencialmente
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 60%",
          end: "bottom 20%",
          scrub: true,
        },
      });

      // Adiciona cada card à timeline com um pequeno atraso entre eles
      tl.to(card1, { y: -100, opacity: 1, duration: 0.3 }, 0)
        .to(card2, { y: -150, opacity: 1, duration: 0.3 }, 0.1)
        .to(card3, { y: -100, opacity: 1, duration: 0.3 }, 0.2)
        .to(card1, { y: 40, opacity: 1, duration: 0.3 }, 0.3)
        .to(card2, { y: 40, opacity: 1, duration: 0.3 }, 0.4)
        .to(card3, { y: 40, opacity: 1, duration: 0.3 }, 0.5);
    }

    // Limpeza das animações na desmontagem
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-16 px-4 md:px-8 lg:px-16 bg-white">
      <div className="max-w-[1441px] mx-auto">
        <h1 className="box text-5xl md:text-6xl font-bold text-center mb-16 relative">Portfólio</h1>
      </div>
    </section>
  );
};

export default Portfolio;
