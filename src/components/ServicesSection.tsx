"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type ServiceType = "sites" | "landingpages" | "ecommerces" | "saas" | "apps";

interface ServiceInfo {
  type: ServiceType;
  title: string;
  image: string;
}

const services: ServiceInfo[] = [
  {
    type: "sites",
    title: "Sites",
    image: "/p1.png",
  },
  {
    type: "landingpages",
    title: "Landingpages",
    image: "/p2.png",
  },
  {
    type: "ecommerces",
    title: "E-commerces",
    image: "/p3.png",
  },
  {
    type: "saas",
    title: "SaaS",
    image: "/p4.png",
  },
  {
    type: "apps",
    title: "Apps",
    image: "/p5.png",
  },
];

export default function ServicesSection() {
  const [activeService, setActiveService] = useState<ServiceType>("sites");

  const currentImage = services.find((service) => service.type === activeService)?.image || "/i1.png";

  return (
    <section className="py-24 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Título da seção */}
        <h2 className="text-5xl font-bold text-center mb-16 text-gray-900">Serviços</h2>

        {/* Botões de navegação */}
        <div className="flex justify-center mb-16 gap-4">
          {services.map((service) => (
            <button
              key={service.type}
              onClick={() => setActiveService(service.type)}
              className={`px-8 py-3 rounded-full transition-all duration-300 ${
                activeService === service.type ? "bg-black text-white" : "bg-white text-black border border-gray-300 hover:bg-gray-100"
              }`}
            >
              {service.title}
            </button>
          ))}
        </div>

        {/* Imagem do serviço */}
        <div className="flex justify-center bg-transparent">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeService}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="relative w-full rounded-2xl overflow-hidden shadow-2xl transform -rotate-1 hover:rotate-0 transition-transform duration-500 bg-transparent"
            >
              <Image
                src={currentImage}
                alt={`Exemplo de ${activeService}`}
                width={1200}
                height={675}
                className="w-full bg-transparent rounded-2xl"
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
