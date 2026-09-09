export interface ProfileData {
  id: string;
  name: string;
  role_title: string;
  bio: string;
  cv_url: string;
  email: string;
  phone: string;
  location: string;
  social_links: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
}

export interface SkillItem {
  id: string;
  name: string;
  category: "Frontend" | "Backend" | "Tools" | string;
  proficiency: number;
  icon_url?: string;
  order_index: number;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  major: string;
  start_year: string;
  end_year: string;
  description: string;
  order_index: number;
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  issue_date: string;
  credential_url?: string;
  image_url?: string;
  order_index: number;
}

export interface ProjectItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  long_description: string;
  cover_image_url: string;
  tech_stack: string[];
  live_demo_url: string;
  github_url: string;
  is_featured: boolean;
  order_index: number;
  created_at: string;
}

export interface ArticleItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image_url: string;
  tags: string[];
  reading_time: string;
  is_published: boolean;
  published_at: string;
  created_at: string;
}

export const INITIAL_PROFILE: ProfileData = {
  id: "profile-1",
  name: "Ahmad Fadilah",
  role_title: "Senior Full-Stack Engineer & UI/UX Specialist",
  bio: "Spesialis dalam membangun aplikasi web modern, cepat, dan aman menggunakan Next.js App Router, TypeScript, dan Supabase. Berfokus pada pengalaman pengguna yang luar biasa, arsitektur data terstruktur, serta estetika visual premium.",
  cv_url: "#",
  email: "ahmad.fadilah.dev@gmail.com",
  phone: "+62 812-3456-7890",
  location: "Jakarta, Indonesia",
  social_links: {
    github: "https://github.com/ahmadfadilah",
    linkedin: "https://linkedin.com/in/ahmadfadilah",
    twitter: "https://twitter.com/ahmadfadilah_dev",
    instagram: "https://instagram.com/ahmadfadilah.code",
  },
};

export const INITIAL_SKILLS: SkillItem[] = [
  { id: "s1", name: "Next.js 14/15", category: "Frontend", proficiency: 95, order_index: 1 },
  { id: "s2", name: "React & TypeScript", category: "Frontend", proficiency: 94, order_index: 2 },
  { id: "s3", name: "Tailwind CSS", category: "Frontend", proficiency: 96, order_index: 3 },
  { id: "s4", name: "HTML5 & Semantic UI", category: "Frontend", proficiency: 98, order_index: 4 },
  { id: "s5", name: "Supabase & PostgreSQL", category: "Backend", proficiency: 92, order_index: 5 },
  { id: "s6", name: "Node.js & Express", category: "Backend", proficiency: 88, order_index: 6 },
  { id: "s7", name: "REST API & GraphQL", category: "Backend", proficiency: 90, order_index: 7 },
  { id: "s8", name: "Prisma ORM", category: "Backend", proficiency: 86, order_index: 8 },
  { id: "s9", name: "Docker & Container", category: "Tools", proficiency: 80, order_index: 9 },
  { id: "s10", name: "Git & GitHub Actions", category: "Tools", proficiency: 92, order_index: 10 },
  { id: "s11", name: "Figma UI/UX", category: "Tools", proficiency: 87, order_index: 11 },
  { id: "s12", name: "Jest & Playwright", category: "Tools", proficiency: 82, order_index: 12 },
];

export const INITIAL_EDUCATION: EducationItem[] = [
  {
    id: "e1",
    institution: "Universitas Teknologi Indonesia",
    degree: "Sarjana Komputer (S.Kom)",
    major: "Teknik Informatika",
    start_year: "2020",
    end_year: "2024",
    description: "Lulus dengan predikat Cum Laude (IPK 3.91). Berperan sebagai Ketua Himpunan Mahasiswa Informatika dan asisten praktikum Rekayasa Perangkat Lunak.",
    order_index: 1,
  },
  {
    id: "e2",
    institution: "SMA Negeri 1 Jakarta",
    degree: "Sekolah Menengah Atas",
    major: "MIPA",
    start_year: "2017",
    end_year: "2020",
    description: "Meraih Juara 1 Lomba Pemrograman Web Antar SMA Se-DKI Jakarta dan aktif dalam tim Robotika.",
    order_index: 2,
  },
];

export const INITIAL_CERTIFICATES: CertificateItem[] = [
  {
    id: "c1",
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services (AWS)",
    issue_date: "2024",
    image_url: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=800&auto=format&fit=crop",
    order_index: 1,
  },
  {
    id: "c2",
    title: "Meta Front-End Developer Professional Certificate",
    issuer: "Meta / Coursera",
    issue_date: "2023",
    image_url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop",
    order_index: 2,
  },
  {
    id: "c3",
    title: "Supabase Fullstack Architecture Expert",
    issuer: "Supabase Academy",
    issue_date: "2024",
    image_url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop",
    order_index: 3,
  },
];

