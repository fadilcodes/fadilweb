import { getArticles } from "@/lib/actions/data";
import ArticlesManager from "@/components/admin/ArticlesManager";
import { FileText } from "lucide-react";

export default async function AdminArticlesPage() {
  const articles = await getArticles(false);

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-teal-700 text-xs font-mono font-semibold uppercase bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200/60 w-fit">
          <FileText className="w-4 h-4" />
          <span>Publikasi Konten</span>
        </div>
        <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight">Kelola Artikel Blog</h1>
        <p className="text-stone-600 text-sm">
          Tulis artikel teknis baru dengan Rich Text Editor, atur tag kategori, dan publikasikan ke halaman blog.
        </p>
      </div>

      <ArticlesManager initialArticles={articles} />
    </div>
  );
}
