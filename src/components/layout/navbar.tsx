"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Crown, LogOut, ShieldCheck, User } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";
import { motion } from "framer-motion";

export function Navbar() {
  const router = useRouter();
  const { user, logout, isAuthenticated } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-border-custom bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500/10 to-brand-primary/10 text-amber-500 shadow-xs border border-amber-500/20">
              <Crown className="h-5 w-5 animate-pulse" />
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tight text-text-main flex items-center gap-1.5 uppercase font-sans">
                viporchive <span className="text-brand-primary text-2xs px-2 py-0.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 font-bold">MABAR</span>
              </h1>
              <p className="text-2xs text-text-secondary leading-none">Fast Track & Play Manager</p>
            </div>
          </div>

          {/* User Status and Logout Section */}
          {isAuthenticated && user && (
            <div className="flex items-center gap-3">
              

              {/* Username Info (hidden on tiny screens) */}
              <div className="hidden md:flex flex-col items-end">
                <span className="text-xs font-bold text-text-main leading-tight">{user.username}</span>
                <span className="text-3xs text-text-secondary uppercase tracking-wider">{user.role} mode</span>
              </div>

              {/* Logout Button */}
              <motion.button
                whileHover={{ scale: 1 }}
                whileTap={{ scale: 1 }}
                onClick={handleLogout}
                title="Keluar Aplikasi"
                className="flex h-9 px-3 items-center gap-1.5 rounded-xl border border-border-custom bg-surface text-text-secondary hover:text-brand-danger hover:border-brand-danger/30 transition-colors cursor-pointer text-xs font-semibold"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Keluar</span>
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
