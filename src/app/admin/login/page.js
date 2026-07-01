"use client";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await login(email, password);
    if (!res.success) {
      setError(res.error);
    }
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="bg-card p-12 rounded-[2rem] shadow-2xl border border-secondary/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/30 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />

        <div className="text-center mb-10 relative z-10">
          <h1 className="text-4xl font-serif text-primary mb-2">The Hamper House</h1>
          <p className="text-xs text-foreground/50 uppercase tracking-[0.2em] font-medium">Admin Portal Authorization</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm mb-6 border border-red-100 relative z-10">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div>
            <label className="block text-xs font-medium text-foreground/80 mb-2 uppercase tracking-wider">Email Address</label>
            <input
              type="email"
              required
              className="w-full px-5 py-4 rounded-xl border border-primary/10 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-white/60 transition-all text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@thehamperhouse.com"
            />
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-medium text-foreground/80 uppercase tracking-wider">Password</label>
              <button type="button" onClick={() => router.push('/admin/forgot-password')} className="text-xs text-accent hover:text-primary transition-colors">
                Forgot?
              </button>
            </div>
            <input
              type="password"
              required
              className="w-full px-5 py-4 rounded-xl border border-primary/10 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-white/60 transition-all text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-secondary py-5 rounded-xl uppercase tracking-[0.2em] text-xs font-medium hover:bg-primary/90 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-xl mt-4"
          >
            {loading ? "Authenticating..." : "Sign In to Portal"}
          </button>
        </form>
      </div>
    </motion.div>
  );
}
