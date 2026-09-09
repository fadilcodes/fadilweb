"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Edit2, TrendingUp, GraduationCap, Award, X } from "lucide-react";
import { SkillItem, EducationItem, CertificateItem } from "@/lib/mock-data";
import {
  saveSkill,
  deleteSkill,
  saveEducation,
  deleteEducation,
  saveCertificate,
  deleteCertificate,
} from "@/lib/actions/data";

interface SkillsEducationManagerProps {
  initialSkills: SkillItem[];
  initialEducation: EducationItem[];
  initialCertificates: CertificateItem[];
}

export default function SkillsEducationManager({
  initialSkills,
  initialEducation,
  initialCertificates,
}: SkillsEducationManagerProps) {
  const [activeTab, setActiveTab] = useState<"skills" | "education" | "certificates">("skills");
  const router = useRouter();

  const [skills, setSkills] = useState(initialSkills);
  const [education, setEducation] = useState(initialEducation);
  const [certificates, setCertificates] = useState(initialCertificates);

  // Skill modal state
  const [editingSkill, setEditingSkill] = useState<Partial<SkillItem> | null>(null);
  const [isSkillModal, setIsSkillModal] = useState(false);

  // Education modal state
  const [editingEdu, setEditingEdu] = useState<Partial<EducationItem> | null>(null);
  const [isEduModal, setIsEduModal] = useState(false);

  // Certificate modal state
  const [editingCert, setEditingCert] = useState<Partial<CertificateItem> | null>(null);
  const [isCertModal, setIsCertModal] = useState(false);

  // Skill Handlers
  const handleSaveSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSkill?.name) return;
    const res = await saveSkill(editingSkill as SkillItem);
    if (res.success) {
      const savedItem = (res.data || editingSkill) as SkillItem;
      if (editingSkill.id) {
        setSkills(skills.map((s) => (s.id === editingSkill.id ? savedItem : s)));
      } else {
        setSkills([...skills, savedItem]);
      }
      router.refresh();
      setIsSkillModal(false);
    } else {
      alert(`Gagal menyimpan skill: ${res.error || "Terjadi kesalahan"}`);
    }
  };

  const handleDeleteSkill = async (id: string) => {
    if (confirm("Hapus keahlian ini?")) {
      const res = await deleteSkill(id);
      if (res.success) {
        setSkills(skills.filter((s) => s.id !== id));
        router.refresh();
      } else {
        alert(`Gagal menghapus skill: ${res.error || "Terjadi kesalahan"}`);
      }
    }
  };

  // Education Handlers
  const handleSaveEducation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEdu?.institution) return;
    const res = await saveEducation(editingEdu as EducationItem);
    if (res.success) {
      const savedItem = (res.data || editingEdu) as EducationItem;
      if (editingEdu.id) {
        setEducation(education.map((eItem) => (eItem.id === editingEdu.id ? savedItem : eItem)));
      } else {
        setEducation([...education, savedItem]);
      }
      router.refresh();
      setIsEduModal(false);
    } else {
      alert(`Gagal menyimpan data pendidikan: ${res.error || "Terjadi kesalahan"}`);
    }
  };

  const handleDeleteEdu = async (id: string) => {
    if (confirm("Hapus data pendidikan ini?")) {
      const res = await deleteEducation(id);
      if (res.success) {
        setEducation(education.filter((eItem) => eItem.id !== id));
        router.refresh();
      } else {
        alert(`Gagal menghapus pendidikan: ${res.error || "Terjadi kesalahan"}`);
      }
    }
  };

  // Certificate Handlers
  const handleSaveCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCert?.title) return;
    const res = await saveCertificate(editingCert as CertificateItem);
    if (res.success) {
      const savedItem = (res.data || editingCert) as CertificateItem;
      if (editingCert.id) {
        setCertificates(certificates.map((cItem) => (cItem.id === editingCert.id ? savedItem : cItem)));
      } else {
        setCertificates([...certificates, savedItem]);
      }
      router.refresh();
      setIsCertModal(false);
    } else {
      alert(`Gagal menyimpan sertifikat: ${res.error || "Terjadi kesalahan"}`);
    }
  };

  const handleDeleteCert = async (id: string) => {
    if (confirm("Hapus sertifikat ini?")) {
      const res = await deleteCertificate(id);
      if (res.success) {
        setCertificates(certificates.filter((cItem) => cItem.id !== id));
        router.refresh();
      } else {
        alert(`Gagal menghapus sertifikat: ${res.error || "Terjadi kesalahan"}`);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-stone-100 border border-stone-200 w-fit">
        <button
          onClick={() => setActiveTab("skills")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === "skills" ? "bg-emerald-600 text-white shadow-sm shadow-emerald-600/20" : "text-stone-600 hover:text-stone-900 hover:bg-stone-200/50"
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Skills & Tech ({skills.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("education")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === "education" ? "bg-emerald-600 text-white shadow-sm shadow-emerald-600/20" : "text-stone-600 hover:text-stone-900 hover:bg-stone-200/50"
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Pendidikan ({education.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("certificates")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === "certificates" ? "bg-emerald-600 text-white shadow-sm shadow-emerald-600/20" : "text-stone-600 hover:text-stone-900 hover:bg-stone-200/50"
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Sertifikat ({certificates.length})</span>
        </button>
      </div>

      {/* TAB 1: SKILLS */}
      {activeTab === "skills" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-stone-200/80 shadow-sm">
            <h3 className="font-bold text-stone-900 text-base">Kelola Keahlian (Skills)</h3>
            <button
              onClick={() => {
                setEditingSkill({ name: "", category: "Frontend", proficiency: 90 });
                setIsSkillModal(true);
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-semibold text-xs shadow-sm shadow-emerald-600/20"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Skill</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {skills.map((s) => (
              <div key={s.id} className="p-4 rounded-2xl bg-white border border-stone-200/80 space-y-2 flex items-center justify-between shadow-sm">
                <div>
                  <h4 className="font-bold text-stone-900 text-sm">{s.name}</h4>
                  <p className="text-xs text-stone-500">
                    {s.category} · <span className="font-mono text-emerald-600 font-semibold">{s.proficiency}%</span>
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => {
                      setEditingSkill(s);
                      setIsSkillModal(true);
                    }}
                    className="p-1.5 rounded-lg bg-stone-100 text-stone-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteSkill(s.id)}
                    className="p-1.5 rounded-lg bg-stone-100 text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: EDUCATION */}
      {activeTab === "education" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-stone-200/80 shadow-sm">
            <h3 className="font-bold text-stone-900 text-base">Kelola Riwayat Pendidikan</h3>
            <button
              onClick={() => {
                setEditingEdu({ institution: "", degree: "", major: "", start_year: "2020", end_year: "2024", description: "" });
                setIsEduModal(true);
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-semibold text-xs shadow-sm shadow-emerald-600/20"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Pendidikan</span>
            </button>
          </div>

          <div className="space-y-4">
            {education.map((eItem) => (
              <div key={eItem.id} className="p-5 rounded-2xl bg-white border border-stone-200/80 flex items-start justify-between gap-4 shadow-sm">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-stone-900 text-base">{eItem.institution}</h4>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-mono font-medium border border-emerald-200/60">
                      {eItem.start_year} - {eItem.end_year}
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 font-medium">{eItem.degree} · {eItem.major}</p>
                  <p className="text-xs text-stone-500 pt-1">{eItem.description}</p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => {
                      setEditingEdu(eItem);
                      setIsEduModal(true);
                    }}
                    className="p-1.5 rounded-lg bg-stone-100 text-stone-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteEdu(eItem.id)}
                    className="p-1.5 rounded-lg bg-stone-100 text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: CERTIFICATES */}
      {activeTab === "certificates" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-stone-200/80 shadow-sm">
            <h3 className="font-bold text-stone-900 text-base">Kelola Sertifikat & Lisensi</h3>
            <button
              onClick={() => {
                setEditingCert({ title: "", issuer: "", issue_date: "2024", credential_url: "" });
                setIsCertModal(true);
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-semibold text-xs shadow-sm shadow-emerald-600/20"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Sertifikat</span>
            </button>
          </div>

          <div className="space-y-4">
            {certificates.map((cItem) => (
              <div key={cItem.id} className="p-5 rounded-2xl bg-white border border-stone-200/80 flex items-center justify-between gap-4 shadow-sm">
                <div>
                  <h4 className="font-bold text-stone-900 text-base">{cItem.title}</h4>
                  <p className="text-xs text-stone-500">
                    {cItem.issuer} · <span className="font-mono text-teal-600 font-semibold">{cItem.issue_date}</span>
                  </p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => {
                      setEditingCert(cItem);
                      setIsCertModal(true);
                    }}
                    className="p-1.5 rounded-lg bg-stone-100 text-stone-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteCert(cItem.id)}
                    className="p-1.5 rounded-lg bg-stone-100 text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SKILL MODAL */}
      {isSkillModal && editingSkill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white border border-stone-200 rounded-3xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-stone-200 pb-2">
              <h3 className="font-bold text-stone-900 text-base">Detail Skill</h3>
              <button onClick={() => setIsSkillModal(false)}><X className="w-5 h-5 text-stone-400 hover:text-stone-600" /></button>
            </div>
            <form onSubmit={handleSaveSkill} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs text-stone-600 font-medium">Nama Skill *</label>
                <input
                  type="text"
                  required
                  value={editingSkill.name || ""}
                  onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-stone-600 font-medium">Kategori</label>
                <select
                  value={editingSkill.category || "Frontend"}
                  onChange={(e) => setEditingSkill({ ...editingSkill, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-xs focus:outline-none focus:border-emerald-500"
                >
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Tools">Tools</option>
                  <option value="DevOps">DevOps</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs text-stone-600 font-medium">URL Icon Tech Stack (Gambar SVG / PNG)</label>
                <input
                  type="url"
                  placeholder="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg"
                  value={editingSkill.icon_url || ""}
                  onChange={(e) => setEditingSkill({ ...editingSkill, icon_url: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-stone-600 font-medium">Proficiency (1-100%)</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={editingSkill.proficiency || 90}
                  onChange={(e) => setEditingSkill({ ...editingSkill, proficiency: parseInt(e.target.value) || 90 })}
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setIsSkillModal(false)} className="px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium">Batal</button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-sm">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDUCATION MODAL */}
      {isEduModal && editingEdu && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white border border-stone-200 rounded-3xl p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stone-200 pb-2">
              <h3 className="font-bold text-stone-900 text-base">Detail Pendidikan</h3>
              <button onClick={() => setIsEduModal(false)}><X className="w-5 h-5 text-stone-400 hover:text-stone-600" /></button>
            </div>
            <form onSubmit={handleSaveEducation} className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs text-stone-600 font-medium">Institusi *</label>
                <input
                  type="text"
                  required
                  value={editingEdu.institution || ""}
                  onChange={(e) => setEditingEdu({ ...editingEdu, institution: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-xs text-stone-600 font-medium">Gelar</label>
                  <input
                    type="text"
                    value={editingEdu.degree || ""}
                    onChange={(e) => setEditingEdu({ ...editingEdu, degree: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-stone-600 font-medium">Jurusan</label>
                  <input
                    type="text"
                    value={editingEdu.major || ""}
                    onChange={(e) => setEditingEdu({ ...editingEdu, major: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-xs text-stone-600 font-medium">Tahun Mulai</label>
                  <input
                    type="text"
                    value={editingEdu.start_year || ""}
                    onChange={(e) => setEditingEdu({ ...editingEdu, start_year: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-stone-600 font-medium">Tahun Selesai</label>
                  <input
                    type="text"
                    value={editingEdu.end_year || ""}
                    onChange={(e) => setEditingEdu({ ...editingEdu, end_year: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs text-stone-600 font-medium">Deskripsi</label>
                <textarea
                  rows={2}
                  value={editingEdu.description || ""}
                  onChange={(e) => setEditingEdu({ ...editingEdu, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-xs resize-none focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setIsEduModal(false)} className="px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium">Batal</button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-sm">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CERTIFICATE MODAL */}
      {isCertModal && editingCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white border border-stone-200 rounded-3xl p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stone-200 pb-2">
              <h3 className="font-bold text-stone-900 text-base">Detail Sertifikat</h3>
              <button onClick={() => setIsCertModal(false)}><X className="w-5 h-5 text-stone-400 hover:text-stone-600" /></button>
            </div>
            <form onSubmit={handleSaveCertificate} className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs text-stone-600 font-medium">Judul Sertifikat *</label>
                <input
                  type="text"
                  required
                  value={editingCert.title || ""}
                  onChange={(e) => setEditingCert({ ...editingCert, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-stone-600 font-medium">URL Gambar / Cover Sertifikat</label>
                <input
                  type="url"
                  placeholder="https://example.com/sertifikat-bnsp.jpeg"
                  value={editingCert.image_url || ""}
                  onChange={(e) => setEditingCert({ ...editingCert, image_url: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-stone-600 font-medium">Penerbit (Issuer)</label>
                <input
                  type="text"
                  value={editingCert.issuer || ""}
                  onChange={(e) => setEditingCert({ ...editingCert, issuer: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-stone-600 font-medium">Tahun / Tanggal Terbit</label>
                <input
                  type="text"
                  value={editingCert.issue_date || ""}
                  onChange={(e) => setEditingCert({ ...editingCert, issue_date: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-stone-600 font-medium">URL Kredensial Verifikasi</label>
                <input
                  type="text"
                  value={editingCert.credential_url || ""}
                  onChange={(e) => setEditingCert({ ...editingCert, credential_url: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setIsCertModal(false)} className="px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium">Batal</button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-sm">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
