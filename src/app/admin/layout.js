"use client";
import Sidebar from "../../components/admin/Sidebar";
import Topbar from "../../components/admin/Topbar";
import { AuthProvider } from "../../context/AuthContext";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login" || pathname === "/admin/forgot-password" || pathname === "/admin/reset-password";

  return (
    <AuthProvider>
      <div className="min-h-screen bg-background font-sans text-foreground">
        {!isLoginPage && <Sidebar />}
        <div className={!isLoginPage ? "md:ml-64 flex flex-col min-h-screen" : "min-h-screen flex items-center justify-center bg-secondary/10"}>
          {!isLoginPage && <Topbar />}
          <main className={!isLoginPage ? "p-8 flex-grow" : "w-full"}>
            {children}
          </main>
        </div>
      </div>
    </AuthProvider>
  );
}
