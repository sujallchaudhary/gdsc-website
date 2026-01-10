"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            {/* Desktop View */}
            <motion.nav
                layout
                initial={false}
                animate={{
                    width: isScrolled ? "fit-content" : "95%",
                    maxWidth: isScrolled ? "100%" : "1170px",
                    top: isScrolled ? "20px" : "46px",
                    padding: isScrolled ? "8px 20px" : "8px 24px",
                }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                className="hidden md:flex fixed z-50 items-center justify-between rounded-[50px] border border-white/50 bg-black/40 backdrop-blur-[6px] shadow-[0_10px_30px_rgba(0,0,0,0.35)] overflow-hidden top-[46px] left-1/2 -translate-x-1/2 w-[95%] max-w-[1170px] px-6 py-2 antialiased"
            >
                {/* Left Section: Logo & Text */}
                <div className="flex items-center gap-4">

                    <motion.div
                        className="relative shrink-0"
                        animate={{
                            height: isScrolled ? 40 : 60,
                            width: isScrolled ? 40 : 60
                        }}
                    >
                        <Image
                            src={`/logo.svg`}
                            alt="GDG Logo"
                            fill
                            className="object-contain"
                            sizes="120px"
                            priority
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 1, width: "auto" }}
                        animate={{
                            opacity: isScrolled ? 0 : 1,
                            width: isScrolled ? 0 : "auto",
                            paddingLeft: isScrolled ? 0 : 16
                        }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col whitespace-nowrap overflow-hidden"
                    >
                        <span className="text-xl leading-tight text-white ">
                            Google Developer Groups
                        </span>
                        <span className="text-s text-gray-200">
                            On Campus • Netaji Subhas University Of Technology
                        </span>
                    </motion.div>
                </div>

                {/* Right Section: Links */}
                <motion.div
                    className="flex items-center gap-8 text-xl text-white whitespace-nowrap shrink-0 pl-4"
                >
                    <Link href="/events" className="hover:text-blue-300 transition-colors">Events</Link>
                    <Link href="/feeds" className="hover:text-blue-300 transition-colors">Feed</Link>
                    <Link href="/team" className="hover:text-blue-300 transition-colors">About Team</Link>
                    <Link href="/contact" className="hover:text-blue-300 transition-colors">Contact Us</Link>
                </motion.div>
            </motion.nav>

            {/* Mobile View */}
            <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden fixed top-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/40 backdrop-blur-md shadow-lg transition-transform active:scale-95 text-white"
            >
                <Menu size={24} />
            </button>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden flex items-start justify-end pt-24 pr-6"
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="w-48 flex flex-col gap-2 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-4 shadow-2xl"
                    >
                        <Link href="/events" className="block rounded-lg px-4 py-2 text-white hover:bg-white/10">Events</Link>
                        <Link href="/feeds" className="block rounded-lg px-4 py-2 text-white hover:bg-white/10">Feed</Link>
                        <Link href="/team" className="block rounded-lg px-4 py-2 text-white hover:bg-white/10">About Team</Link>
                        <Link href="/contact" className="block rounded-lg px-4 py-2 text-white hover:bg-white/10">Contact Us</Link>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;