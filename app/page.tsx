"use client";

import HomeCards from "@/components/home/HomeCards";
import { PlayIcon } from "@/components/icons";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ASSET_PATHS } from '@/libs/utils';
// import { ASSET_PATHS } from '@/libs/utils';

const heroImages = [
  `${ASSET_PATHS.HOME}/hero-1.jpg`,
  `${ASSET_PATHS.HOME}/hero-2.jpg`,
  `${ASSET_PATHS.HOME}/hero-3.jpg`,
  `${ASSET_PATHS.HOME}/hero-4.jpg`,
  `${ASSET_PATHS.HOME}/hero-5.jpg`,
  `${ASSET_PATHS.HOME}/hero-6.jpg`,
  `${ASSET_PATHS.HOME}/hero-7.jpg`,
  `${ASSET_PATHS.HOME}/hero-8.jpg`,
  `${ASSET_PATHS.HOME}/hero-9.jpg`,
];

export default function HomePage() {
  const [currentImage, setCurrentImage] = useState(0);

  // Auto carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleNextImage = () => {
    setCurrentImage((prev) => (prev + 1) % heroImages.length);
  };

  return (
    <main className="relative min-h-screen overflow-hidden">
      <section className="relative h-[85vh] flex items-center px-6 md:px-16">
        <div className="absolute inset-0 -z-20 bg-black" />
        
        <AnimatePresence initial={false}>
          <motion.div
            key={currentImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 -z-10"
            style={{
              backgroundImage: `
                linear-gradient(
                  90deg,
                  rgba(0,0,0,0.9) 0%,
                  rgba(0,0,0,0.7) 35%,
                  rgba(0,0,0,0.4) 55%,
                  rgba(0,0,0,0.15) 70%,
                  rgba(0,0,0,0.0) 80%
                ),
                url("${heroImages[currentImage]}")
              `,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
        </AnimatePresence>

        {/* Content */}

        <div className="max-w-7xl pt-14 w-full mx-auto flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12 text-white">
          {/* LEFT */}
          <div className="max-w-xl">
            {/* Logo */}
            <Image
              src={`/gdg-logo.svg`}
              alt="GDG Logo"
              width={44}
              height={44}
              className="h-10 w-auto mb-6"
              priority
            />

            {/* Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium leading-tight mb-3">
              Google Developer Groups
            </h1>

            {/* Subheading */}
            <p className="text-sm sm:text-base md:text-lg mb-6 opacity-90">
              On Campus · Netaji Subhas University Of Technology
            </p>

            {/* CTA ROW */}
            <div className="flex items-center gap-4 mb-6">
              {/* Let’s Connect → Contact Page */}
              <Link href="/contact">
                <button
                  className="
                    bg-white text-black
                    px-8 py-2.5
                    rounded-md
                    text-base font-medium
                    transition-all duration-200
                    hover:-translate-y-px
                    hover:shadow-lg
                    active:scale-95
                  "
                >
                  Let's Connect
                </button>
              </Link>

              {/* Play Button → Instant Image Change */}
              <button
                onClick={handleNextImage}
                className="
                  flex items-center justify-center
                  w-12 h-12
                  rounded-full
                  bg-white
                  shadow-md
                  transition-all duration-200
                  hover:scale-110
                  active:scale-95
                "
              >
                <PlayIcon />
              </button>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base md:text-lg leading-relaxed max-w-md opacity-95">
              At GDG NSUT, we aim to learn, teach and grow together. A place
              where creative minds build impactful technology.
            </p>
          </div>
        </div>
      </section>

      {/* second section in the home page */}
      <HomeCards />
    </main>
  );
}
