"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/libs/utils";
import styles from "./UnifiedNavbar.module.css";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "desktop" | "mobile";
}

const NavLink = ({ href, children, onClick, variant = "desktop" }: NavLinkProps) => {
  return (
    <Link
      href={href}
      className={cn(
        "transition-colors",
        variant === "desktop" 
          ? styles.textHover 
          : cn("block rounded-lg px-4 py-2", styles.textColor, styles.mobileHover)
      )}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

const UnifiedNavbar = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 80) {
      setIsCollapsed(true);
    } else {
      setIsCollapsed(false);
    }
  });

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Desktop Navbar */}
      <motion.nav
        initial={false}
        animate={{
          width: isCollapsed ? "500px" : "95vw",
          maxWidth: isCollapsed ? "500px" : "1170px",
          minWidth: isCollapsed ? "500px" : "auto",
        }}
        transition={{ 
          duration: 0.3,
          ease: [0.4, 0, 0.2, 1]
        }}
        style={{
          overflow: isCollapsed ? "visible" : "hidden",
        }}
        className={cn(
          "hidden min-[820px]:flex min-h-19.5 items-center rounded-[50px] border backdrop-blur-xl shadow-lg antialiased justify-between px-6 py-2",
          styles.navbar,
          styles.navBg,
          isHomePage && styles.dark,
          isHomePage
            ? "fixed z-50 left-1/2 -translate-x-1/2 top-[25px]"
            : "sticky z-50 mx-auto mt-8 top-[25px]"
        )}
      >
        <div className="flex items-center gap-3">
          <motion.div
            className="relative shrink-0"
            initial={false}
            animate={{
              height: isCollapsed ? 40 : 60,
              width: isCollapsed ? 40 : 60,
            }}
            transition={{ 
              duration: 0.3,
              ease: [0.4, 0, 0.2, 1]
            }}
          >
            <Image
              src={`/logo.svg`}
              alt="GDG Logo"
              fill
              className="object-contain"
              sizes="60px"
              priority
            />
          </motion.div>

          <motion.div
            initial={false}
            animate={{
              opacity: isCollapsed ? 0 : 1,
              width: isCollapsed ? 0 : 400,
              display: isCollapsed ? "none" : "flex",
            }}
            transition={{ 
              duration: 0.3,
              ease: [0.4, 0, 0.2, 1]
            }}
            className="flex-col whitespace-nowrap overflow-hidden"
          >
            <span className={cn("text-lg 2xl:text-xl leading-tight", styles.textColor)}>
              Google Developer Groups
            </span>
            <span className={cn("text-sm 2xl:text-base", styles.subText)}>
              On Campus • Netaji Subhas University Of Technology
            </span>
          </motion.div>
        </div>

        <div className={cn(
          "flex items-center gap-4 2xl:gap-6 text-lg 2xl:text-xl whitespace-nowrap shrink-0",
          styles.textColor
        )}>
          <NavLink href="/">Home</NavLink>
          <NavLink href="/events">Events</NavLink>
          <NavLink href="/feeds">Feed</NavLink>
          <NavLink href="/team">About Team</NavLink>
          <NavLink href="/contact">Contact Us</NavLink>
        </div>
      </motion.nav>

      {/* Mobile Navbar */}
      {!isHomePage ? (
        <>
          <motion.nav
            initial={false}
            animate={{
              position: isCollapsed ? "fixed" : "relative",
              top: isCollapsed ? "0" : "auto",
            }}
            transition={{ 
              duration: 0.3,
              ease: [0.4, 0, 0.2, 1]
            }}
            className={cn(
              "min-[820px]:hidden border-b left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-white",
              styles.navbar
            )}
          >
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 shrink-0">
                <Image
                  src={`/logo.svg`}
                  alt="GDG Logo"
                  fill
                  className="object-contain"
                  sizes="40px"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className={cn("text-sm leading-tight", styles.textColor)}>
                  Google Developer Groups
                </span>
                <span className={cn("text-xs", styles.subText)}>
                  Netaji Subhas University Of Technology
                </span>
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                "flex h-10 w-10 items-center justify-center relative z-50",
                styles.textColor
              )}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </motion.nav>
          {isCollapsed && (
            <div className="md:hidden h-18" aria-hidden="true" />
          )}
        </>
      ) : (
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={cn(
            "min-[820px]:hidden fixed top-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border backdrop-blur-xl shadow-lg",
            styles.navbar,
            styles.dark,
            styles.mobileBg,
            styles.textColor
          )}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      )}

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className={cn(
              "fixed inset-0 z-40 backdrop-blur-sm min-[820px]:hidden flex items-start justify-end pt-24 pr-6",
              styles.navbar,
              isHomePage && styles.dark,
              styles.overlayBg
            )}
          >
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className={cn(
                "w-48 flex flex-col gap-2 rounded-2xl border backdrop-blur-xl p-4 shadow-2xl",
                styles.navbar,
                isHomePage && styles.dark,
                styles.mobileMenuBg
              )}
            >
              <NavLink href="/" variant="mobile" onClick={() => setIsMobileMenuOpen(false)}>
                Home
              </NavLink>
              <NavLink href="/events" variant="mobile" onClick={() => setIsMobileMenuOpen(false)}>
                Events
              </NavLink>
              <NavLink href="/feeds" variant="mobile" onClick={() => setIsMobileMenuOpen(false)}>
                Feed
              </NavLink>
              <NavLink href="/team" variant="mobile" onClick={() => setIsMobileMenuOpen(false)}>
                About Team
              </NavLink>
              <NavLink href="/contact" variant="mobile" onClick={() => setIsMobileMenuOpen(false)}>
                Contact Us
              </NavLink>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default UnifiedNavbar;