export const INITIAL_PROJECTS: ProjectItem[] = [
  {
    id: "p1",
    title: "Ahmad Interactive Portfolio & CMS Dashboard",
    slug: "ahmad-portfolio-cms",
    description: "Web portofolio interaktif full-stack dengan admin dashboard privat, manajemen konten real-time, dan UI modern glassmorphism.",
    long_description: "Project ini dirancang untuk menampilkan portofolio profesional secara interaktif dan dinamis. Fitur utama mencakup katalog proyek dengan filter tech stack, artikel blog dengan tipografi optikal tinggi, form kontak terintegrasi, serta admin dashboard privat untuk pengelolaan biodata, CV, proyek, artikel (dengan Rich Text Editor), dan daftar keahlian.",
    cover_image_url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop",
    tech_stack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL"],
    live_demo_url: "https://fadilweb-demo.vercel.app",
    github_url: "https://github.com/ahmadfadilah/fadilweb_new",
    is_featured: true,
    order_index: 1,
    created_at: "2026-08-15T10:00:00Z",
  },
  {
    id: "p2",
    title: "NexaMarket - SaaS E-Commerce Suite",
    slug: "nexa-market-saas",
    description: "Platform SaaS e-commerce multi-tenant dengan analitik pendapatan real-time, integrasi gateway pembayaran, dan manajemen stok otomatis.",
    long_description: "NexaMarket adalah aplikasi SaaS e-commerce lengkap yang memberikan kemudahan bagi UMKM untuk membuka toko online modern dalam waktu hitungan menit. Dilengkapi dengan laporan keuangan grafik interaktif, pemrosesan transaksi otomatis, dan manajemen inventaris tingkat lanjut.",
    cover_image_url: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1200&auto=format&fit=crop",
    tech_stack: ["Next.js", "React", "Node.js", "Tailwind CSS", "Prisma", "PostgreSQL"],
    live_demo_url: "https://nexamarket-demo.com",
    github_url: "https://github.com/ahmadfadilah/nexamarket",
    is_featured: true,
    order_index: 2,
    created_at: "2026-07-20T10:00:00Z",
  },
  {
    id: "p3",
    title: "FlowTask - AI-Powered Task Management",
    slug: "flowtask-ai-suite",
    description: "Aplikasi manajemen tugas berbasis AI yang membantu produktivitas tim dengan fitur Smart Prioritization dan Auto Scheduling.",
    long_description: "FlowTask menggabungkan antarmuka Kanban Board yang responsif dengan agen AI yang memberikan analisis beban kerja tim secara real-time. Sistem dapat menyarankan alokasi tugas optimal dan mendeteksi potensi penyumbatan alur kerja.",
    cover_image_url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
    tech_stack: ["React", "TypeScript", "Tailwind CSS", "OpenAI API", "Supabase"],
    live_demo_url: "https://flowtask-ai.com",
    github_url: "https://github.com/ahmadfadilah/flowtask",
    is_featured: true,
    order_index: 3,
    created_at: "2026-06-10T10:00:00Z",
  },
  {
    id: "p4",
    title: "CloudPulse - Server & API Health Monitoring",
    slug: "cloudpulse-monitoring",
    description: "Dashboard pemantauan kesehatan server, endpoint API, dan uptime sistem dengan notifikasi instan Telegram/Discord.",
    long_description: "CloudPulse melakukan ping berkala ke endpoint API dan instance cloud, mengukur respon latensi, serta menampilkan grafik statistik uptime real-time.",
    cover_image_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    tech_stack: ["Next.js", "Go", "Tailwind CSS", "Docker", "PostgreSQL"],
    live_demo_url: "https://cloudpulse-demo.com",
    github_url: "https://github.com/ahmadfadilah/cloudpulse",
    is_featured: false,
    order_index: 4,
    created_at: "2026-05-01T10:00:00Z",
  },
];

