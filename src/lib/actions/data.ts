"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  INITIAL_PROFILE,
  INITIAL_SKILLS,
  INITIAL_EDUCATION,
  INITIAL_CERTIFICATES,
  INITIAL_PROJECTS,
  INITIAL_ARTICLES,
  ProfileData,
  SkillItem,
  EducationItem,
  CertificateItem,
  ProjectItem,
  ArticleItem,
} from "@/lib/mock-data";

// Helper to safely invoke Supabase query with graceful fallback
async function safeQuery<T>(
  queryFn: (supabase: any) => Promise<{ data: T | null; error: any }>,
  fallback: T
): Promise<T> {
  try {
    const supabase = await createClient();
    const { data, error } = await queryFn(supabase);
    if (error || !data || (Array.isArray(data) && data.length === 0)) {
      return fallback;
    }
    return data;
  } catch (err) {
    return fallback;
  }
}

// PROFILE
export async function getProfile(): Promise<ProfileData> {
  return safeQuery(async (supabase) => {
    const { data, error } = await supabase.from("profiles").select("*").limit(1).maybeSingle();
    return { data, error };
  }, INITIAL_PROFILE);
}

export async function updateProfile(profileData: Partial<ProfileData>) {
  try {
    const adminSupabase = createAdminClient();
    const { data: existing } = await adminSupabase.from("profiles").select("id").limit(1).maybeSingle();

    const profileId = existing?.id || "7d9a2044-393d-4068-8e0e-d6849079001a";
    const { id, ...cleanData } = profileData;

    const { data, error } = await adminSupabase
      .from("profiles")
      .upsert({
        id: profileId,
        ...cleanData,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error("Error updating profile in Supabase:", error);
      return { success: false, error: error.message };
    }

    revalidatePath("/");
    revalidatePath("/portal-admin/profile");
    revalidatePath("/portal-admin/dashboard");
    return { success: true, data, message: "Profil berhasil diperbarui di database Supabase!" };
  } catch (e: any) {
    console.error("Profile update exception:", e);
    return { success: false, error: e?.message || "Gagal memperbarui profil" };
  }
}

// SKILLS
export async function getSkills(): Promise<SkillItem[]> {
  return safeQuery(async (supabase) => {
    const { data, error } = await supabase.from("skills").select("*").order("order_index", { ascending: true });
    return { data, error };
  }, INITIAL_SKILLS);
}

export async function saveSkill(skill: Partial<SkillItem>) {
  try {
    const adminSupabase = createAdminClient();
    const isRealUUID = skill.id && !skill.id.startsWith("s-") && skill.id.length > 20;

    if (isRealUUID) {
      const { data, error } = await adminSupabase.from("skills").update(skill).eq("id", skill.id).select().single();
      if (error) return { success: false, error: error.message };
      revalidatePath("/");
      revalidatePath("/portal-admin/skills-education");
      revalidatePath("/portal-admin/dashboard");
      return { success: true, data };
    } else {
      const { id, ...newSkillData } = skill;
      const { data, error } = await adminSupabase.from("skills").insert([newSkillData]).select().single();
      if (error) return { success: false, error: error.message };
      revalidatePath("/");
      revalidatePath("/portal-admin/skills-education");
      revalidatePath("/portal-admin/dashboard");
      return { success: true, data };
    }
  } catch (e: any) {
    console.error("Save skill error:", e);
    return { success: false, error: e?.message };
  }
}

export async function deleteSkill(id: string) {
  try {
    const adminSupabase = createAdminClient();
    const { error } = await adminSupabase.from("skills").delete().eq("id", id);
    if (error) return { success: false, error: error.message };
    revalidatePath("/");
    revalidatePath("/portal-admin/skills-education");
    revalidatePath("/portal-admin/dashboard");
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e?.message };
  }
}

// EDUCATION
export async function getEducation(): Promise<EducationItem[]> {
  return safeQuery(async (supabase) => {
    const { data, error } = await supabase.from("education").select("*").order("order_index", { ascending: true });
    return { data, error };
  }, INITIAL_EDUCATION);
}

export async function saveEducation(edu: Partial<EducationItem>) {
  try {
    const adminSupabase = createAdminClient();
    const isRealUUID = edu.id && !edu.id.startsWith("e-") && edu.id.length > 20;

    if (isRealUUID) {
      const { data, error } = await adminSupabase.from("education").update(edu).eq("id", edu.id).select().single();
      if (error) return { success: false, error: error.message };
      revalidatePath("/");
      revalidatePath("/portal-admin/skills-education");
      revalidatePath("/portal-admin/dashboard");
      return { success: true, data };
    } else {
      const { id, ...newEduData } = edu;
      const { data, error } = await adminSupabase.from("education").insert([newEduData]).select().single();
      if (error) return { success: false, error: error.message };
      revalidatePath("/");
      revalidatePath("/portal-admin/skills-education");
      revalidatePath("/portal-admin/dashboard");
      return { success: true, data };
    }
  } catch (e: any) {
    return { success: false, error: e?.message };
  }
}

export async function deleteEducation(id: string) {
  try {
    const adminSupabase = createAdminClient();
    const { error } = await adminSupabase.from("education").delete().eq("id", id);
    if (error) return { success: false, error: error.message };
    revalidatePath("/");
    revalidatePath("/portal-admin/skills-education");
    revalidatePath("/portal-admin/dashboard");
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e?.message };
  }
}

// CERTIFICATES
export async function getCertificates(): Promise<CertificateItem[]> {
  return safeQuery(async (supabase) => {
    const { data, error } = await supabase.from("certificates").select("*").order("order_index", { ascending: true });
    return { data, error };
  }, INITIAL_CERTIFICATES);
}

