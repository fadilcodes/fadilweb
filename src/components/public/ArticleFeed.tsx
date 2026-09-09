"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, Clock, Search } from "lucide-react";
import { ArticleItem } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

interface ArticleFeedProps {
  initialArticles: ArticleItem[];
}

export default function ArticleFeed({ initialArticles }: ArticleFeedProps) {
  const [selectedTag, setSelectedTag] = useState<string>("Semua");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const allTags = Array.from(
    new Set(initialArticles.flatMap((a) => a.tags || []))
  );

  const tagsList = ["Semua", ...allTags];

  const filteredArticles = initialArticles.filter((article) => {
    const matchesTag =
      selectedTag === "Semua" || article.tags?.includes(selectedTag);

    const matchesSearch =
      searchQuery === "" ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTag && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Control Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-3xl border border-stone-200/80 shadow-2xs">
        {/* Tag Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {tagsList.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 rounded-2xl text-xs font-semibold transition-all ${
                selectedTag === tag
                  ? "bg-teal-600 text-white shadow-xs"
                  : "bg-stone-100 text-stone-700 hover:bg-stone-200/80 border border-stone-200/60"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari judul artikel..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-stone-50 border border-stone-200 text-stone-900 placeholder-stone-400 text-xs focus:outline-none focus:border-teal-500 transition-colors shadow-2xs"
          />
        </div>
      </div>

      {/* Feed List */}
      {filteredArticles.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-stone-200/80 space-y-3 shadow-2xs">
          <BookOpen className="w-10 h-10 text-stone-400 mx-auto" />
          <h3 className="text-lg font-bold text-stone-800">Tidak ada artikel ditemukan</h3>
          <p className="text-xs text-stone-500">Coba ubah kata kunci pencarian atau tag kategori.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              className="group rounded-3xl bg-white border border-stone-200/80 hover:border-teal-400 overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 shadow-2xs hover:shadow-md shadow-teal-600/5"
            >
              {/* Cover Image */}
              <div className="relative h-52 w-full bg-stone-100 overflow-hidden">
                <Image
                  src={article.cover_image_url || "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1200"}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Meta & Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-stone-500 font-mono">
                    <span>{formatDate(article.published_at || article.created_at)}</span>
                    <span className="flex items-center gap-1 text-teal-700 font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{article.reading_time || "5 min baca"}</span>
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-stone-900 group-hover:text-teal-700 transition-colors line-clamp-2">
                    {article.title}
                  </h2>

                  <p className="text-stone-600 text-sm line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                {/* Tags & Action */}
                <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-1.5">
                    {article.tags?.slice(0, 3).map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-xl bg-teal-50 text-teal-800 text-[11px] font-medium border border-teal-100"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/articles/${article.slug}`}
                    className="text-xs font-semibold text-teal-700 hover:underline shrink-0 inline-flex items-center gap-1"
                  >
                    <span>Baca Artikel</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
