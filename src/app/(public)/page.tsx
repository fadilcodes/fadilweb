import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Download,
  Mail,
  ExternalLink,
  Award,
  GraduationCap,
  Sparkles,
  Code2,
  Layers,
  Terminal,
  CheckCircle2,
} from "lucide-react";
import { Github } from "@/components/ui/SocialIcons";
import SkillMarquee from "@/components/public/SkillMarquee";
import {
  getProfile,
  getSkills,
  getEducation,
  getCertificates,
  getProjects,
} from "@/lib/actions/data";

export default async function HomePage() {
  const [profile, skills, education, certificates, projects] = await Promise.all([
    getProfile(),
    getSkills(),
    getEducation(),
    getCertificates(),
    getProjects(),
  ]);

  const featuredProjects = projects.filter((p) => p.is_featured).slice(0, 3);
  if (featuredProjects.length === 0) {
    featuredProjects.push(...projects.slice(0, 3));
  }

  return (
    <div className="space-y-24 pb-20 overflow-hidden bg-[#faf8f5] text-stone-900 transition-colors">
      {/* HERO SECTION */}
      <section className="relative pt-12 md:pt-20 lg:pt-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Soft Warm Glow Backgrounds */}
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-400/15 rounded-full blur-3xl -z-10 pointer-events-none"></div>
        <div className="absolute top-1/3 right-10 w-80 h-80 bg-teal-400/15 rounded-full blur-3xl -z-10 pointer-events-none"></div>
        <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-amber-300/20 rounded-full blur-3xl -z-10 pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-800 text-xs font-semibold shadow-2xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse"></span>
              <span>Terbuka Untuk Proyek Freelance & Full-Time</span>
            </div> */}

            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-stone-900 leading-tight">
                Hallo, I'm <br />
                <span className="gradient-text">{profile.name}</span>
              </h1>
              <p className="text-xl sm:text-2xl font-semibold text-stone-700">
                {profile.role_title}
              </p>
            </div>

            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl font-normal">
              {profile.bio}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-sm shadow-emerald-600/25 active:scale-95 transition-all duration-200"
              >
                <Mail className="w-4 h-4" />
                <span>Contact me</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={profile.cv_url}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-white hover:bg-stone-100 text-stone-800 border border-stone-200 font-semibold text-sm shadow-2xs active:scale-95 transition-all duration-200"
              >
                <Download className="w-4 h-4 text-emerald-600" />
                <span>Download CV</span>
              </a>
            </div>

            {/* Quick Stats Banner */}
            {/* <div className="grid grid-cols-3 gap-4 pt-6 border-t border-stone-200/80 max-w-lg">
              <div>
                <span className="block text-2xl font-extrabold text-stone-900 font-mono">2+</span>
                <span className="text-xs text-stone-500">Tahun Pengalaman</span>
              </div>
              <div>
                <span className="block text-2xl font-extrabold text-stone-900 font-mono">5+</span>
                <span className="text-xs text-stone-500">Project Selesai</span>
              </div>
              <div>
                <span className="block text-2xl font-extrabold text-stone-900 font-mono">99%</span>
                <span className="text-xs text-stone-500">Kepuasan Klien</span>
              </div>
            </div> */}
          </div>

          {/* Right Visual Card */}
          <div className="lg:col-span-5 flex justify-center relative">
            <img src="ahmadfadilah.png" alt="" />
            {/* <div className="relative w-72 sm:w-80 h-72 sm:h-80 rounded-3xl p-1 bg-gradient-to-tr from-emerald-500 via-teal-400 to-amber-400 shadow-xl shadow-emerald-600/15">
              <div className="w-full h-full bg-white rounded-[22px] overflow-hidden relative flex items-center justify-center p-6 text-center border border-stone-200/60">
                <div className="space-y-4">
                  <div className="w-24 h-24 mx-auto rounded-full bg-emerald-50 border-2 border-emerald-400/40 p-1 flex items-center justify-center shadow-inner">
                    <Code2 className="w-12 h-12 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-stone-900">{profile.name}</h3>
                    <p className="text-xs text-stone-500">{profile.location}</p>
                  </div>
                  <div className="flex justify-center flex-wrap gap-1.5 pt-1">
                    <span className="px-3 py-1 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200/60">Next.js</span>
                    <span className="px-3 py-1 rounded-xl bg-teal-50 text-teal-700 text-xs font-semibold border border-teal-200/60">Supabase</span>
                    <span className="px-3 py-1 rounded-xl bg-amber-50 text-amber-800 text-xs font-semibold border border-amber-200/60">TypeScript</span>
                  </div>
                </div>
              </div>
            </div> */}

            {/* Floating Badges */}
            <div className="absolute -top-4 -left-4 px-4 py-2 rounded-2xl bg-white border border-stone-200 text-xs font-semibold flex items-center gap-2 shadow-sm">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="text-stone-800">Full-Stack Web Developer</span>
            </div>
            <div className="absolute top-20  -left-30 px-4 py-2 rounded-2xl bg-white border border-stone-200 text-xs font-semibold flex items-center gap-2 shadow-sm">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="text-stone-800">Design Web Architecture</span>
            </div>
            <div className="absolute -bottom-4 -right-4 px-4 py-2 rounded-2xl bg-white border border-stone-200 text-xs font-semibold flex items-center gap-2 shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span className="text-stone-800">Eager to Learn</span>
            </div>
            <div className="absolute bottom-40 -right-40 px-4 py-2 rounded-2xl bg-white border border-stone-200 text-xs font-semibold flex items-center gap-2 shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span className="text-stone-800">Tech Enthusiast</span>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS SHOWCASE */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200/80 pb-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-700 text-xs font-mono font-semibold uppercase tracking-wider mb-1">
              {/* <Layers className="w-4 h-4" /> */}
              {/* <span>Katalog Portofolio</span> */}
            </div>
            <h2 className="text-3xl font-extrabold text-stone-900 tracking-tight">My Projects</h2>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition-colors"
          >
            <span>Lihat Semua Project</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project) => (
            <div
              key={project.id}
              className="group rounded-3xl bg-white border border-stone-200/80 hover:border-emerald-400 overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 shadow-2xs hover:shadow-md shadow-emerald-600/5"
            >
              {/* Image Container */}
              <div className="relative h-48 w-full bg-stone-100 overflow-hidden">
                <Image
                  src={project.cover_image_url || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200"}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {project.is_featured && (
                  <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-semibold shadow-2xs">
                    Featured
                  </span>
                )}
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-stone-900 group-hover:text-emerald-700 transition-colors line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-stone-600 text-sm line-clamp-2 leading-relaxed font-normal">
                    {project.description}
                  </p>
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.tech_stack?.slice(0, 4).map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-xl bg-stone-100 text-stone-700 text-xs font-medium border border-stone-200/60"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Footer Links */}
                <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="text-xs font-semibold text-emerald-700 hover:underline inline-flex items-center gap-1"
                  >
                    <span>Detail Project</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <div className="flex items-center gap-3">
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub Code"
                        className="text-stone-500 hover:text-stone-900 transition-colors"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.live_demo_url && (
                      <a
                        href={project.live_demo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Live Demo"
                        className="text-stone-500 hover:text-emerald-700 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SKILLS & TECH STACK */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 text-teal-700 text-xs font-mono font-semibold uppercase tracking-wider">
            {/* <Terminal className="w-4 h-4" />
            <span>Keahlian & Perangkat Lunak</span> */}
          </div>
          <h2 className="text-3xl font-extrabold text-stone-900 tracking-tight">Skills & Tech Stack</h2>
          <p className="text-stone-600 text-sm font-normal">
            The Technology & Software I used to build and develop my web application projects
          </p>
        </div>

        {/* Interactive Infinite Auto-Sliding Marquee */}
        <SkillMarquee skills={skills} />
      </section>

      {/* EXPERIENCE, EDUCATION & CERTIFICATES TIMELINE */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-16">
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-stone-200/80 pb-4">
            {/* <div className="p-3 rounded-2xl bg-emerald-100/80 border border-emerald-200 text-emerald-700">
              <GraduationCap className="w-6 h-6" />
            </div> */}
          <div>
          {/* <h3 className="text-2xl font-bold text-stone-900">Riwayat Pendidikan</h3> */}
              {/* <p className="text-stone-500 text-xs">Pendidikan formal & kualifikasi akademis</p> */}
        </div>
          </div>

          {/* <div className="relative pl-6 space-y-8 before:absolute before:left-2 before:top-3 before:bottom-3 before:w-0.5 before:bg-stone-300">
            {education.map((edu) => (
              <div key={edu.id} className="relative space-y-1.5">
                <span className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-emerald-600 ring-4 ring-[#faf8f5]"></span>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="text-lg font-bold text-stone-900">{edu.institution}</h4>
                  <span className="px-3 py-0.5 rounded-full bg-emerald-100/70 text-emerald-800 text-xs font-mono font-medium">
                    {edu.start_year} - {edu.end_year}
                  </span>
                </div>
                <p className="text-sm font-medium text-stone-700">
                  {edu.degree} · {edu.major}
                </p>
                <p className="text-xs text-stone-600 leading-relaxed">{edu.description}</p>
              </div>
            ))}
          </div> */}
        </div>

        {/* Certificates Showcase Grid */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-stone-200/80 pb-4">
            <div className="p-3 rounded-2xl bg-teal-100/80 border border-teal-200 text-teal-700">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-stone-900">Sertifikasi & Lisensi</h3>
              {/* <p className="text-stone-500 text-xs">Kredensial profesional terverifikasi dengan pratinjau sertifikat</p> */}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="rounded-3xl bg-white border border-stone-200/80 overflow-hidden shadow-2xs flex flex-col transition-all hover:border-emerald-300"
              >
                {/* Certificate Cover Preview */}
                <div className="relative h-44 w-full bg-stone-100 overflow-hidden">
                  <Image
                    src={cert.image_url || "https://sertifikasiindonesia.id/wp-content/uploads/2025/07/sertifikat-BNSP-1.jpeg"}
                    alt={cert.title}
                    fill
                    className="object-cover"
                  />
                  <span className="absolute bottom-3 right-3 px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-[11px] font-mono font-medium shadow-2xs">
                    {cert.issue_date}
                  </span>
                </div>

                {/* Certificate Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-stone-900 line-clamp-1">{cert.title}</h4>
                    <p className="text-xs text-stone-500">{cert.issuer}</p>
                  </div>
                  <div className="pt-2 border-t border-stone-100 flex items-center gap-1.5 text-xs text-emerald-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Terverifikasi Resmi</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT CTA BANNER */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="relative rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-emerald-600 via-teal-600 to-teal-700 text-white overflow-hidden shadow-xl text-center space-y-6">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Let’s collaborate! Available for projects & new opportunities
            </h2>
            {/* <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
              Saya selalu terbuka untuk berdiskusi tentang proyek pengumpulan kebutuhan, pengembangan aplikasi web full-stack, atau konsultasi arsitektur.
            </p> */}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-white text-emerald-700 font-bold text-base shadow-lg hover:bg-emerald-50 active:scale-95 transition-all duration-200"
            >
              <Mail className="w-5 h-5 text-emerald-600" />
              <span>Contact me</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
