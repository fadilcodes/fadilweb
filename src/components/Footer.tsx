import Link from "next/link";
import { ArrowUpRight, Heart, Code2 } from "lucide-react";
import { Github, Linkedin, Twitter, Instagram } from "@/components/ui/SocialIcons";

interface FooterProps {
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
}

export default function Footer({ socialLinks }: FooterProps) {
  const links = socialLinks || {
    github: "https://github.com/ahmadfadilah",
    linkedin: "https://linkedin.com/in/ahmadfadilah",
    twitter: "https://twitter.com/ahmadfadilah_dev",
    instagram: "https://instagram.com/ahmadfadilah.code",
  };

  return (
    <footer className=" border-stone-200/80 bg-[#f5f1ea]/80 mt-auto transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between pb-5">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-400 p-0.5 shadow-xs">
                <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                  <Code2 className="w-5 h-5 text-emerald-600" />
                </div>
              </div>
              <span className="font-bold text-xl tracking-tight text-stone-900">Ahmad Fadilah</span>
            </Link>
            <p className="text-stone-600 text-sm max-w-sm leading-relaxed font-normal">
              Full-Stack Software Engineer with 2 years of experience building scalable, 
              solution-oriented web applications.00
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-2">
              {links.github && (
                <a
                  href={links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="p-2.5 rounded-2xl bg-white border border-stone-200 text-stone-700 hover:text-emerald-700 hover:border-emerald-300 shadow-2xs hover:shadow-xs transition-all hover:-translate-y-0.5"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              {links.linkedin && (
                <a
                  href={links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="p-2.5 rounded-2xl bg-white border border-stone-200 text-stone-700 hover:text-emerald-700 hover:border-emerald-300 shadow-2xs hover:shadow-xs transition-all hover:-translate-y-0.5"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {links.twitter && (
                <a
                  href={links.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter Profile"
                  className="p-2.5 rounded-2xl bg-white border border-stone-200 text-stone-700 hover:text-emerald-700 hover:border-emerald-300 shadow-2xs hover:shadow-xs transition-all hover:-translate-y-0.5"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              )}
              {links.instagram && (
                <a
                  href={links.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram Profile"
                  className="p-2.5 rounded-2xl bg-white border border-stone-200 text-stone-700 hover:text-emerald-700 hover:border-emerald-300 shadow-2xs hover:shadow-xs transition-all hover:-translate-y-0.5"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-900">Navigasi Utama</h4>
            <ul className="space-y-2 text-sm text-stone-600 font-normal">
              <li>
                <Link href="/" className="hover:text-emerald-700 transition-colors">Home Page</Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-emerald-700 transition-colors">Project Catalog</Link>
              </li>
              <li>
                <Link href="/articles" className="hover:text-emerald-700 transition-colors">Artikel & Blog</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-700 transition-colors">Form Kontak</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-stone-200/80 flex justify-center items-center text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} Ahmad Fadilah. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
