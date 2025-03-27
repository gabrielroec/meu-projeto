"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [language, setLanguage] = useState<"pt" | "en" | "es">("pt");
  const [isOpen, setIsOpen] = useState(false);

  const languages: Record<"pt" | "en" | "es", string> = {
    pt: "Português",
    en: "English",
    es: "Español",
  };

  const handleLanguageChange = (code: string) => {
    setLanguage(code as "pt" | "en" | "es");
    setIsOpen(false);
  };

  return (
    <motion.header className="fixed w-full z-50 bg-white top-0" initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.5 }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
            <Link href="/">
              <Image src="/roecLogo.png" alt="Roec Logo" width={120} height={40} priority />
            </Link>
          </motion.div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            {["Home", "Portfolio", "Serviços", "Sobre"].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-800 hover:text-gray-600 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {item}
              </motion.a>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <motion.button
              className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contato
            </motion.button>

            <div className="relative">
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="px-4 py-2 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {languages[language]}
              </motion.button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    className="absolute top-full right-[5px] mt-2"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {Object.entries(languages).map(
                      ([code, label]) =>
                        code !== language && (
                          <motion.button
                            key={code}
                            onClick={() => handleLanguageChange(code)}
                            className="block w-full px-4 py-2 text-left hover:bg-gray-100 rounded-full"
                            whileHover={{ scale: 1.02 }}
                          >
                            {label}
                          </motion.button>
                        )
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
