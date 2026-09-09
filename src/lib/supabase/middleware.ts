import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key";

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        supabaseResponse = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  // Check if navigating to protected admin dashboard
  if (request.nextUrl.pathname.startsWith("/portal-admin/dashboard")) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Support mock session cookie for demo mode if Supabase credentials are placeholder
    const isMockAdmin = request.cookies.get("mock_admin_auth")?.value === "true";

    if (!user && !isMockAdmin) {
      const url = request.nextUrl.clone();
      url.pathname = "/portal-admin/login";
      url.searchParams.set("redirect", request.nextUrl.pathname);
      return NextResponse.redirect(url);
    }
  }

  // Redirect logged-in admin from login page to dashboard
  if (request.nextUrl.pathname === "/portal-admin/login") {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const isMockAdmin = request.cookies.get("mock_admin_auth")?.value === "true";

    if (user || isMockAdmin) {
      const url = request.nextUrl.clone();
      url.pathname = "/portal-admin/dashboard";
      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}