export const INITIAL_ARTICLES: ArticleItem[] = [
  {
    id: "a1",
    title: "Membangun Aplikasi Fullstack Berkinerja Tinggi dengan Next.js App Router & Supabase",
    slug: "membangun-aplikasi-fullstack-nextjs-supabase",
    excerpt: "Panduan komprehensif mengintegrasikan Next.js App Router dengan Supabase Auth, Row Level Security (RLS), dan Storage untuk performa optimal.",
    content: `
      <h2>Pendahuluan</h2>
      <p>Pengembangan web modern membutuhkan kecepatan, fleksibilitas, dan tingkat keamanan yang sangat tinggi. Kombinasi antara <strong>Next.js App Router</strong> dan <strong>Supabase</strong> memberikan solusi menyeluruh bagi pengembang fullstack modern.</p>
      
      <h3>Mengapa Memilih Supabase?</h3>
      <p>Supabase menyediakan database PostgreSQL lengkap dengan sistem autentikasi bawaan, instant APIs, dan <em>Row Level Security (RLS)</em> yang memastikan data pengguna terlindungi langsung dari tingkat basis data.</p>
      
      <h3>Langkah Integrasi Kunci</h3>
      <ol>
        <li>Konfigurasi Supabase SSR Client menggunakan <code>@supabase/ssr</code>.</li><li>Terapkan Middleware Next.js untuk menjaga persisten sesi autentikasi pengguna.</li><li>Gunakan Server Actions untuk operasi CRUD data yang aman dan cepat.</li>
      </ol>
      <p>Dengan arsitektur ini, aplikasi Anda akan siap melayani ribuan pengguna dengan latency minimal dan proteksi ketat.</p>
    `,
    cover_image_url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1200&auto=format&fit=crop",
    tags: ["Next.js", "Supabase", "TypeScript", "Web Dev"],
    reading_time: "6 min baca",
    is_published: true,
    published_at: "2026-08-10T10:00:00Z",
    created_at: "2026-08-10T10:00:00Z",
  },
  {
    id: "a2",
    title: "Praktik Terbaik UI/UX & Tailwind CSS untuk Portofolio Profesional",
    slug: "praktik-terbaik-uiux-tailwind-css",
    excerpt: "Tips dan trik membuat tampilan portofolio web yang elegan, aksesibel, dan memukau bagi calon klien dan recruiter.",
    content: `
      <h2>Desain Visual yang Bermakna</h2>
      <p>Tampilan awal portofolio sangat menentukan kesan calon klien atau employer. Menggunakan hirarki visual yang jelas, skema warna yang harmonis, dan micro-animation yang halus akan meningkatkan daya tarik portofolio Anda.</p>
      
      <h3>Poin Penting Tailwind CSS</h3>
      <ul>
        <li>Gunakan variabel warna kustom untuk mendukung Dark & Light Mode dengan mudah.</li>
        <li>Manfaatkan Grid dan Flexbox responsif agar tampilan sempurna di perangkat seluler maupun desktop.</li>
        <li>Jaga kontras teks tinggi untuk keterbacaan (readability) maksimal bagi semua kalangan usia.</li>
      </ul>
      <p>Investasi pada aspek UI/UX selalu memberikan hasil signifikan pada tingkat konversi dan impresi pertama.</p>
    `,
    cover_image_url: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop",
    tags: ["UI/UX", "Tailwind CSS", "Frontend", "Design"],
    reading_time: "4 min baca",
    is_published: true,
    published_at: "2026-07-28T10:00:00Z",
    created_at: "2026-07-28T10:00:00Z",
  },
  {
    id: "a3",
    title: "Pengalaman Mengikuti Hackathon Nasional & Strategi Memenangkan Juara",
    slug: "pengalaman-hackathon-nasional-strategi-juara",
    excerpt: "Berbagi cerita dari panggung hackathon: bagaimana merancang MVP dalam 24 jam dan menyajikan pitch deck yang meyakinkan juri.",
    content: `
      <h2>Tantangan 24 Jam</h2>
      <p>Hackathon adalah ujian sesungguhnya bagi kerjasama tim, ketahanan fisik, dan eksekusi ide secara kilat. Dalam kurun waktu terbatas, fokus utama adalah memvalidasi masalah nyata dan membangun Minimum Viable Product (MVP) yang berjalan tanpa cela.</p>
      
      <h3>Tiga Pilar Keberhasilan</h3>
      <ol>
        <li><strong>Fokus pada Core Value:</strong> Potong fitur sekunder dan fokus pada 1 fitur utama yang menyelesaikan masalah paling kritis.</li>
        <li><strong>Persiapkan Demo Data Realistis:</strong> Data sampel yang rapi dan memikat sangat mempermudah pemahaman juri.</li>
        <li><strong>Latihan Pitching:</strong> 3 menit pertama saat presentasi menentukan impresi juri terhadap produk Anda.</li>
      </ol>
    `,
    cover_image_url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=1200&auto=format&fit=crop",
    tags: ["Journey Belajar", "Hackathon", "Career", "Mindset"],
    reading_time: "5 min baca",
    is_published: true,
    published_at: "2026-06-15T10:00:00Z",
    created_at: "2026-06-15T10:00:00Z",
  },
];
