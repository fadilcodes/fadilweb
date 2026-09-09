import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { getArticleBySlug, getProfile } from "@/lib/actions/data";
import { formatDate } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: "Artikel Tidak Ditemukan" };
  return {
    title: `${article.title} - Ahmad Fadilah`,
    description: article.excerpt,
  };
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const [article, profile] = await Promise.all([
    getArticleBySlug(slug),
    getProfile(),
  ]);

  if (!article) {
    notFound();
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto space-y-10 text-stone-900">
      {/* Back link */}
      <Link
        href="/articles"
        className="inline-flex items-center gap-2 text-sm font-semibold text-stone-500 hover:text-teal-700 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Kembali ke Daftar Artikel</span>
      </Link>

      {/* Header */}
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-stone-500">
          <span className="flex items-center gap-1.5 text-teal-700 font-semibold">
            <Clock className="w-3.5 h-3.5" />
            <span>{article.reading_time || "5 min baca"}</span>
          </span>
          <span>·</span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>{formatDate(article.published_at || article.created_at)}</span>
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight leading-tight">
          {article.title}
        </h1>

        <p className="text-lg text-stone-600 leading-relaxed font-normal">
          {article.excerpt}
        </p>

        {/* Author Card */}
        <div className="flex items-center justify-between py-4 border-y border-stone-200/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-400 p-0.5 shadow-2xs">
              <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
            <div>
              <h4 className="text-sm font-bold text-stone-900">{profile.name}</h4>
              <p className="text-xs text-stone-500">{profile.role_title}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {article.tags?.map((t, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-xl bg-teal-50 text-teal-800 border border-teal-100 text-xs font-semibold"
              >
                #{t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Cover Image */}
      {article.cover_image_url && (
        <div className="relative h-64 sm:h-96 w-full rounded-3xl overflow-hidden border border-stone-200/80 shadow-md bg-stone-100">
          <Image
            src={article.cover_image_url}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Article Content Render */}
      <div className="space-y-6 text-stone-700 leading-relaxed text-base [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-stone-900 [&_h2]:mt-8 [&_h2]:mb-4 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-teal-700 [&_h3]:mt-6 [&_h3]:mb-3 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_code]:font-mono [&_code]:bg-stone-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-teal-800 [&_code]:border [&_code]:border-stone-200 [&_blockquote]:border-l-4 [&_blockquote]:border-teal-500 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-stone-500">
        <div dangerouslySetInnerHTML={{ __html: article.content }} />
      </div>
    </div>
  );
}
