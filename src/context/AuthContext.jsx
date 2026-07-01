"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { apiClient } from "../lib/apiClient";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check if token exists in localStorage
    const loadUser = async () => {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        setLoading(false);
        // Redirect if on protected admin route
        if (pathname?.startsWith("/admin") && !pathname.includes("/login")) {
          router.push("/admin/login");
        }
        return;
      }

      try {
        const res = await apiClient.get("/auth/me");
        if (res.success && res.data.role !== "CUSTOMER") {
          setUser(res.data);
        } else {
          // If not an admin/staff, log them out
          logout();
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [pathname]); // Check on route change

  const login = async (email, password) => {
    try {
      const res = await apiClient.post("/auth/login", { email, password });
      if (res.success && res.user.role !== "CUSTOMER") {
        localStorage.setItem("adminToken", res.token);
        setUser(res.user);
        router.push("/admin");
        return { success: true };
      } else {
        return { success: false, error: "Access denied. Admin privileges required." };
      }
    } catch (error) {
      return { success: false, error: error.message || "Login failed" };
    }
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    setUser(null);
    if (pathname?.startsWith("/admin")) {
      router.push("/admin/login");
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
