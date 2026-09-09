import { getProfile } from "@/lib/actions/data";
import ProfileForm from "@/components/admin/ProfileForm";
import { User } from "lucide-react";

export default async function AdminProfilePage() {
  const profile = await getProfile();

  return ( 
    <div className="space-y-6">
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-blue-400 text-xs font-mono font-semibold uppercase">
          <User className="w-4 h-4" />
          <span>Pengaturan Biodata</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Edit Profil & Unggah CV</h1>
        <p className="text-slate-400 text-sm">
          Perbarui informasi publik, deskripsi bio hero, link media sosial, serta file CV resmi.
        </p>
      </div>

      <ProfileForm initialProfile={profile} />
    </div>
  );
}
