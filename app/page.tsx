"use client";

import HomeCards from "@/components/home/HomeCards";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const heroImages = ["/hero-1.svg", "/hero-2.svg", "/hero-3.svg"];

export default function HomePage() {
  const [currentImage, setCurrentImage] = useState(0);
  const [fade, setFade] = useState(true);

  // Auto carousel
  useEffect(() => {
    const interval = setInterval(() => {
      triggerImageChange((currentImage + 1) % heroImages.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [currentImage]);

  // Smooth transition handler
  const triggerImageChange = (index: number) => {
    setFade(false);
    setTimeout(() => {
      setCurrentImage(index);
      setFade(true);
    }, 300);
  };

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div
        className={`
          absolute inset-0 -z-10
          transition-all duration-700 ease-in-out
          ${fade ? "opacity-100 scale-100" : "opacity-0 scale-105"}
        `}
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

      {/* Content */}
      <section className="relative min-h-screen flex items-center px-6 md:px-16">
        <div className="max-w-7xl w-full mx-auto flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12 text-white">
          {/* LEFT */}
          <div className="max-w-xl">
            {/* Logo */}
            <Image
              src="/gdg-logo.svg"
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
                    hover:-translate-y-[1px]
                    hover:shadow-lg
                    active:scale-95
                  "
                >
                  Let’s Connect
                </button>
              </Link>

              {/* Play Button → Instant Image Change */}
              <button
                onClick={() =>
                  triggerImageChange((currentImage + 1) % heroImages.length)
                }
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
                <svg
                  viewBox="0 0 24 24"
                  className="w-8 h-8 fill-black translate-x-[-1px]"
                >
                  <path d="M8 5.14v13.72c0 .97 1.05 1.57 1.9 1.06l10.3-6.86c.8-.53.8-1.6 0-2.12L9.9 4.08c-.85-.51-1.9.09-1.9 1.06z" />
                </svg>
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
