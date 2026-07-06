"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import {
  Crown,
  User,
  Lock,
  Eye,
  EyeOff,
  Info,
  ShieldCheck,
  Check,
  ArrowLeft,
  MessageCircle,
  Star,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();
  const { login, loginAsGuest, isAuthenticated } = useAuthStore();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForgotTip, setShowForgotTip] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  const [pricingNotice, setPricingNotice] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setPricingNotice(
        "Untuk mendaftar akun VIP atau mendapatkan akses, silakan pilih paket di bawah atau hubungi Admin."
      );
      setShowPricing(true);
      return;
    }
    setIsLoading(true);
    setError("");
    try {
      const res = await login(username, password);
      if (res.success) {
        router.push("/");
      } else {
        setError(res.error || "Gagal masuk.");
      }
    } catch {
      setError("Terjadi kesalahan sistem. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestSignIn = () => {
    setIsLoading(true);
    setError("");
    setTimeout(() => {
      loginAsGuest();
      router.push("/");
    }, 600);
  };

  const autofillAdmin = () => {
    setUsername("admin");
    setPassword("admin123");
    setError("");
  };

  return (
    <div className="relative min-h-screen bg-background text-text-main flex flex-col items-center justify-center p-5 overflow-hidden select-none">
      {/* Ambient glow blobs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-primary/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-[350px] h-[350px] bg-amber-500/5 rounded-full blur-[90px] pointer-events-none" />

      {/* Main container */}
      <div className="w-full max-w-[420px] flex flex-col gap-5 z-10">

        {/* Logo + App Name */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="flex flex-col items-center text-center gap-3"
        >
          
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-text-main uppercase">
              viporchive
            </h1>
            <p className="text-xs text-text-secondary mt-1 font-medium tracking-wider uppercase">
              VIP Mabar Queue &amp; Fast Track Manager
            </p>
          </div>
        </motion.div>

        {/* Card */}
        <motion.div
          layout
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.45,
            delay: 0.1,
            type: "spring",
            stiffness: 100,
            layout: { type: "spring", stiffness: 220, damping: 26 },
          }}
          className="w-full rounded-2xl border border-border-custom bg-surface/90 backdrop-blur-xl shadow-2xl overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {!showPricing ? (
              /* LOGIN FORM */
              <motion.div
                key="login-panel"
                initial={{ x: -24, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -24, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="p-8 flex flex-col gap-5"
              >
                {/* Header */}
                <div>
                  <h2 className="text-2xl font-bold text-text-main">Welcome back</h2>
                  <p className="text-sm text-text-secondary mt-1">
                    Sign in to your account
                  </p>
                </div>

                {/* Error Alert */}
                <AnimatePresence mode="wait">
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-brand-danger/10 border border-brand-danger/30 rounded-xl p-3.5 text-sm text-brand-danger flex gap-2.5 items-start"
                    >
                      <Info className="h-4 w-4 shrink-0 mt-0.5" />
                      <span>{error}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Form */}
                <form onSubmit={handleSignIn} className="flex flex-col gap-4">
                  {/* Username */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="username" className="text-sm font-semibold text-text-main">
                      Username
                    </label>
                    <div className="relative group">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-text-secondary pointer-events-none group-focus-within:text-brand-primary transition-colors">
                        <User className="h-4 w-4" />
                      </span>
                      <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Masukkan username"
                        disabled={isLoading}
                        className="w-full bg-background/60 border border-border-custom hover:border-border-custom/80 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 rounded-xl py-3 pl-11 pr-4 text-sm text-text-main placeholder-text-secondary/50 outline-hidden transition-all"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <label htmlFor="password" className="text-sm font-semibold text-text-main">
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowForgotTip(!showForgotTip)}
                        className="text-sm text-brand-primary hover:underline font-semibold focus:outline-hidden"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <div className="relative group">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-text-secondary pointer-events-none group-focus-within:text-brand-primary transition-colors">
                        <Lock className="h-4 w-4" />
                      </span>
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Masukkan password"
                        disabled={isLoading}
                        className="w-full bg-background/60 border border-border-custom hover:border-border-custom/80 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 rounded-xl py-3 pl-11 pr-12 text-sm text-text-main placeholder-text-secondary/50 outline-hidden transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-4 text-text-secondary hover:text-text-main transition-colors focus:outline-hidden"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Forgot password tip */}
                  <AnimatePresence>
                    {showForgotTip && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-surface border border-border-custom rounded-xl p-3.5 text-sm text-text-secondary flex gap-2.5"
                      >
                        <Info className="h-4 w-4 text-brand-primary shrink-0 mt-0.5" />
                        <span>
                          Kehilangan akses? Hubungi{" "}
                          <strong className="text-text-main">Administrator Utama</strong> untuk reset
                          password atau mendapatkan kredensial baru.
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Sign In Button */}
                  <motion.button
                    whileHover={{ scale: 1 }}
                    whileTap={{ scale: 0.99 }}
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white font-semibold py-3 px-4 rounded-xl shadow-lg shadow-brand-primary/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-base mt-1"
                  >
                    {isLoading ? (
                      <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <span>Sign in</span>
                    )}
                  </motion.button>
                </form>

                {/* Divider */}
                <div className="flex items-center gap-4">
                  <div className="h-px bg-border-custom flex-1" />
                  <span className="text-xs uppercase tracking-wider text-text-secondary font-semibold">atau</span>
                  <div className="h-px bg-border-custom flex-1" />
                </div>

                {/* Guest Button */}
                <motion.button
                  whileHover={{ scale: 1 }}
                  whileTap={{ scale: 0.99 }}
                  type="button"
                  onClick={handleGuestSignIn}
                  disabled={isLoading}
                  className="w-full bg-transparent hover:bg-brand-success/5 border border-brand-success/40 hover:border-brand-success/70 text-brand-success font-semibold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-base"
                >
                  <span>Masuk sebagai Guest</span>
                </motion.button>

                {/* Bottom link */}
                <p className="text-center text-sm text-text-secondary border-t border-border-custom/40 pt-4">
                  Belum punya akun?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setPricingNotice("");
                      setShowPricing(true);
                    }}
                    className="text-brand-primary hover:underline font-semibold focus:outline-hidden"
                  >
                    Hubungi Admin
                  </button>
                </p>
              </motion.div>
            ) : (
              /* PRICING PANEL */
              <motion.div
                key="pricing-panel"
                initial={{ x: 24, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 24, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="p-8 flex flex-col gap-5"
              >
                {/* Back button */}
                <button
                  type="button"
                  onClick={() => setShowPricing(false)}
                  className="flex items-center gap-1.5 text-sm font-semibold text-text-secondary hover:text-text-main transition-colors focus:outline-hidden self-start"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Kembali ke Login</span>
                </button>

                {/* Header */}
                <div>
                  <h2 className="text-2xl font-bold text-text-main flex items-center gap-2">
                    <ShieldCheck className="h-6 w-6 text-amber-400 shrink-0" />
                    Paket Akses VIP
                  </h2>
                 
                </div>

                {/* Pricing notice */}
                {pricingNotice && (
                  <div className="bg-brand-primary/10 border border-brand-primary/30 rounded-xl p-3.5 text-sm text-text-main flex gap-2.5 items-start">
                    <Info className="h-4 w-4 text-brand-primary shrink-0 mt-0.5" />
                    <span>{pricingNotice}</span>
                  </div>
                )}

                {/* Pricing Cards */}
                <div className="flex flex-col gap-3">
                  {/* Weekly */}
                  <div className="flex items-center justify-between p-4 rounded-xl bg-background/50 border border-border-custom hover:border-border-custom/80 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                        <Zap className="h-4 w-4 text-amber-400" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-text-main">Weekly Fast Track</div>
                        <div className="text-xs text-text-secondary mt-0.5">Aktif selama 7 hari</div>
                      </div>
                    </div>
                    <div className="text-right shrink-0 ml-3">
                      <div className="text-base font-black text-amber-400">Rp 15.000</div>
                      <div className="text-xs text-text-secondary">/minggu</div>
                    </div>
                  </div>

                  {/* Monthly */}
                  <div className="flex items-center justify-between p-4 rounded-xl border border-brand-primary/30 relative overflow-hidden" style={{ background: "rgba(99,102,241,0.06)" }}>
                    <div className="absolute top-0 right-0 bg-brand-primary text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-bl-lg tracking-wider flex items-center gap-1">
                      <Star className="h-2.5 w-2.5" />
                    
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg border border-brand-primary/30 flex items-center justify-center shrink-0" style={{ background: "rgba(99,102,241,0.12)" }}>
                        <Crown className="h-4 w-4 text-brand-primary" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-text-main">Monthly Fast Track</div>
                        <div className="text-xs text-brand-primary font-semibold mt-0.5">Aktif selama 30 hari</div>
                      </div>
                    </div>
                    <div className="text-right shrink-0 ml-3">
                      <div className="text-base font-black text-amber-400">Rp 45.000</div>
                      <div className="text-xs text-text-secondary">/bulan</div>
                    </div>
                  </div>
                </div>

                {/* Benefits */}
                <div className="bg-background/40 border border-border-custom/50 rounded-xl p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-text-secondary mb-3">
                    Keunggulan Akses VIP
                  </p>
                  <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                    {[
                      "Bypass Antrean (Fast Track)",
                      "Priority Support 24/7",
                      "Input +1 Main Aktif",
                      "Custom ID Tag Tagging",
                    ].map((benefit) => (
                      <li key={benefit} className="flex items-center gap-2 text-sm text-text-secondary">
                        <Check className="h-4 w-4 text-brand-success shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="flex flex-col gap-3 border-t border-border-custom/40 pt-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-text-secondary text-center">
                    Hubungi Admin via WhatsApp
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {/* Admin 1 */}
                    <a
                      href="https://wa.me/628123456789?text=Halo%20Admin%201%20saya%20tertarik%20membeli%20akses%20VIP%20viporchive"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center gap-2 p-3.5 rounded-xl bg-emerald-600/10 hover:bg-emerald-600/20 border border-emerald-600/30 hover:border-emerald-500/60 transition-all group"
                    >
                      <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center shadow-md shadow-emerald-600/20  transition-transform">
                        <MessageCircle className="h-4.5 w-4.5 text-white" />
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-bold text-text-main">Admin 1</div>
                        <div className="text-xs text-emerald-400 font-semibold mt-0.5">Chat Sekarang</div>
                      </div>
                    </a>

                    {/* Admin 2 */}
                    <a
                      href="https://wa.me/628987654321?text=Halo%20Admin%202%20saya%20tertarik%20membeli%20akses%20VIP%20viporchive"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center gap-2 p-3.5 rounded-xl bg-emerald-600/10 hover:bg-emerald-600/20 border border-emerald-600/30 hover:border-emerald-500/60 transition-all group"
                    >
                      <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center shadow-md shadow-emerald-600/20 transition-transform">
                        <MessageCircle className="h-4.5 w-4.5 text-white" />
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-bold text-text-main">Admin 2</div>
                        <div className="text-xs text-emerald-400 font-semibold mt-0.5">Chat Sekarang</div>
                      </div>
                    </a>
                  </div>
                  
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Admin Demo credentials */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="rounded-2xl border border-dashed border-border-custom bg-surface/30 p-4"
        >
          <div className="flex items-center gap-2 text-sm font-bold text-text-main mb-2">
            <ShieldCheck className="h-4 w-4 text-amber-500 shrink-0" />
            <span>Kredensial Admin Demo</span>
          </div>
          <p className="text-sm text-text-secondary leading-relaxed mb-3">
            Gunakan akun berikut untuk menguji akses edit &amp; tambah player secara penuh.
          </p>
          <div className="flex items-center justify-between rounded-lg bg-background/60 border border-border-custom/60 px-4 py-2.5">
            <div className="font-mono text-sm text-text-secondary">
              User: <span className="text-text-main font-bold">admin</span>
              {" | "}
              Pass: <span className="text-text-main font-bold">admin123</span>
            </div>
            <button
              onClick={autofillAdmin}
              className="text-sm text-brand-primary hover:text-brand-primary/80 font-semibold cursor-pointer ml-3"
            >
              Autofill
            </button>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
