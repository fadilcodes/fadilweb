-- =========================================================
-- SUPABASE DATABASE SCHEMA & RLS POLICIES FOR PORTFOLIO CMS
-- =========================================================

-- 1. PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    role_title TEXT NOT NULL,
    bio TEXT,
    cv_url TEXT,
    email TEXT,
    phone TEXT,
    location TEXT,
    social_links JSONB DEFAULT '{}'::jsonb,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. SKILLS TABLE
CREATE TABLE IF NOT EXISTS public.skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    category TEXT NOT NULL, -- e.g. Frontend, Backend, DevOps, Tools
    proficiency INTEGER DEFAULT 90, -- 1 - 100 percentage
    icon_url TEXT,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. EDUCATION TABLE
CREATE TABLE IF NOT EXISTS public.education (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    institution TEXT NOT NULL,
    degree TEXT NOT NULL,
    major TEXT NOT NULL,
    start_year TEXT NOT NULL,
    end_year TEXT NOT NULL,
    description TEXT,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. CERTIFICATES TABLE
CREATE TABLE IF NOT EXISTS public.certificates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    issuer TEXT NOT NULL,
    issue_date TEXT NOT NULL,
    credential_url TEXT,
    image_url TEXT,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT NOT NULL,
    long_description TEXT,
    cover_image_url TEXT,
    tech_stack JSONB DEFAULT '[]'::jsonb, -- Array of technology tags
    live_demo_url TEXT,
    github_url TEXT,
    is_featured BOOLEAN DEFAULT false,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. ARTICLES TABLE
CREATE TABLE IF NOT EXISTS public.articles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL, -- HTML / Markdown Rich Content
    cover_image_url TEXT,
    tags JSONB DEFAULT '[]'::jsonb, -- Array of tags
    reading_time TEXT DEFAULT '5 min read',
    is_published BOOLEAN DEFAULT false,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =========================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- Public SELECT Access (Anon & Authenticated)
CREATE POLICY "Allow public read access on profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Allow public read access on skills" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Allow public read access on education" ON public.education FOR SELECT USING (true);
CREATE POLICY "Allow public read access on certificates" ON public.certificates FOR SELECT USING (true);
CREATE POLICY "Allow public read access on projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Allow public read access on articles" ON public.articles FOR SELECT USING (is_published = true OR auth.role() = 'authenticated');

-- Admin Full Access (Authenticated Users Only)
CREATE POLICY "Allow admin write profiles" ON public.profiles FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow admin write skills" ON public.skills FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow admin write education" ON public.education FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow admin write certificates" ON public.certificates FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow admin write projects" ON public.projects FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow admin write articles" ON public.articles FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- =========================================================
-- STORAGE BUCKETS SETUP
-- =========================================================

INSERT INTO storage.buckets (id, name, public) 
VALUES ('portfolio_media', 'portfolio_media', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies for 'portfolio_media'
CREATE POLICY "Public Read Access for portfolio_media" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'portfolio_media');

CREATE POLICY "Authenticated Upload Access for portfolio_media" 
ON storage.objects FOR INSERT 
TO authenticated 
WITH CHECK (bucket_id = 'portfolio_media');

CREATE POLICY "Authenticated Update Access for portfolio_media" 
ON storage.objects FOR UPDATE 
TO authenticated 
USING (bucket_id = 'portfolio_media');

CREATE POLICY "Authenticated Delete Access for portfolio_media" 
ON storage.objects FOR DELETE 
TO authenticated 
USING (bucket_id = 'portfolio_media');

-- =========================================================
-- INITIAL SEED DATA
-- =========================================================

INSERT INTO public.skills (name, category, proficiency, order_index) VALUES
('Next.js / React', 'Frontend', 95, 1),
('TypeScript', 'Frontend', 90, 2),
('Tailwind CSS', 'Frontend', 95, 3),
('Node.js / Express', 'Backend', 85, 4),
('Supabase & PostgreSQL', 'Backend', 90, 5),
('REST API & GraphQL', 'Backend', 88, 6),
('Docker & CI/CD', 'Tools', 80, 7),
('Git & GitHub', 'Tools', 92, 8),
('Figma & UI Design', 'Tools', 85, 9)
ON CONFLICT DO NOTHING;

INSERT INTO public.education (institution, degree, major, start_year, end_year, description, order_index) VALUES
('Universitas Teknologi Indonesia', 'Sarjana Komputer (S.Kom)', 'Teknik Informatika', '2020', '2024', 'Lulus dengan Predikat Pujian (Cum Laude). Aktif sebagai Ketua Himpunan dan Asisten Laboratorium RPL.', 1),
('SMA Negeri 1 Jakarta', 'MIPA', 'Ilmu Pengetahuan Alam', '2017', '2020', 'Aktif dalam Ekstrakurikuler Robotik dan OSIS Sekbid Teknologi.', 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.certificates (title, issuer, issue_date, credential_url, order_index) VALUES
('AWS Certified Cloud Practitioner', 'Amazon Web Services', '2024', 'https://aws.amazon.com/verification', 1),
('Meta Front-End Developer Professional Certificate', 'Coursera / Meta', '2023', 'https://coursera.org/verify/meta-frontend', 2),
('Supabase Fullstack Mastery', 'Supabase Academy', '2024', 'https://supabase.com/certified', 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.projects (title, slug, description, long_description, tech_stack, live_demo_url, github_url, is_featured, order_index) VALUES
(
    'Ahmad Portfolio & CMS Dashboard',
    'ahmad-portfolio-cms',
    'Interactive web portofolio full-stack dengan admin dashboard privat untuk pengelolaan konten real-time.',
    'Aplikasi portofolio berbasis Next.js App Router dan Supabase yang menyediakan visualisasi modern, sistem RLS Supabase yang sangat aman, upload file media, dan dashboard manajemen artikel modern.',
    '["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL"]'::jsonb,
    'https://fadilweb-demo.vercel.app',
    'https://github.com/ahmadfadilah/fadilweb_new',
    true,
    1
),
(
    'NexaMarket - SaaS E-Commerce Platform',
    'nexa-market-saas',
    'Platform e-commerce SaaS modern dengan analitik real-time, integrasi gateway pembayaran, dan manajemen inventaris.',
    'Platform multi-tenant SaaS yang dirancang untuk UMKM. Fitur mencakup dashboard keuangan, laporan stok real-time, integrasi Midtrans & Stripe, serta invoice generator otomatis.',
    '["Next.js", "React", "Node.js", "Tailwind CSS", "Prisma", "PostgreSQL"]'::jsonb,
    'https://nexamarket-demo.com',
    'https://github.com/ahmadfadilah/nexamarket',
    true,
    2
),
(
    'FlowTask - AI Task Management Suite',
    'flowtask-ai-suite',
    'Aplikasi manajemen tugas berbasis AI yang membantu tim mengoptimalkan alur kerja dan penjadwalan otomatis.',
    'FlowTask memanfaatkan AI untuk memberikan prioritas tugas otomatis, estimasi durasi pekerjaan, serta integrasi kalender tim secara real-time.',
    '["React", "TypeScript", "Tailwind CSS", "OpenAI API", "Supabase"]'::jsonb,
    'https://flowtask-ai.com',
    'https://github.com/ahmadfadilah/flowtask',
    true,
    3
)
ON CONFLICT DO NOTHING;

INSERT INTO public.articles (title, slug, excerpt, content, tags, reading_time, is_published, published_at) VALUES
(
    'Membangun Aplikasi Fullstack Berkinerja Tinggi dengan Next.js App Router & Supabase',
    'membangun-aplikasi-fullstack-nextjs-supabase',
    'Panduan komprehensif mengintegrasikan Next.js App Router dengan Supabase Auth, Row Level Security, dan Storage untuk performa optimal.',
    '<h2>Pendahuluan</h2><p>Pengembangan web modern membutuhkan kecepatan, fleksibilitas, dan keamanan yang tinggi. Kombinasi antara <strong>Next.js App Router</strong> dan <strong>Supabase</strong> memberikan solusi menyeluruh bagi pengembang fullstack.</p><h3>Mengapa Memilih Supabase?</h3><p>Supabase menyediakan database PostgreSQL lengkap dengan sistem autentikasi bawaan, instant APIs, dan Row Level Security (RLS) yang memastikan data pengguna terlindungi di tingkat basis data.</p><h3>Langkah Integrasi</h3><ol><li>Konfigurasi Supabase Client menggunakan `@supabase/ssr`.</li><li>Terapkan Middleware Next.js untuk menjaga sesi autentikasi pengguna.</li><li>Gunakan Server Actions untuk operasi CRUD data yang responsif.</li></ol><p>Dengan arsitektur ini, aplikasi Anda akan siap melayani ribuan pengguna dengan latency minimal!</p>',
    '["Next.js", "Supabase", "Web Dev", "TypeScript"]'::jsonb,
    '6 min read',
    true,
    NOW()
),
(
    'Praktik Terbaik UI/UX & Tailwind CSS untuk Portofolio Profesional',
    'praktik-terbaik-uiux-tailwind-css',
    'Tips dan trik membuat tampilan portofolio web yang elegan, aksesibel, dan memukau bagi calon klien dan recruiter.',
    '<h2>Desain Visual yang Bermakna</h2><p>Tampilan awal portofolio sangat menentukan kesan calon klien atau employer. Menggunakan hirarki visual yang jelas, skema warna yang harmonis, dan micro-animation yang halus akan meningkatkan daya tarik portofolio Anda.</p><h3>Poin Penting Tailwind CSS</h3><ul><li>Gunakan variabel warna kustom untuk mendukung Dark & Light Mode dengan mudah.</li><li>Manfaatkan Grid dan Flexbox responsif agar tampilan sempurna di perangkat seluler maupun desktop.</li><li>Jaga kontras teks tinggi untuk keterbacaan (readability) maksimal bagi semua kalangan usia.</li></ul>',
    '["UI/UX", "Tailwind CSS", "Design", "Frontend"]'::jsonb,
    '4 min read',
    true,
    NOW()
)
ON CONFLICT DO NOTHING;
