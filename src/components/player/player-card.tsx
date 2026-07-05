"use client";

import React, { useState } from "react";
import { Player } from "@/types/player";
import { usePlayerStore } from "@/store/player-store";
import { Edit2, Trash2, Plus, Zap, UserCheck, Calendar } from "lucide-react";
import { formatDateTime } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface PlayerCardProps {
  player: Player;
  onEdit: (player: Player) => void;
  onDelete: (player: Player) => void;
}

export function PlayerCard({ player, onEdit, onDelete }: PlayerCardProps) {
  const incrementPlayCount = usePlayerStore((state) => state.incrementPlayCount);
  const [plusOnes, setPlusOnes] = useState<{ id: number }[]>([]);

  const handleIncrement = () => {
    incrementPlayCount(player.id);
    const newId = Date.now();
    setPlusOnes((prev) => [...prev, { id: newId }]);
    setTimeout(() => {
      setPlusOnes((prev) => prev.filter((item) => item.id !== newId));
    }, 1000);
  };

  const isFastTrack = player.queue === "fast";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={`relative flex flex-col justify-between overflow-hidden rounded-2xl border bg-surface p-5 transition-shadow hover:shadow-lg hover:shadow-black/20 ${
        isFastTrack
          ? "border-brand-primary/40 glow-primary"
          : "border-border-custom"
      }`}
    >
      {/* Decorative accent for Fast Track */}
      {isFastTrack && (
        <div className="absolute top-0 right-0 h-1.5 w-16 rounded-bl-lg bg-brand-primary" />
      )}

      {/* Main Info */}
      <div className="space-y-4">
        {/* Name and Queue Badge */}
        <div className="flex items-start justify-between">
          <div>
            <h4 className="text-base font-bold text-text-main tracking-tight leading-tight line-clamp-1">
              {player.playerName}
            </h4>
            <p className="text-xs font-mono text-text-secondary mt-0.5">
              ID: {player.playerId}
            </p>
          </div>
          <span
            className={`flex items-center gap-1 rounded-full px-2.5 py-0.5 text-2xs font-semibold uppercase tracking-wider border ${
              isFastTrack
                ? "bg-brand-primary/10 text-brand-primary border-brand-primary/20"
                : "bg-border-custom/40 text-text-secondary border-border-custom"
            }`}
          >
            {isFastTrack ? (
              <>
                <Zap className="h-3 w-3" /> Fast Track
              </>
            ) : (
              <>
                <UserCheck className="h-3 w-3" /> Reguler
              </>
            )}
          </span>
        </div>

        {/* Counter Display & Incrementor */}
        <div className="flex items-center justify-between rounded-xl bg-background/50 border border-border-custom/50 p-3 relative">
          <div>
            <p className="text-2xs text-text-secondary uppercase tracking-wider">Total Main</p>
            <div className="relative flex items-baseline">
              <span className="text-2xl font-black text-text-main font-mono">
                {player.totalPlay}
              </span>
              <span className="text-xs font-semibold text-text-secondary ml-0.5">x</span>

              {/* Floating +1 Animations */}
              <AnimatePresence>
                {plusOnes.map((p) => (
                  <motion.span
                    key={p.id}
                    initial={{ opacity: 1, y: 0, scale: 0.8 }}
                    animate={{ opacity: 0, y: -25, scale: 1.2 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="absolute -top-3 left-6 text-sm font-extrabold text-brand-success select-none pointer-events-none"
                  >
                    +1 Main
                  </motion.span>
                ))}
              </AnimatePresence>
            </div>
          </div>

          <button
            onClick={handleIncrement}
            className="flex items-center gap-1.5 rounded-lg bg-brand-success/10 hover:bg-brand-success text-brand-success hover:text-white px-3.5 py-2 text-xs font-bold transition-all border border-brand-success/20 hover:border-brand-success shadow-xs cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" /> Main
          </button>
        </div>
      </div>

      {/* Footer and edit/delete actions */}
      <div className="mt-5 flex items-center justify-between border-t border-border-custom/50 pt-4">
        <div className="flex items-center gap-1 text-2xs text-text-secondary font-light">
          <Calendar className="h-3 w-3" />
          <span>Update: {formatDateTime(player.updatedAt)}</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Edit Button */}
          <button
            onClick={() => onEdit(player)}
            title="Edit Player"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border-custom bg-background text-text-secondary hover:text-brand-primary hover:border-brand-primary/40 transition-colors cursor-pointer"
          >
            <Edit2 className="h-3.5 w-3.5" />
          </button>

          {/* Delete Button */}
          <button
            onClick={() => onDelete(player)}
            title="Hapus Player"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border-custom bg-background text-text-secondary hover:text-brand-danger hover:border-brand-danger/40 transition-colors cursor-pointer"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default PlayerCard;
