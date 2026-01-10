"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { DiscordIcon, GitHubIcon, InstagramIcon, LinkedInIcon } from "./icons";
import XIcon from "./icons/XIcon";
import { cn } from '@/libs/utils';

function SocialIcons({ variant }: { variant: "home" | "contact" }) {
  const dimension = {
    home: { width: 40, height: 40 },
    contact: { width: 45, height: 45 },
  };

  return (
    <>
      {variant === "home" && (
        <a href="https://x.com">
          <XIcon
            width={45}
            height={45}
            className="hover:text-text-light-gray"
          />
        </a>
      )}

      <a href="https://www.instagram.com/gdgnsut">
        <InstagramIcon
          width={dimension[variant].width}
          height={dimension[variant].height}
          className={
            variant === "contact"
              ? "text-primary-yellow hover:text-primary-yellow/80"
              : "hover:text-text-light-gray"
          }
        />
      </a>

      <a href="https://www.linkedin.com/company/gdscnsut/">
        <LinkedInIcon
          width={dimension[variant].width}
          height={dimension[variant].height}
          className={
            variant === "contact"
              ? "text-primary-blue hover:text-primary-blue/80"
              : "hover:text-text-light-gray"
          }
        />
      </a>

      <a href="https://discord.gg/WtqbaUzgR">
        <DiscordIcon
          width={dimension[variant].width}
          height={dimension[variant].height}
          className={
            variant === "contact"
              ? "text-primary-red hover:text-primary-red/80"
              : "hover:text-text-light-gray"
          }
        />
      </a>

      {variant === "contact" && (
        <a href="https://github.com/GDSC-NSUT">
          <GitHubIcon
            className="text-primary-green hover:text-primary-green/80"
            width={dimension[variant].width}
            height={dimension[variant].height}
          />
        </a>
      )}
    </>
  );
}

export default function Footer() {
  const pathname = usePathname();

  const isHome = pathname === "/";
  const isContact = pathname === "/contact";
  const logoSize = isHome
    ? { width: 80, height: 48 }
    : { width: 60, height: 38 };

  return (
    <footer>
      {/* ================= MOBILE FOOTER (ALL PAGES) ================= */}
      <div className="font-product-sans font-medium md:hidden bg-[#1D1D1D] text-white px-6 py-5">
        <div className="flex flex-col gap-6">
          <Image
            src={`/logo.svg`}
            alt="GDG Logo"
            width={logoSize.width}
            height={logoSize.height}
          />

          <div>
            <h2 className="text-[25px] text-white-500">
              Google Developer Groups
            </h2>
            <p className="text-[15px] text-white-400">
              On Campus · Netaji Subhas University Of Technology
            </p>
          </div>

          <span className="text-[15px] text-gray-300">Connect with us</span>

          <div className="flex gap-8">
            <SocialIcons variant="home" />
          </div>
        </div>
      </div>

      {/* ================= DESKTOP FOOTER ================= */}
      <div
        className={cn(
          "font-product-sans font-medium hidden md:block",
          isContact
            ? "bg-white text-black"
            : isHome
            ? "bg-[#1D1D1D] text-white"
            : "bg-text-black text-white"
        )}
      >
        {isContact && <div className="w-[95%] h-px bg-gray-500 mx-auto" />}
        <div
          className={cn(
            "mx-auto flex items-center justify-between",
            isContact ? "px-16 py-5" : isHome ? "px-12 py-10" : "px-12 py-5"
          )}
        >
          {/* LEFT */}
          <div
            className={cn(
              "flex gap-4",
              isHome ? "flex-col items-start" : "flex-row items-center"
            )}
          >
            <Image
              src={`/logo.svg`}
              alt="GDG Logo"
              width={logoSize.width}
              height={logoSize.height}
            />

            <div>
              <h2
                className={cn(
                  "text-white-500",
                  isHome ? "text-[30px]" : "text-[25px]"
                )}
              >
                Google Developer Groups
              </h2>
              <p
                className={cn(
                  "text-white-400",
                  isHome ? "text-[20px]" : "text-[15px]"
                )}
              >
                On Campus · Netaji Subhas University Of Technology
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col items-end gap-3">
            {isHome && (
              <span className="text-[20px] text-gray-300 mb-5">
                Connect with us
              </span>
            )}
            <div className="flex items-center gap-12">
              <SocialIcons variant={isContact ? "contact" : "home"} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
