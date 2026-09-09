import { Metadata } from "next";
import ArticleFeed from "@/components/public/ArticleFeed";
import { getArticles } from "@/lib/actions/data";
import { BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Artikel & Journal - Ahmad Fadilah",
  description: "Kumpulan tulisan teknis, panduan Next.js & Supabase, pengalamaan hackathon, dan opini seputar dunia pengembangan web modern.",
};

export default async function ArticlesPage() {
  const articles = await getArticles(true);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-10">
      {/* Header */}
      <div className="space-y-3">
        <h1 className="text-4xl font-extrabold text-stone-900 tracking-tight">Artikel & Insights</h1>
        <p className="text-stone-600 text-base max-w-2xl font-normal">
         Sharing pengetahuan dan pengalaman dalam pengembangan web modern, termasuk panduan teknis, opini, dan pengalaman hackathon.
        </p>
      </div>

      {/* Interactive Article Feed */}
      <ArticleFeed initialArticles={articles} />
    </div>
  );
}
