import { getSkills, getEducation, getCertificates } from "@/lib/actions/data";
import SkillsEducationManager from "@/components/admin/SkillsEducationManager";
import { GraduationCap } from "lucide-react";

export default async function AdminSkillsEducationPage() {
  const [skills, education, certificates] = await Promise.all([
    getSkills(),
    getEducation(),
    getCertificates(),
  ]);

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-purple-700 text-xs font-mono font-semibold uppercase bg-purple-50 px-2.5 py-1 rounded-md border border-purple-200/60 w-fit">
          <GraduationCap className="w-4 h-4" />
          <span>Kredensial & Keahlian</span>
        </div>
        <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight">Manage Skills, Pendidikan & Sertifikat</h1>
        <p className="text-stone-600 text-sm">
          Atur daftar keahlian teknis, riwayat pendidikan, dan kredensial sertifikasi profesional.
        </p>
      </div>

      <SkillsEducationManager
        initialSkills={skills}
        initialEducation={education}
        initialCertificates={certificates}
      />
    </div>
  );
}
