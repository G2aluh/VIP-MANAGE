"use client";

import React from "react";
import { Users, Crown, Zap } from "lucide-react";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-40 w-full border-b border-border-custom bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary shadow-sm border border-brand-primary/20">
              <Crown className="h-5 w-5 animate-pulse" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-text-main flex items-center gap-1.5">
                VIP MABAR <span className="text-brand-primary text-xs px-2 py-0.5 rounded-full bg-brand-primary/10 border border-brand-primary/20">QUEUE</span>
              </h1>
              <p className="text-2xs text-text-secondary leading-none">Fast Track & Play Manager</p>
            </div>
          </div>

          {/* Badge Indicators */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-border-custom bg-surface px-3 py-1 text-xs text-text-secondary">
              <span className="h-2 w-2 rounded-full bg-brand-success animate-ping"></span>
              <span className="font-medium text-text-main">Local Storage Database</span>
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-border-custom text-text-main hover:bg-border-custom/80 cursor-pointer">
              <Zap className="h-4 w-4 text-brand-primary" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
