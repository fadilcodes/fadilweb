"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, CheckCircle2, Upload, FileText, Loader2 } from "lucide-react";
import { ProfileData } from "@/lib/mock-data";
import { updateProfile } from "@/lib/actions/data";

interface ProfileFormProps {
  initialProfile: ProfileData;
}

export default function ProfileForm({ initialProfile }: ProfileFormProps) {
  const [profile, setProfile] = useState<ProfileData>(initialProfile);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    const res = await updateProfile(profile);
    setSaving(false);

    if (res.success) {
      if (res.data) setProfile(res.data);
      setMessage(res.message || "Profil & Biodata berhasil diperbarui di database!");
      router.refresh();
    } else {
      alert(`Gagal memperbarui profil: ${res.error || "Terjadi kesalahan"}`);
    }
    setTimeout(() => setMessage(""), 4000);
  };

  const handleCvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create object URL or simulate Supabase storage upload
      const dummyUrl = URL.createObjectURL(file);
      setProfile({ ...profile, cv_url: dummyUrl });
      alert(`File CV "${file.name}" berhasil diunggah!`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {message && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-medium flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600" />
          <span>{message}</span>
        </div>
      )}

      {/* Basic Profile Info */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/80 space-y-6 shadow-sm">
        <h3 className="text-xl font-bold text-stone-900 border-b border-stone-200 pb-3">Informasi Biodata & Headline</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-stone-600 uppercase">Nama Lengkap</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-stone-600 uppercase">Role / Jabatan Utama</label>
            <input
              type="text"
              value={profile.role_title}
              onChange={(e) => setProfile({ ...profile, role_title: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
            />
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-xs font-semibold text-stone-600 uppercase">Bio Ringkas (Hero & Footer)</label>
            <textarea
              rows={4}
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 resize-none transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-stone-600 uppercase">Email</label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-stone-600 uppercase">Nomor WhatsApp / Phone</label>
            <input
              type="text"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
            />
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-xs font-semibold text-stone-600 uppercase">Lokasi Domisili</label>
            <input
              type="text"
              value={profile.location}
              onChange={(e) => setProfile({ ...profile, location: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* CV File Upload Section */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/80 space-y-6 shadow-sm">
        <h3 className="text-xl font-bold text-stone-900 border-b border-stone-200 pb-3 flex items-center gap-2">
          <FileText className="w-5 h-5 text-emerald-600" />
          <span>Upload Curriculum Vitae (PDF)</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-stone-600 uppercase">URL Dokumen CV</label>
            <input
              type="text"
              value={profile.cv_url}
              onChange={(e) => setProfile({ ...profile, cv_url: e.target.value })}
              placeholder="https://..."
              className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 placeholder-stone-400 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-stone-600 uppercase">Atau Upload File Baru</label>
            <label className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-stone-50 hover:bg-stone-100 border border-dashed border-stone-300 text-stone-700 text-xs font-semibold cursor-pointer transition-colors">
              <Upload className="w-4 h-4 text-emerald-600" />
              <span>Pilih File PDF dari Komputer</span>
              <input type="file" accept=".pdf" onChange={handleCvUpload} className="hidden" />
            </label>
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/80 space-y-6 shadow-sm">
        <h3 className="text-xl font-bold text-stone-900 border-b border-stone-200 pb-3">Link Profil Media Sosial</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-stone-600 uppercase">GitHub URL</label>
            <input
              type="text"
              value={profile.social_links?.github || ""}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  social_links: { ...profile.social_links, github: e.target.value },
                })
              }
              className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-stone-600 uppercase">LinkedIn URL</label>
            <input
              type="text"
              value={profile.social_links?.linkedin || ""}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  social_links: { ...profile.social_links, linkedin: e.target.value },
                })
              }
              className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-stone-600 uppercase">Twitter / X URL</label>
            <input
              type="text"
              value={profile.social_links?.twitter || ""}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  social_links: { ...profile.social_links, twitter: e.target.value },
                })
              }
              className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-stone-600 uppercase">Instagram URL</label>
            <input
              type="text"
              value={profile.social_links?.instagram || ""}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  social_links: { ...profile.social_links, instagram: e.target.value },
                })
              }
              className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={saving}
        className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-sm shadow-md shadow-emerald-600/20 flex items-center gap-2 active:scale-95 transition-all disabled:opacity-50"
      >
        {saving ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Menyimpan Perubahan...</span>
          </>
        ) : (
          <>
            <Save className="w-4 h-4" />
            <span>Simpan Perubahan Profil</span>
          </>
        )}
      </button>
    </form>
  );
}
