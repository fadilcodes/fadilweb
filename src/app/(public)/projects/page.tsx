import { Metadata } from "next";
import ProjectCatalog from "@/components/public/ProjectCatalog";
import { getProjects } from "@/lib/actions/data";
import { Layers } from "lucide-react";

export const metadata: Metadata = {
  title: "Katalog Project - Ahmad Fadilah",
  description: "Daftar portofolio proyek pengembang aplikasi web, SaaS, dan sistem cloud.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-10">
      {/* Header */}
      <div className="space-y-3">
        <h1 className="text-4xl font-extrabold text-stone-900 tracking-tight">Project Catalog</h1>
        <p className="text-stone-600 text-base max-w-2xl font-normal">
          Kumpulan proyek nyata yang telah saya bangun, mulai dari platform e-commerce, Company Profile, E-learning, hingga maps interaktif.
        </p>
      </div>

      {/* Interactive Catalog */}
      <ProjectCatalog initialProjects={projects} />
    </div>
  );
}
