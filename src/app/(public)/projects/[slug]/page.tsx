import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Calendar, CheckCircle2 } from "lucide-react";
import { Github } from "@/components/ui/SocialIcons";
import { getProjectBySlug } from "@/lib/actions/data";
import { formatDate } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project Tidak Ditemukan" };
  return {
    title: `${project.title} - Ahmad Fadilah`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-10 text-stone-900">
      {/* Back Button */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-sm font-semibold text-stone-500 hover:text-emerald-700 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Kembali ke Katalog Project</span>
      </Link>

      {/* Header Info */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-emerald-100/80 text-emerald-800 border border-emerald-200 text-xs font-semibold">
            Project Showcase
          </span>
          {project.created_at && (
            <span className="flex items-center gap-1.5 text-xs text-stone-500 font-mono">
              <Calendar className="w-3.5 h-3.5" />
              <span>{formatDate(project.created_at)}</span>
            </span>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
          {project.title}
        </h1>

        <p className="text-lg text-stone-600 leading-relaxed font-normal">
          {project.description}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          {project.live_demo_url && (
            <a
              href={project.live_demo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-sm shadow-emerald-600/20 active:scale-95 transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Kunjungi Live Demo</span>
            </a>
          )}

          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white hover:bg-stone-100 text-stone-800 border border-stone-200 font-semibold text-sm shadow-2xs active:scale-95 transition-all"
            >
              <Github className="w-4 h-4" />
              <span>Source Code GitHub</span>
            </a>
          )}
        </div>
      </div>

      {/* Cover Image */}
      <div className="relative h-64 sm:h-96 w-full rounded-3xl overflow-hidden border border-stone-200/80 shadow-md bg-stone-100">
        <Image
          src={project.cover_image_url || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200"}
          alt={project.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Tech Stack Grid */}
      <div className="p-6 rounded-3xl bg-white border border-stone-200/80 space-y-4 shadow-2xs">
        <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500">Teknologi yang Digunakan</h3>
        <div className="flex flex-wrap gap-2">
          {project.tech_stack?.map((tech, idx) => (
            <span
              key={idx}
              className="px-3.5 py-1.5 rounded-2xl bg-stone-100 text-stone-700 text-xs font-semibold border border-stone-200/60 flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>{tech}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Long Description */}
      <div className="space-y-4 pt-4 border-t border-stone-200/80">
        <h2 className="text-2xl font-bold text-stone-900">Deskripsi Lengkap & Spesifikasi</h2>
        <div className="text-stone-600 leading-relaxed text-base space-y-4 whitespace-pre-line font-normal">
          {project.long_description || project.description}
        </div>
      </div>
    </div>
  );
}
