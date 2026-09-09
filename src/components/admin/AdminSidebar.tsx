"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  User,
  Briefcase,
  FileText,
  GraduationCap,
  LogOut,
  ExternalLink,
  ShieldAlert,
  X,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface AdminSidebarProps {
  isMobileOpen?: boolean;
  onClose?: () => void;
}

export default function AdminSidebar({ isMobileOpen = false, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const navItems = [
    { name: "Overview", href: "/portal-admin/dashboard", icon: LayoutDashboard },
    { name: "Edit Profil & CV", href: "/portal-admin/profile", icon: User },
    { name: "Kelola Projects", href: "/portal-admin/projects", icon: Briefcase },
    { name: "Kelola Artikel", href: "/portal-admin/articles", icon: FileText },
    { name: "Skills & Education", href: "/portal-admin/skills-education", icon: GraduationCap },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    document.cookie = "mock_admin_auth=; path=/; max-age=0";
    router.push("/portal-admin/login");
    router.refresh();
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-stone-900/40 backdrop-blur-xs z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`w-64 bg-white border-r border-stone-200 flex flex-col h-screen fixed lg:sticky top-0 left-0 z-50 shrink-0 shadow-2xs transition-transform duration-300 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-stone-200/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-stone-900 text-base tracking-tight">Admin Portal</h2>
              <p className="text-[11px] font-mono text-stone-500">CMS Control Suite</p>
            </div>
          </div>

          {/* Close Mobile Button */}
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Nav List */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? "bg-emerald-600 text-white font-semibold shadow-sm shadow-emerald-600/20"
                    : "text-stone-600 hover:text-emerald-700 hover:bg-stone-100/80"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="p-4 border-t border-stone-200/80 space-y-2 bg-stone-50/50">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-xl bg-white border border-stone-200 text-xs text-stone-600 hover:text-emerald-700 hover:border-emerald-200 transition-colors shadow-2xs"
          >
            <span>Lihat Website Publik</span>
            <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Keluar (Logout)</span>
          </button>
        </div>
      </aside>
    </>
  );
}
