import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";

export const metadata = {
  title: "Admin - Saadat Industries",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  // If no session, render children without sidebar (login page)
  if (!session) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminSidebar userName={session.user?.name || "Admin"} />

      {/* Main content area */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 lg:px-8 mt-14 lg:mt-0">
          <h2 className="text-lg font-semibold text-gray-800">Admin Panel</h2>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600 hidden sm:block">
              Welcome, {session.user?.name || "Admin"}
            </span>
            <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-sm font-bold text-white">
              {session.user?.name?.charAt(0)?.toUpperCase() || "A"}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
