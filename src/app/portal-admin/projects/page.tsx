import { getProjects } from "@/lib/actions/data";
import ProjectsManager from "@/components/admin/ProjectsManager";
import { Briefcase } from "lucide-react";

export default async function AdminProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-emerald-700 text-xs font-mono font-semibold uppercase bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200/60 w-fit">
          <Briefcase className="w-4 h-4" />
          <span>Manajemen Konten</span>
        </div>
        <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight">Kelola Project Portofolio</h1>
        <p className="text-stone-600 text-sm">
          Tambah, ubah, dan atur visibilitas proyek karya yang tampil pada katalog halaman publik.
        </p>
      </div>

      <ProjectsManager initialProjects={projects} />
    </div>
  );
}
