"use client";

import React from "react";
import { UserPlus, SearchX } from "lucide-react";

interface EmptyStateProps {
  onAddPlayer: () => void;
  isSearchActive: boolean;
}

export function EmptyState({ onAddPlayer, isSearchActive }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border-custom bg-surface/50 p-12 text-center my-6">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-border-custom/40 border border-border-custom text-text-secondary mb-5">
        {isSearchActive ? (
          <SearchX className="h-7 w-7 text-text-secondary" />
        ) : (
          <UserPlus className="h-7 w-7 text-brand-primary" />
        )}
      </div>

      <h3 className="text-lg font-bold text-text-main">
        {isSearchActive ? "Player tidak ditemukan" : "Belum ada player"}
      </h3>
      <p className="mt-2 text-sm text-text-secondary max-w-xs mx-auto">
        {isSearchActive
          ? "Cobalah mencari dengan kata kunci nama atau ID player yang lain."
          : "Tekan tombol Tambah Player untuk memulai mencatat antrian mabar VIP."}
      </p>

      {!isSearchActive && (
        <button
          onClick={onAddPlayer}
          className="mt-6 rounded-xl bg-brand-primary/10 hover:bg-brand-primary text-brand-primary hover:text-white px-5 py-2.5 text-sm font-semibold transition-all border border-brand-primary/20 hover:border-brand-primary shadow-xs cursor-pointer"
        >
          Tambah Player
        </button>
      )}
    </div>
  );
}

export default EmptyState;
