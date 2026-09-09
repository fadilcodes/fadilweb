import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Ahmad Fadilah - Senior Full-Stack Engineer & UI/UX Specialist",
  description:
    "Portofolio interaktif dan profil profesional Ahmad Fadilah. Spesialis Next.js App Router, TypeScript, Supabase, dan desain UI/UX modern.",
  keywords: [
    "Ahmad Fadilah",
    "Full-Stack Developer",
    "Next.js Developer",
    "Supabase Expert",
    "TypeScript",
    "Portfolio Web",
    "Indonesia Developer",
  ],
  authors: [{ name: "Ahmad Fadilah" }],
  openGraph: {
    title: "Ahmad Fadilah - Senior Full-Stack Engineer",
    description:
      "Web portofolio interaktif berbasis Next.js App Router dan Supabase dengan CMS Admin Dashboard.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${inter.variable} ${mono.variable}`}>
      <body className="min-h-screen flex flex-col font-sans antialiased bg-[#faf8f5] text-stone-900 selection:bg-emerald-600 selection:text-white transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}
