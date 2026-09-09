"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Edit2, Trash2, ExternalLink, Check, X, Sparkles, Image as ImageIcon } from "lucide-react";
import { Github } from "@/components/ui/SocialIcons";
import { ProjectItem } from "@/lib/mock-data";
import { saveProject, deleteProject } from "@/lib/actions/data";
import { slugify } from "@/lib/utils";

interface ProjectsManagerProps {
  initialProjects: ProjectItem[];
}

export default function ProjectsManager({ initialProjects }: ProjectsManagerProps) {
  const [projects, setProjects] = useState<ProjectItem[]>(initialProjects);
  const [editingProject, setEditingProject] = useState<Partial<ProjectItem> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [techInput, setTechInput] = useState("");
  const router = useRouter();

  const handleOpenAdd = () => {
    setEditingProject({
      title: "",
      slug: "",
      description: "",
      long_description: "",
      cover_image_url: "",
      tech_stack: ["Next.js", "TypeScript", "Tailwind CSS"],
      live_demo_url: "",
      github_url: "",
      is_featured: false,
    });
    setTechInput("");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (project: ProjectItem) => {
    setEditingProject(project);
    setTechInput("");
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus project ini?")) {
      const res = await deleteProject(id);
      if (res.success) {
        setProjects(projects.filter((p) => p.id !== id));
        router.refresh();
      } else {
        alert(`Gagal menghapus project: ${res.error || "Terjadi kesalahan"}`);
      }
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject?.title) return;

    const slug = editingProject.slug || slugify(editingProject.title);
    const payload: Partial<ProjectItem> = {
      ...editingProject,
      slug,
    };

    const res = await saveProject(payload);

    if (res.success) {
      const savedItem = (res.data || payload) as ProjectItem;
      if (editingProject.id) {
        setProjects(projects.map((p) => (p.id === editingProject.id ? savedItem : p)));
      } else {
        setProjects([savedItem, ...projects]);
      }
      router.refresh();
      setIsModalOpen(false);
      setEditingProject(null);
    } else {
      alert(`Gagal menyimpan project: ${res.error || "Terjadi kesalahan"}`);
    }
  };

  const handleAddTech = () => {
    if (techInput.trim() && editingProject) {
      const currentStack = editingProject.tech_stack || [];
      if (!currentStack.includes(techInput.trim())) {
        setEditingProject({
          ...editingProject,
          tech_stack: [...currentStack, techInput.trim()],
        });
      }
      setTechInput("");
    }
  };

  const handleRemoveTech = (tech: string) => {
    if (editingProject) {
      setEditingProject({
        ...editingProject,
        tech_stack: (editingProject.tech_stack || []).filter((t) => t !== tech),
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-stone-200/80 shadow-sm">
        <div>
          <h3 className="font-bold text-stone-900 text-base">Daftar Project Portofolio</h3>
          <p className="text-xs text-stone-500">Total: {projects.length} project tersimpan</p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-semibold text-xs shadow-sm shadow-emerald-600/20 active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Project Baru</span>
        </button>
      </div>

      {/* Projects Table */}
      <div className="rounded-2xl bg-white border border-stone-200/80 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-700">
            <thead className="bg-stone-50 text-stone-600 font-mono uppercase tracking-wider border-b border-stone-200">
              <tr>
                <th className="p-4">Judul Project</th>
                <th className="p-4">Tech Stack</th>
                <th className="p-4">Featured</th>
                <th className="p-4">Link Akses</th>
                <th className="p-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200/80">
              {projects.map((p) => (
                <tr key={p.id} className="hover:bg-stone-50/60 transition-colors">
                  <td className="p-4 font-bold text-stone-900 max-w-xs truncate">
                    <div>{p.title}</div>
                    <div className="text-[11px] font-mono text-stone-500 font-normal">/{p.slug}</div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {p.tech_stack?.slice(0, 3).map((t, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-stone-100 text-stone-700 font-mono text-[10px] border border-stone-200/60">
                          {t}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4">
                    {p.is_featured ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-mono font-semibold">
                        <Sparkles className="w-3 h-3" />
                        <span>Yes</span>
                      </span>
                    ) : (
                      <span className="text-stone-400 text-[10px] font-mono">No</span>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {p.live_demo_url && (
                        <a href={p.live_demo_url} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded bg-stone-100 hover:bg-emerald-50 text-stone-600 hover:text-emerald-700 transition-colors">
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {p.github_url && (
                        <a href={p.github_url} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors">
                          <Github className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEdit(p)}
                        className="p-1.5 rounded-lg bg-stone-100 hover:bg-emerald-50 text-stone-700 hover:text-emerald-700 transition-colors"
                        title="Edit Project"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="p-1.5 rounded-lg bg-stone-100 hover:bg-red-50 text-red-600 transition-colors"
                        title="Hapus Project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CRUD Modal */}
      {isModalOpen && editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl my-auto max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <h3 className="text-xl font-bold text-stone-900">
                {editingProject.id ? "Edit Data Project" : "Tambah Project Baru"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 rounded-lg text-stone-400 hover:text-stone-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-semibold text-stone-600 uppercase">Judul Project *</label>
                  <input
                    type="text"
                    required
                    value={editingProject.title || ""}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        title: e.target.value,
                        slug: slugify(e.target.value),
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-semibold text-stone-600 uppercase">URL Cover Image</label>
                  <input
                    type="text"
                    value={editingProject.cover_image_url || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, cover_image_url: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>

                {/* Tech Stack Chips Input */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-semibold text-stone-600 uppercase">Tech Stack Tags</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. Next.js, Supabase, Tailwind"
                      value={techInput}
                      onChange={(e) => setTechInput(e.target.value)}
                      className="flex-1 px-4 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-sm focus:outline-none focus:border-emerald-500"
                    />
                    <button
                      type="button"
                      onClick={handleAddTech}
                      className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold border border-stone-200"
                    >
                      Tambah Tag
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {editingProject.tech_stack?.map((t, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-mono flex items-center gap-1.5">
                        <span>{t}</span>
                        <button type="button" onClick={() => handleRemoveTech(t)} className="hover:text-red-600">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-semibold text-stone-600 uppercase">Ringkasan Singkat</label>
                  <textarea
                    rows={2}
                    value={editingProject.description || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-sm focus:outline-none focus:border-emerald-500 resize-none"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-semibold text-stone-600 uppercase">Deskripsi Lengkap / Spesifikasi</label>
                  <textarea
                    rows={4}
                    value={editingProject.long_description || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, long_description: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-sm focus:outline-none focus:border-emerald-500 resize-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-600 uppercase">Live Demo URL</label>
                  <input
                    type="text"
                    value={editingProject.live_demo_url || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, live_demo_url: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-600 uppercase">GitHub Repo URL</label>
                  <input
                    type="text"
                    value={editingProject.github_url || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, github_url: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="sm:col-span-2 pt-2">
                  <label className="flex items-center gap-2 text-xs text-stone-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingProject.is_featured || false}
                      onChange={(e) => setEditingProject({ ...editingProject, is_featured: e.target.checked })}
                      className="w-4 h-4 rounded bg-stone-50 border-stone-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>Tampilkan sebagai "Featured Project" di Halaman Utama</span>
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-teal-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 hover:from-emerald-500 hover:to-teal-600"
                >
                  Simpan Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
