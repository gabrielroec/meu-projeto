"use client";

import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

interface SlideProps {
  id: number;
  image: string;
  alt: string;
}

const slides: SlideProps[] = [
  {
    id: 1,
    image: "/i1.png",
    alt: "Projeto 1",
  },
  {
    id: 2,
    image: "/i2.png",
    alt: "Projeto 2",
  },
  {
    id: 3,
    image: "/i3.png",
    alt: "Projeto 3",
  },
];

export default function ProjectSlider() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000, stopOnInteraction: false })]);

  const onSelect = useCallback(() => {
    if (!emblaMainApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    emblaMainApi.on("select", onSelect);
    return () => {
      emblaMainApi.off("select", onSelect);
    };
  }, [emblaMainApi, onSelect]);

  const scrollTo = useCallback((index: number) => emblaMainApi && emblaMainApi.scrollTo(index), [emblaMainApi]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-40 relative rounded-2xl">
      <div className="rounded-2xl">
        {/* Carrossel */}
        <div className="overflow-hidden w-full rounded-2xl" ref={emblaMainRef}>
          <div className="flex">
            {slides.map((slide) => (
              <div key={slide.id} className="flex-shrink-0 w-full">
                <div className="flex justify-center w-full">
                  <div className="relative w-full shadow-xl rounded-lg overflow-hidden">
                    <Image
                      src={slide.image}
                      alt={slide.alt}
                      width={3000}
                      height={1687}
                      className="w-full object-cover"
                      priority={slide.id === 1}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Indicadores de slides */}
        <div className="flex justify-center mt-8 gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`w-12 h-2 rounded-full transition-colors ${index === selectedIndex ? "bg-black" : "bg-gray-300"}`}
              aria-label={`Ir para slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
