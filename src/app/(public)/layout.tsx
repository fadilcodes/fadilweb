import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getProfile } from "@/lib/actions/data";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getProfile();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar cvUrl={profile.cv_url} />
      <main className="flex-1">{children}</main>
      <Footer socialLinks={profile.social_links} />
    </div>
  );
}
