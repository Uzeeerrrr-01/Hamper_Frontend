"use client";
import { LogOut, Bell, Menu } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { usePathname } from "next/navigation";

export default function Topbar() {
  const { logout, user } = useAuth();
  const pathname = usePathname();

  if (!user) return null;

  // Derive title from pathname
  const getTitle = () => {
    if (pathname === "/admin") return "Dashboard Overview";
    const pathParts = pathname.split("/").filter(Boolean);
    if (pathParts.length > 1) {
      const section = pathParts[1];
      return section.charAt(0).toUpperCase() + section.slice(1).replace("-", " ");
    }
    return "Dashboard";
  };

  return (
    <header className="bg-card/80 backdrop-blur-md shadow-sm h-20 flex items-center justify-between px-8 md:ml-64 sticky top-0 z-40 border-b border-primary/5">
      <div className="flex items-center">
        <button className="md:hidden mr-4 text-primary">
          <Menu className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-serif text-primary tracking-wide">{getTitle()}</h2>
      </div>
      <div className="flex items-center space-x-8">
        <button className="relative text-foreground/60 hover:text-primary transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-accent rounded-full border-2 border-card"></span>
        </button>
        <button onClick={logout} className="flex items-center space-x-2 text-foreground/60 hover:text-primary transition-colors text-sm font-medium uppercase tracking-wider">
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
}
