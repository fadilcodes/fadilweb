"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Download, Menu, X, Code2 } from "lucide-react";

interface NavbarProps {
  cvUrl?: string;
}

export default function Navbar({ cvUrl = "#" }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "Articles", href: "/articles" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#faf8f5]/90 border-b border-stone-200/80 transition-colors duration-300 shadow-2xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo / Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex flex-col">
            <img src="fadilweb.svg" alt="Ahmad Fadilah" className="w-24 h-auto mt-1"/>

          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 bg-stone-100/80 p-1.5 rounded-full border border-stone-200/60 shadow-2xs">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${active
                  ? "bg-emerald-600 text-white shadow-sm shadow-emerald-600/25 font-semibold"
                  : "text-stone-600 hover:text-emerald-700 hover:bg-stone-200/60"
                  }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="inline-flex items-center gap-2 px-5 py-2 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white text-sm font-semibold shadow-sm shadow-emerald-600/20 active:scale-95 transition-all duration-200"
          >
            <Download className="w-4 h-4" />
            <span>Download CV</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-2xl bg-stone-100 border border-stone-200 text-stone-700"
            aria-label="Toggle Navigation Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden border-b border-stone-200 bg-[#faf8f5]/98 backdrop-blur-xl px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`px-4 py-2.5 rounded-2xl text-base font-medium transition-all ${isActive(item.href)
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold"
                  : "text-stone-700 hover:bg-stone-100"
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-stone-200">
            <a
              href={cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold shadow-sm shadow-emerald-600/20"
            >
              <Download className="w-4 h-4" />
              <span>Download CV</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
