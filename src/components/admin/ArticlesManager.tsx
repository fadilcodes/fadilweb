"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Edit2, Trash2, FileText, Check, X, Eye, Clock } from "lucide-react";
import { ArticleItem } from "@/lib/mock-data";
import { saveArticle, deleteArticle } from "@/lib/actions/data";
import { slugify, calculateReadingTime } from "@/lib/utils";
import RichTextEditor from "./RichTextEditor";

interface ArticlesManagerProps {
  initialArticles: ArticleItem[];
}

export default function ArticlesManager({ initialArticles }: ArticlesManagerProps) {
  const [articles, setArticles] = useState<ArticleItem[]>(initialArticles);
  const [editingArticle, setEditingArticle] = useState<Partial<ArticleItem> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const router = useRouter();

  const handleOpenAdd = () => {
    setEditingArticle({
      title: "",
      slug: "",
      excerpt: "",
      content: "<h2>Pendahuluan</h2><p>Tuliskan konten artikel di sini...</p>",
      cover_image_url: "",
      tags: ["Next.js", "Web Dev"],
      reading_time: "5 min baca",
      is_published: true,
    });
    setTagInput("");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (article: ArticleItem) => {
    setEditingArticle(article);
    setTagInput("");
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus artikel ini?")) {
      const res = await deleteArticle(id);
      if (res.success) {
        setArticles(articles.filter((a) => a.id !== id));
        router.refresh();
      } else {
        alert(`Gagal menghapus artikel: ${res.error || "Terjadi kesalahan"}`);
      }
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArticle?.title) return;

    const slug = editingArticle.slug || slugify(editingArticle.title);
    const readingTime = calculateReadingTime(editingArticle.content || "");
    const newArticle: Partial<ArticleItem> = {
      ...editingArticle,
      slug,
      reading_time: readingTime,
      id: editingArticle.id || `a-${Date.now()}`,
      created_at: editingArticle.created_at || new Date().toISOString(),
      published_at: editingArticle.is_published ? new Date().toISOString() : null as any,
    };

    const res = await saveArticle(newArticle);

    if (res.success) {
      const savedItem = (res.data || newArticle) as ArticleItem;
      if (editingArticle.id) {
        setArticles(articles.map((a) => (a.id === editingArticle.id ? savedItem : a)));
      } else {
        setArticles([savedItem, ...articles]);
      }
      router.refresh();
      setIsModalOpen(false);
      setEditingArticle(null);
    } else {
      alert(`Gagal menyimpan artikel: ${res.error || "Terjadi kesalahan"}`);
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && editingArticle) {
      const currentTags = editingArticle.tags || [];
      if (!currentTags.includes(tagInput.trim())) {
        setEditingArticle({
          ...editingArticle,
          tags: [...currentTags, tagInput.trim()],
        });
      }
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    if (editingArticle) {
      setEditingArticle({
        ...editingArticle,
        tags: (editingArticle.tags || []).filter((t) => t !== tag),
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-stone-200/80 shadow-sm">
        <div>
          <h3 className="font-bold text-stone-900 text-base">Daftar Artikel & Jurnal Teknis</h3>
          <p className="text-xs text-stone-500">Total: {articles.length} artikel terdaftar</p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-semibold text-xs shadow-sm shadow-emerald-600/20 active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Tulis Artikel Baru</span>
        </button>
      </div>

      {/* Articles Table */}
      <div className="rounded-2xl bg-white border border-stone-200/80 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-700">
            <thead className="bg-stone-50 text-stone-600 font-mono uppercase tracking-wider border-b border-stone-200">
              <tr>
                <th className="p-4">Judul Artikel</th>
                <th className="p-4">Tags</th>
                <th className="p-4">Reading Time</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200/80">
              {articles.map((a) => (
                <tr key={a.id} className="hover:bg-stone-50/60 transition-colors">
                  <td className="p-4 font-bold text-stone-900 max-w-xs truncate">
                    <div>{a.title}</div>
                    <div className="text-[11px] font-mono text-stone-500 font-normal">/{a.slug}</div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {a.tags?.slice(0, 3).map((t, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-teal-50 text-teal-700 font-mono text-[10px] border border-teal-200/60">
                          #{t}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4 font-mono text-stone-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-teal-600" />
                      <span>{a.reading_time || "5 min baca"}</span>
                    </span>
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-mono border font-semibold ${
                        a.is_published
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-amber-50 text-amber-700 border-amber-200"
                      }`}
                    >
                      {a.is_published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEdit(a)}
                        className="p-1.5 rounded-lg bg-stone-100 hover:bg-teal-50 text-stone-700 hover:text-teal-700 transition-colors"
                        title="Edit Artikel"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(a.id)}
                        className="p-1.5 rounded-lg bg-stone-100 hover:bg-red-50 text-red-600 transition-colors"
                        title="Hapus Artikel"
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

      {/* Article Modal / Editor Drawer */}
      {isModalOpen && editingArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-stone-900/40 backdrop-blur-sm">
          <div className="w-full max-w-4xl bg-white border border-stone-200 rounded-3xl p-4 sm:p-8 space-y-6 shadow-2xl my-auto max-h-[92vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3 shrink-0">
              <h3 className="text-xl font-bold text-stone-900">
                {editingArticle.id ? "Edit Artikel" : "Tulis Artikel Baru"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 rounded-lg text-stone-400 hover:text-stone-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 overflow-y-auto flex-1 pr-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-semibold text-stone-600 uppercase">Judul Artikel *</label>
                  <input
                    type="text"
                    required
                    value={editingArticle.title || ""}
                    onChange={(e) =>
                      setEditingArticle({
                        ...editingArticle,
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
                    value={editingArticle.cover_image_url || ""}
                    onChange={(e) => setEditingArticle({ ...editingArticle, cover_image_url: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>

                {/* Tag Input Chips */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-semibold text-stone-600 uppercase">Tags Kategori</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. Next.js, UI/UX, Supabase"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      className="flex-1 px-4 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-sm focus:outline-none focus:border-emerald-500"
                    />
                    <button
                      type="button"
                      onClick={handleAddTag}
                      className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold border border-stone-200"
                    >
                      Tambah Tag
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {editingArticle.tags?.map((t, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-lg bg-teal-50 text-teal-700 border border-teal-200 text-xs font-mono flex items-center gap-1.5">
                        <span>#{t}</span>
                        <button type="button" onClick={() => handleRemoveTag(t)} className="hover:text-red-600">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-semibold text-stone-600 uppercase">Excerpt Ringkas</label>
                  <textarea
                    rows={2}
                    value={editingArticle.excerpt || ""}
                    onChange={(e) => setEditingArticle({ ...editingArticle, excerpt: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-sm focus:outline-none focus:border-emerald-500 resize-none"
                  />
                </div>

                {/* Rich Text Editor for Content */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-semibold text-stone-600 uppercase">Konten Lengkap Artikel (Rich Text Editor)</label>
                  <RichTextEditor
                    value={editingArticle.content || ""}
                    onChange={(val) => setEditingArticle({ ...editingArticle, content: val })}
                  />
                </div>

                <div className="sm:col-span-2 pt-2">
                  <label className="flex items-center gap-2 text-xs text-stone-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingArticle.is_published || false}
                      onChange={(e) => setEditingArticle({ ...editingArticle, is_published: e.target.checked })}
                      className="w-4 h-4 rounded bg-stone-50 border-stone-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>Publikasikan Langsung ke Feed Publik (Status: Published)</span>
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-200 flex justify-end gap-3 shrink-0">
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
                  Simpan Artikel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
