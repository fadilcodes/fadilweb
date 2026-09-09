import { Metadata } from "next";
import ContactForm from "@/components/public/ContactForm";
import { getProfile } from "@/lib/actions/data";
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";
import { Github, Linkedin, Twitter, Instagram } from "@/components/ui/SocialIcons";

export const metadata: Metadata = {
  title: "Kontak & Diskusi Proyek - Ahmad Fadilah",
  description: "Hubungi Ahmad Fadilah untuk kolaborasi proyek web, tawaran pekerjaan, atau konsultasi arsitektur Next.js & Supabase.",
};

export default async function ContactPage() {
  const profile = await getProfile();

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-12">
      {/* Header */}
      <div className="space-y-3 max-w-2xl">
        <h1 className="text-4xl font-extrabold text-stone-900 tracking-tight">Hubungi Saya</h1>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Kolom Kiri: Direct Info */}
        <div className="lg:col-span-5 space-y-8">
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/80 space-y-6 shadow-2xs">
            <h3 className="text-xl font-bold text-stone-900 border-b border-stone-100 pb-3">Info Kontak Langsung</h3>

            <div className="space-y-5 text-sm">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs font-semibold text-stone-500 uppercase">Email</span>
                  <a href={`mailto:${profile.email}`} className="font-medium text-stone-800 hover:text-emerald-700 transition-colors">
                    {profile.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-teal-50 border border-teal-200 text-teal-700 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs font-semibold text-stone-500 uppercase">WhatsApp / Telepon</span>
                  <a href={`https://wa.me/${profile.phone.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer" className="font-medium text-stone-800 hover:text-teal-700 transition-colors">
                    {profile.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs font-semibold text-stone-500 uppercase">Lokasi Domisili</span>
                  <p className="font-medium text-stone-800">{profile.location}</p>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="pt-4 border-t border-stone-100 space-y-3">
              <span className="block text-xs font-semibold text-stone-500 uppercase">Media Sosial & Portofolio Code</span>
              <div className="flex items-center gap-3">
                {profile.social_links?.github && (
                  <a
                    href={profile.social_links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-2xl bg-stone-50 border border-stone-200 text-stone-600 hover:text-emerald-700 transition-all shadow-2xs"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                )}
                {profile.social_links?.linkedin && (
                  <a
                    href={profile.social_links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-2xl bg-stone-50 border border-stone-200 text-stone-600 hover:text-emerald-700 transition-all shadow-2xs"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {profile.social_links?.twitter && (
                  <a
                    href={profile.social_links.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-2xl bg-stone-50 border border-stone-200 text-stone-600 hover:text-emerald-700 transition-all shadow-2xs"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                )}
                {profile.social_links?.instagram && (
                  <a
                    href={profile.social_links.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-2xl bg-stone-50 border border-stone-200 text-stone-600 hover:text-emerald-700 transition-all shadow-2xs"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Form Pesan Interaktif */}
        <div className="lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
