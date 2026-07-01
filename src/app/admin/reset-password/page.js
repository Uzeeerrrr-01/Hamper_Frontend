"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ResetPassword() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md mx-auto">
      <div className="bg-card p-12 rounded-[2rem] shadow-2xl border border-secondary/30 relative overflow-hidden text-center">
        <h1 className="text-3xl font-serif text-primary mb-4">Reset Password</h1>
        <p className="text-sm text-foreground/70 mb-8">Enter your details to proceed.</p>
        <Link href="/admin/login" className="text-accent hover:text-primary text-sm uppercase tracking-widest">Back to Login</Link>
      </div>
    </motion.div>
  );
}