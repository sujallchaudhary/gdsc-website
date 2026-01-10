"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { cn } from '@/libs/utils';

const NavbarLight = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isCompactRoute = ['/events', '/feeds', '/team'].includes(pathname);

  return (
    <>
      {/* UPDATED NAV:
        1. Changed 'fixed' to 'sticky' so it pushes content down.
        2. Added 'top-4' so it has a gap when stuck.
        3. Added 'mx-auto' and 'mt-8' for centering and initial top spacing.
        4. Removed 'left-1/2 -translate-x-1/2' (no longer needed for sticky).
      */}
      <nav 
        className={cn(
          "hidden md:flex sticky top-4 z-50 mx-auto mt-8 items-center justify-between",
          "rounded-[50px] border border-white/20 bg-[#E3E3E3]/50 backdrop-blur-xl shadow-lg",
          "px-6 py-3 transition-all duration-300",
          isCompactRoute ? "w-fit gap-6" : "w-[95%] max-w-292.5"
        )}
      >
        {/* Left Section */}
        <div className="flex items-center gap-4">
          
          {/* Logo */}
          <div className="relative h-11 w-11 shrink-0">
            <Image 
              src={`/logo.svg`} 
              alt="GDG Logo" 
              fill 
              className="object-contain"
              priority
            />
          </div>

          {!isCompactRoute && (
            <div className="flex flex-col">
              <span className="text-xl font-medium leading-tight text-neutral-900">
                Google Developer Groups
              </span>
              <span className="text-s text-neutral-600">
                On Campus • Netaji Subhas University Of Technology
              </span>
            </div>
          )}
        </div>

        {/* Right Section: Links */}
        <div className="flex items-center gap-8 text-xl font-medium text-neutral-900">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <Link href="/events" className="hover:text-blue-600 transition-colors">
            Events
          </Link>
          <Link href="/feeds" className="hover:text-blue-600 transition-colors">
            Feed
          </Link>
          <Link href="/team" className="hover:text-blue-600 transition-colors">
            About Team
          </Link>
          <Link href="/contact" className="hover:text-blue-600 transition-colors">
            Contact Us
          </Link>
        </div>
      </nav>

      {/* Mobile View */}
      <button 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed top-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-[#E3E3E3]/50 backdrop-blur-xl shadow-lg text-neutral-900"
      >
        <Menu size={24} /> 
      </button>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden flex items-start justify-end pt-24 pr-6"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-48 flex flex-col gap-2 rounded-2xl border border-white/20 bg-[#E3E3E3]/60 backdrop-blur-xl p-4 shadow-2xl"
          >
            <Link href="/" className="block rounded-lg px-4 py-2 text-neutral-900 hover:bg-black/5">Home</Link>
            <Link href="/events" className="block rounded-lg px-4 py-2 text-neutral-900 hover:bg-black/5">Events</Link>
            <Link href="/feeds" className="block rounded-lg px-4 py-2 text-neutral-900 hover:bg-black/5">Feed</Link>
            <Link href="/team" className="block rounded-lg px-4 py-2 text-neutral-900 hover:bg-black/5">About Team</Link>
            <Link href="/contact" className="block rounded-lg px-4 py-2 text-neutral-900 hover:bg-black/5">Contact Us</Link>
          </div>
        </div>
      )}
    </>
  );
};

export default NavbarLight;