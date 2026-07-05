"use client";

import React from "react";
import { usePlayerStore } from "@/store/player-store";
import { PlayerCard } from "./player-card";
import { EmptyState } from "../empty-state";
import { Player } from "@/types/player";
import { motion, AnimatePresence } from "framer-motion";

interface PlayerListProps {
  onEditPlayer: (player: Player) => void;
  onDeletePlayer: (player: Player) => void;
  onAddPlayer: () => void;
}

export function PlayerList({ onEditPlayer, onDeletePlayer, onAddPlayer }: PlayerListProps) {
  const players = usePlayerStore((state) => state.players);
  const activeTab = usePlayerStore((state) => state.activeTab);
  const searchQuery = usePlayerStore((state) => state.searchQuery);
  const sortBy = usePlayerStore((state) => state.sortBy);

  // Filter & Sort Players
  const filteredAndSortedPlayers = React.useMemo(() => {
    return [...players]
      .filter((p) => {
        // Tab Filter
        if (p.queue !== activeTab) return false;

        // Search Filter
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return (
          p.playerName.toLowerCase().includes(q) ||
          p.playerId.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "name-asc":
            return a.playerName.localeCompare(b.playerName, "id");
          case "name-desc":
            return b.playerName.localeCompare(a.playerName, "id");
          case "most-plays":
            return b.totalPlay - a.totalPlay;
          case "newest":
          default:
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
      });
  }, [players, activeTab, searchQuery, sortBy]);

  const hasSearch = searchQuery.trim().length > 0;

  if (filteredAndSortedPlayers.length === 0) {
    return (
      <EmptyState
        onAddPlayer={onAddPlayer}
        isSearchActive={hasSearch}
      />
    );
  }

  return (
    <motion.div
      layout
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-4"
    >
      <AnimatePresence mode="popLayout">
        {filteredAndSortedPlayers.map((player) => (
          <PlayerCard
            key={player.id}
            player={player}
            onEdit={onEditPlayer}
            onDelete={onDeletePlayer}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

export default PlayerList;