export async function saveCertificate(cert: Partial<CertificateItem>) {
  try {
    const adminSupabase = createAdminClient();
    const isRealUUID = cert.id && !cert.id.startsWith("c-") && cert.id.length > 20;

    if (isRealUUID) {
      const { data, error } = await adminSupabase.from("certificates").update(cert).eq("id", cert.id).select().single();
      if (error) return { success: false, error: error.message };
      revalidatePath("/");
      revalidatePath("/portal-admin/skills-education");
      revalidatePath("/portal-admin/dashboard");
      return { success: true, data };
    } else {
      const { id, ...newCertData } = cert;
      const { data, error } = await adminSupabase.from("certificates").insert([newCertData]).select().single();
      if (error) return { success: false, error: error.message };
      revalidatePath("/");
      revalidatePath("/portal-admin/skills-education");
      revalidatePath("/portal-admin/dashboard");
      return { success: true, data };
    }
  } catch (e: any) {
    return { success: false, error: e?.message };
  }
}

export async function deleteCertificate(id: string) {
  try {
    const adminSupabase = createAdminClient();
    const { error } = await adminSupabase.from("certificates").delete().eq("id", id);
    if (error) return { success: false, error: error.message };
    revalidatePath("/");
    revalidatePath("/portal-admin/skills-education");
    revalidatePath("/portal-admin/dashboard");
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e?.message };
  }
}

// PROJECTS
export async function getProjects(): Promise<ProjectItem[]> {
  return safeQuery(async (supabase) => {
    const { data, error } = await supabase.from("projects").select("*").order("order_index", { ascending: true });
    return { data, error };
  }, INITIAL_PROJECTS);
}

export async function getProjectBySlug(slug: string): Promise<ProjectItem | null> {
  const projects = await getProjects();
  return projects.find((p) => p.slug === slug) || INITIAL_PROJECTS.find((p) => p.slug === slug) || null;
}

export async function saveProject(project: Partial<ProjectItem>) {
  try {
    const adminSupabase = createAdminClient();
    const isRealUUID = project.id && !project.id.startsWith("p-") && project.id.length > 20;

    if (isRealUUID) {
      const { data, error } = await adminSupabase.from("projects").update(project).eq("id", project.id).select().single();
      if (error) return { success: false, error: error.message };
      revalidatePath("/");
      revalidatePath("/projects");
      revalidatePath("/portal-admin/projects");
      revalidatePath("/portal-admin/dashboard");
      return { success: true, data };
    } else {
      const { id, ...newProjectData } = project;
      const { data, error } = await adminSupabase.from("projects").insert([newProjectData]).select().single();
      if (error) return { success: false, error: error.message };
      revalidatePath("/");
      revalidatePath("/projects");
      revalidatePath("/portal-admin/projects");
      revalidatePath("/portal-admin/dashboard");
      return { success: true, data };
    }
  } catch (e: any) {
    return { success: false, error: e?.message };
  }
}

export async function deleteProject(id: string) {
  try {
    const adminSupabase = createAdminClient();
    const { error } = await adminSupabase.from("projects").delete().eq("id", id);
    if (error) return { success: false, error: error.message };
    revalidatePath("/");
    revalidatePath("/projects");
    revalidatePath("/portal-admin/projects");
    revalidatePath("/portal-admin/dashboard");
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e?.message };
  }
}

// ARTICLES
export async function getArticles(publishedOnly = true): Promise<ArticleItem[]> {
  return safeQuery(async (supabase) => {
    let query = supabase.from("articles").select("*").order("created_at", { ascending: false });
    if (publishedOnly) {
      query = query.eq("is_published", true);
    }
    const { data, error } = await query;
    return { data, error };
  }, publishedOnly ? INITIAL_ARTICLES.filter(a => a.is_published) : INITIAL_ARTICLES);
}

export async function getArticleBySlug(slug: string): Promise<ArticleItem | null> {
  const articles = await getArticles(false);
  return articles.find((a) => a.slug === slug) || INITIAL_ARTICLES.find((a) => a.slug === slug) || null;
}

export async function saveArticle(article: Partial<ArticleItem>) {
  try {
    const adminSupabase = createAdminClient();
    const isRealUUID = article.id && !article.id.startsWith("a-") && article.id.length > 20;

    if (isRealUUID) {
      const { data, error } = await adminSupabase.from("articles").update(article).eq("id", article.id).select().single();
      if (error) return { success: false, error: error.message };
      revalidatePath("/");
      revalidatePath("/articles");
      revalidatePath("/portal-admin/articles");
      revalidatePath("/portal-admin/dashboard");
      return { success: true, data };
    } else {
      const { id, ...newArticleData } = article;
      const { data, error } = await adminSupabase.from("articles").insert([newArticleData]).select().single();
      if (error) return { success: false, error: error.message };
      revalidatePath("/");
      revalidatePath("/articles");
      revalidatePath("/portal-admin/articles");
      revalidatePath("/portal-admin/dashboard");
      return { success: true, data };
    }
  } catch (e: any) {
    return { success: false, error: e?.message };
  }
}

export async function deleteArticle(id: string) {
  try {
    const adminSupabase = createAdminClient();
    const { error } = await adminSupabase.from("articles").delete().eq("id", id);
    if (error) return { success: false, error: error.message };
    revalidatePath("/");
    revalidatePath("/articles");
    revalidatePath("/portal-admin/articles");
    revalidatePath("/portal-admin/dashboard");
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e?.message };
  }
}
