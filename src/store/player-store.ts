import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Player } from "@/types/player";

export type SortOption = "newest" | "name-asc" | "name-desc" | "most-plays";

interface PlayerState {
  players: Player[];
  searchQuery: string;
  activeTab: "normal" | "fast";
  sortBy: SortOption;
  
  // Actions
  addPlayer: (playerName: string, playerId: string, totalPlay: number, queue: "normal" | "fast") => void;
  updatePlayer: (id: string, updates: Partial<Omit<Player, "id" | "createdAt" | "updatedAt">>) => void;
  deletePlayer: (id: string) => void;
  incrementPlayCount: (id: string) => void;
  setSearchQuery: (query: string) => void;
  setActiveTab: (tab: "normal" | "fast") => void;
  setSortBy: (sortBy: SortOption) => void;
}

export const usePlayerStore = create<PlayerState>()(
  persist(
    (set) => ({
      players: [],
      searchQuery: "",
      activeTab: "normal",
      sortBy: "newest",

      addPlayer: (playerName, playerId, totalPlay, queue) =>
        set((state) => {
          const now = new Date().toISOString();
          const newPlayer: Player = {
            id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 9),
            playerName,
            playerId,
            totalPlay,
            queue,
            createdAt: now,
            updatedAt: now,
          };
          return {
            players: [newPlayer, ...state.players],
          };
        }),

      updatePlayer: (id, updates) =>
        set((state) => ({
          players: state.players.map((p) =>
            p.id === id
              ? { ...p, ...updates, updatedAt: new Date().toISOString() }
              : p
          ),
        })),

      deletePlayer: (id) =>
        set((state) => ({
          players: state.players.filter((p) => p.id !== id),
        })),

      incrementPlayCount: (id) =>
        set((state) => ({
          players: state.players.map((p) =>
            p.id === id
              ? { ...p, totalPlay: p.totalPlay + 1, updatedAt: new Date().toISOString() }
              : p
          ),
        })),

      setSearchQuery: (searchQuery) => set({ searchQuery }),
      setActiveTab: (activeTab) => set({ activeTab }),
      setSortBy: (sortBy) => set({ sortBy }),
    }),
    {
      name: "vip-mabar-queue-storage",
    }
  )
);
export default usePlayerStore;
