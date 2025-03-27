import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Tech = () => {
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
        <h1 className="box text-5xl md:text-6xl font-bold text-center mb-16 relative">
          Desenvolvimento Web
          <span className="block">com quem entende</span>
        </h1>

        <div className="ref grid grid-cols-1 md:grid-cols-3 gap-8">
          <div ref={card1Ref} className="bg-white/50 backdrop-blur-lg p-8 rounded-lg shadow-lg ">
            <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-gray-800 to-gray-100 mb-2">
              Design UX/UI
            </h2>

            <div className="space-y-8">
              <p className="text-gray-700">
                Utilizamos princípios avançados de UX/UI para criar landing pages intuitivas e envolventes. Nosso processo de design
                centrado no usuário garante interfaces atraentes que proporcionam experiências memoráveis e aumentam as taxas de conversão.
                Trabalhamos com Figma e Adobe Photoshop para prototipar e testar cada elemento visual antes da implementação.
              </p>
            </div>
          </div>

          {/* Coluna 2 - Desenvolvimento Front-end */}
          <div ref={card2Ref} className="bg-white/50 backdrop-blur-lg p-8 rounded-lg shadow-lg ">
            <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-gray-800 to-gray-100 mb-2">
              Desenvolvimento Front-end
            </h2>

            <div className="space-y-8">
              <p className="text-gray-700">
                Desenvolvemos interfaces modernas e responsivas utilizando as tecnologias mais recentes do mercado. Trabalhamos com React,
                Next.js, TypeScript e Tailwind CSS para criar experiências visuais impactantes e de alta performance. Nosso código front-end
                é otimizado para SEO e velocidade de carregamento, garantindo que seu site institucional tenha uma excelente classificação
                nos mecanismos de busca.
              </p>
            </div>
          </div>

          {/* Coluna 3 - Desenvolvimento Back-end */}
          <div ref={card3Ref} className="bg-white/50 backdrop-blur-lg p-8 rounded-lg shadow-lg ">
            <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-gray-800 to-gray-100 mb-2">
              Desenvolvimento Back-end
            </h2>

            <div className="space-y-8">
              <p className="text-gray-700">
                Nossa infraestrutura back-end para e-commerces é robusta e escalável, desenvolvida com Node.js, Express, AWS, MongoDB e
                PostgreSQL. Implementamos sistemas seguros de pagamento, gestão de estoque e autenticação de usuários. Além disso, criamos
                APIs RESTful que permitem integração com plataformas de logística, CRMs e sistemas de marketing automatizado, garantindo um
                ecossistema completo para seu negócio online.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tech;
