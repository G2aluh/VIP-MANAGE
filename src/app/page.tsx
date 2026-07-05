"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/navbar";
import { StatsCards } from "@/components/player/stats-card";
import { SearchBar } from "@/components/player/search-bar";
import { QueueTabs } from "@/components/player/queue-tabs";
import { PlayerList } from "@/components/player/player-list";
import { PlayerForm } from "@/components/player/player-form";
import { DeleteDialog } from "@/components/player/delete-dialog";
import { Player } from "@/types/player";
import { usePlayerStore } from "@/store/player-store";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  
  // Modals state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [playerToEdit, setPlayerToEdit] = useState<Player | null>(null);
  
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [playerToDelete, setPlayerToDelete] = useState<Player | null>(null);

  const deletePlayer = usePlayerStore((state) => state.deletePlayer);

  // Prevent Next.js hydration issues (Zustand persist reads local storage on mount)
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleEditPlayer = (player: Player) => {
    setPlayerToEdit(player);
    setIsFormOpen(true);
  };

  const handleDeletePlayer = (player: Player) => {
    setPlayerToDelete(player);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    if (playerToDelete) {
      deletePlayer(playerToDelete.id);
      setPlayerToDelete(null);
    }
  };

  const handleAddPlayerClick = () => {
    setPlayerToEdit(null);
    setIsFormOpen(true);
  };

  if (!mounted) {
    // Premium Dashboard skeleton loader
    return (
      <div className="min-h-screen bg-background text-text-main flex flex-col">
        <Navbar />
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-8">
          {/* Stats skeleton */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-28 rounded-2xl border border-border-custom bg-surface animate-pulse" />
            ))}
          </div>

          {/* Search bar & Tabs skeleton */}
          <div className="space-y-4">
            <div className="h-10 rounded-xl bg-surface animate-pulse w-full max-w-lg" />
            <div className="h-12 border-b border-border-custom flex gap-8">
              <div className="h-full w-32 bg-surface/60 animate-pulse" />
              <div className="h-full w-32 bg-surface/60 animate-pulse" />
            </div>
          </div>

          {/* Grid skeleton */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-44 rounded-2xl border border-border-custom bg-surface animate-pulse" />
            ))}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-text-main flex flex-col relative pb-20 sm:pb-8">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Content Dashboard */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-8">
        {/* Statistics Cards */}
        <section aria-label="Statistik Antrian">
          <StatsCards />
        </section>

        {/* Filter and Search controls */}
        <section aria-label="Kontrol Pencarian dan Urutan" className="space-y-4">
          <SearchBar />
          <QueueTabs />
        </section>

        {/* Player Queue List */}
        <section aria-label="Daftar Antrian Player">
          <PlayerList
            onEditPlayer={handleEditPlayer}
            onDeletePlayer={handleDeletePlayer}
            onAddPlayer={handleAddPlayerClick}
          />
        </section>
      </main>

      {/* Floating Action Button (Add Player) */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleAddPlayerClick}
        title="Tambah Player"
        className="fixed bottom-6 right-6 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-brand-primary text-white shadow-xl hover:bg-brand-primary/95 transition-all glow-primary border border-brand-primary/20 cursor-pointer"
      >
        <Plus className="h-7 w-7" />
      </motion.button>

      {/* Add / Edit Player Modal */}
      <PlayerForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        playerToEdit={playerToEdit}
      />

      {/* Delete Player Dialog */}
      <DeleteDialog
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        playerName={playerToDelete?.playerName || ""}
      />
    </div>
  );
}
