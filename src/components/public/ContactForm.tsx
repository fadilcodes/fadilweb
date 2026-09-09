"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "Proyek Baru",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      setErrorMessage("Harap lengkapi semua kolom wajib.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", category: "Proyek Baru", message: "" });
      } else {
        const data = await res.json();
        setStatus("error");
        setErrorMessage(data.error || "Gagal mengirim pesan. Silakan coba lagi.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage("Terjadi kesalahan jaringan.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/80 space-y-6 shadow-2xs">
      <h3 className="text-xl font-bold text-stone-900">Kirim Pesan Direct</h3>

      {status === "success" && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600" />
          <span>Pesan Anda telah berhasil dikirim! Saya akan segera merespon via email.</span>
        </div>
      )}

      {status === "error" && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 text-red-600" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="space-y-4">
        {/* Name */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider">
            Nama Lengkap <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="Masukkan nama lengkap Anda..."
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 rounded-2xl bg-stone-50 border border-stone-200 text-stone-900 placeholder-stone-400 text-sm focus:outline-none focus:border-emerald-500 transition-colors shadow-2xs"
          />
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider">
            Alamat Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            required
            placeholder="Masukkan alamat email Anda..."
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 rounded-2xl bg-stone-50 border border-stone-200 text-stone-900 placeholder-stone-400 text-sm focus:outline-none focus:border-emerald-500 transition-colors shadow-2xs"
          />
        </div>

        {/* Category */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider">
            Kategori Subjek
          </label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-4 py-3 rounded-2xl bg-stone-50 border border-stone-200 text-stone-900 text-sm focus:outline-none focus:border-emerald-500 transition-colors shadow-2xs"
          >
            <option value="Proyek Baru">Tawaran Proyek / Freelance</option>
            <option value="Tawaran Kerja">Tawaran Pekerjaan Full-Time / Remote</option>
            <option value="Diskusi Teknis">Diskusi Teknis & Konsultasi</option>
            <option value="Lainnya">Lainnya</option>
          </select>
        </div>

        {/* Message */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider">
            Pesan Anda <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={5}
            required
            placeholder="Tulis pesan Anda di sini..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full px-4 py-3 rounded-2xl bg-stone-50 border border-stone-200 text-stone-900 placeholder-stone-400 text-sm focus:outline-none focus:border-emerald-500 transition-colors resize-none shadow-2xs"
          ></textarea>
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-sm shadow-sm shadow-emerald-600/25 flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-50"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Mengirim Pesan...</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            <span>Kirim Pesan</span>
          </>
        )}
      </button>
    </form>
  );
}
