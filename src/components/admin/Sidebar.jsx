"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, ShoppingBag, Grid, Users, ClipboardList,
  MessageSquare, Image as ImageIcon, Mail, Settings
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuth();

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Products", href: "/admin/products", icon: ShoppingBag },
    { name: "Categories", href: "/admin/categories", icon: Grid },
    { name: "Orders", href: "/admin/orders", icon: ClipboardList },
    { name: "Customers", href: "/admin/customers", icon: Users },
    { name: "Testimonials", href: "/admin/testimonials", icon: MessageSquare },
    { name: "Gallery", href: "/admin/gallery", icon: ImageIcon },
    { name: "Newsletter", href: "/admin/newsletter", icon: Mail },
    { name: "Settings", href: "/admin/settings/website", icon: Settings },
  ];

  if (!user) return null; // Don't show sidebar if not logged in

  return (
    <aside className="w-64 bg-primary text-secondary min-h-screen hidden md:flex flex-col shadow-xl fixed">
      <div className="p-6">
        <Link href="/admin" className="text-xl font-serif text-secondary tracking-widest uppercase">
          The Hamper House
        </Link>
        <p className="text-xs text-secondary/60 mt-2 uppercase tracking-widest">Admin Portal</p>
      </div>
      <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/admin");
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${isActive ? "bg-secondary text-primary font-medium shadow-sm" : "hover:bg-primary/80 hover:text-white text-secondary/80"
                }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-6 border-t border-secondary/20">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-secondary text-primary flex items-center justify-center font-serif text-xl shadow-inner">
            {user?.firstName?.charAt(0) || "A"}
          </div>
          <div>
            <p className="text-sm font-medium">{user?.firstName} {user?.lastName}</p>
            <p className="text-[10px] text-secondary/60 uppercase tracking-widest">{user?.role}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
