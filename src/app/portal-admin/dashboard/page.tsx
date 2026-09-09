import Link from "next/link";
import {
  Briefcase,
  FileText,
  GraduationCap,
  Award,
  Plus,
  ArrowRight,
  TrendingUp,
  User,
} from "lucide-react";
import {
  getProjects,
  getArticles,
  getSkills,
  getEducation,
  getCertificates,
} from "@/lib/actions/data";

export default async function AdminDashboardOverview() {
  const [projects, articles, skills, education, certificates] = await Promise.all([
    getProjects(),
    getArticles(false),
    getSkills(),
    getEducation(),
    getCertificates(),
  ]);

  const stats = [
    { title: "Total Project", count: projects.length, icon: Briefcase, color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-200" },
    { title: "Total Artikel", count: articles.length, icon: FileText, color: "text-teal-600", bg: "bg-teal-50 border-teal-200" },
    { title: "Keahlian & Skills", count: skills.length, icon: TrendingUp, color: "text-purple-600", bg: "bg-purple-50 border-purple-200" },
    { title: "Pendidikan & Sertifikat", count: education.length + certificates.length, icon: GraduationCap, color: "text-amber-600", bg: "bg-amber-50 border-amber-200" },
  ];

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-teal-700 text-white shadow-lg shadow-emerald-600/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Selamat Datang di Dashboard Admin
          </h1>
          <p className="text-emerald-50 text-sm max-w-xl">
            Kelola profil, unggah proyek baru, publikasikan artikel blog, serta perbarui daftar skill dan sertifikat secara langsung.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/portal-admin/projects"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-emerald-800 hover:bg-emerald-50 font-bold text-xs shadow-md transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Project</span>
          </Link>
          <Link
            href="/portal-admin/articles"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-800/60 hover:bg-emerald-800 text-white border border-emerald-400/40 font-bold text-xs shadow-md transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Tulis Artikel</span>
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-stone-200/80 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="space-y-1">
                <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">{stat.title}</span>
                <span className="block text-3xl font-bold text-stone-900 font-mono">{stat.count}</span>
              </div>
              <div className={`p-3.5 rounded-2xl border ${stat.bg} ${stat.color}`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Grid Summaries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Projects Summary */}
        <div className="p-6 rounded-2xl bg-white border border-stone-200/80 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <h3 className="font-bold text-stone-900 text-lg flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-emerald-600" />
              <span>Project Terbaru</span>
            </h3>
            <Link href="/portal-admin/projects" className="text-xs text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1">
              <span>Kelola Semua</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {projects.slice(0, 3).map((p) => (
              <div key={p.id} className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-stone-900 text-sm">{p.title}</h4>
                  <p className="text-xs text-stone-500">{p.tech_stack?.join(", ")}</p>
                </div>
                {p.is_featured && (
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-mono border border-emerald-200 font-semibold">
                    Featured
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Articles Summary */}
        <div className="p-6 rounded-2xl bg-white border border-stone-200/80 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <h3 className="font-bold text-stone-900 text-lg flex items-center gap-2">
              <FileText className="w-5 h-5 text-teal-600" />
              <span>Artikel Terbaru</span>
            </h3>
            <Link href="/portal-admin/articles" className="text-xs text-teal-600 hover:text-teal-700 font-medium flex items-center gap-1">
              <span>Kelola Semua</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {articles.slice(0, 3).map((a) => (
              <div key={a.id} className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-stone-900 text-sm">{a.title}</h4>
                  <p className="text-xs text-stone-500">{a.reading_time}</p>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono border font-semibold ${
                  a.is_published
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : "bg-amber-50 text-amber-700 border-amber-200"
                }`}>
                  {a.is_published ? "Published" : "Draft"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
