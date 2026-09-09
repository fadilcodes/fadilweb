"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ExternalLink, Layers, Search } from "lucide-react";
import { Github } from "@/components/ui/SocialIcons";
import { ProjectItem } from "@/lib/mock-data";

interface ProjectCatalogProps {
  initialProjects: ProjectItem[];
}

export default function ProjectCatalog({ initialProjects }: ProjectCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Optimasi 1: Pakai useMemo supaya ngga dihitung ulang tiap kali ngetik search
  const categories = useMemo(() => {
    const stacks = new Set(initialProjects.flatMap((p) => p.tech_stack || []));
    return ["All", ...Array.from(stacks)];
  }, [initialProjects]);

  // Optimasi 2: Memoisasi hasil filter biar ringan
  const filteredProjects = useMemo(() => {
    return initialProjects.filter((project) => {
      const matchesCategory =
        selectedCategory === "All" ||
        project.tech_stack?.includes(selectedCategory);
      
      const matchesSearch =
        searchQuery === "" ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [initialProjects, selectedCategory, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Search & Filter Control Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-3xl border border-stone-200/80 shadow-2xs">
        
        {/* Category Pills - Ditambahin overflow-x-auto biar bisa di-scroll di HP kalau kepanjangan */}
        <div className="flex flex-nowrap md:flex-wrap items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-2xl text-xs font-semibold transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "bg-stone-100 text-stone-700 hover:bg-stone-200/80 border border-stone-200/60"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-64 flex-shrink-0">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari project..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-stone-50 border border-stone-200 text-stone-900 placeholder-stone-400 text-xs focus:outline-none focus:border-emerald-500 transition-colors shadow-2xs"
          />
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-stone-200/80 space-y-3 shadow-2xs">
          <Layers className="w-10 h-10 text-stone-400 mx-auto" />
          <h3 className="text-lg font-bold text-stone-800">Tidak ada project ditemukan</h3>
          <p className="text-xs text-stone-500">Coba ubah kata kunci pencarian atau kategori filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group rounded-3xl bg-white border border-stone-200/80 hover:border-emerald-400 overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 shadow-2xs hover:shadow-md shadow-emerald-600/5"
            >
              {/* Image */}
              <div className="relative h-48 w-full bg-stone-100 overflow-hidden">
                <Image
                  src={project.cover_image_url || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200"}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {project.is_featured && (
                  <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-semibold shadow-2xs">
                    Featured
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-stone-900 group-hover:text-emerald-700 transition-colors line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-stone-600 text-sm line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.tech_stack?.map((tech) => (
                    // Optimasi 3: Ganti key pakai string tech, bukan index
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-xl bg-stone-100 text-stone-700 text-xs font-medium border border-stone-200/60"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="text-xs font-semibold text-emerald-700 hover:underline inline-flex items-center gap-1"
                  >
                    <span>Detail & Dokumentasi</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <div className="flex items-center gap-3">
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub Code"
                        className="text-stone-500 hover:text-stone-900 transition-colors"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.live_demo_url && (
                      <a
                        href={project.live_demo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Live Demo"
                        className="text-stone-500 hover:text-emerald-700 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}