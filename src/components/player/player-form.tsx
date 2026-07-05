"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Player } from "@/types/player";
import { usePlayerStore } from "@/store/player-store";
import { X, User, Hash, PlaySquare, Zap, UserCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const playerSchema = z.object({
  playerName: z.string().min(2, { message: "Nama minimal 2 karakter" }),
  playerId: z.string().min(3, { message: "ID player minimal 3 karakter" }),
  totalPlay: z.number({ message: "Harus berupa angka" }).min(0, { message: "Minimal 0" }),
  queue: z.enum(["normal", "fast"]),
});

type PlayerFormValues = z.infer<typeof playerSchema>;

interface PlayerFormProps {
  isOpen: boolean;
  onClose: () => void;
  playerToEdit?: Player | null;
}

export function PlayerForm({ isOpen, onClose, playerToEdit }: PlayerFormProps) {
  const addPlayer = usePlayerStore((state) => state.addPlayer);
  const updatePlayer = usePlayerStore((state) => state.updatePlayer);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<PlayerFormValues>({
    resolver: zodResolver(playerSchema),
    defaultValues: {
      playerName: "",
      playerId: "",
      totalPlay: 0,
      queue: "normal",
    },
  });

  const selectedQueue = watch("queue");

  // Reset or fill form when modal opens/changes
  useEffect(() => {
    if (isOpen) {
      if (playerToEdit) {
        reset({
          playerName: playerToEdit.playerName,
          playerId: playerToEdit.playerId,
          totalPlay: playerToEdit.totalPlay,
          queue: playerToEdit.queue,
        });
      } else {
        reset({
          playerName: "",
          playerId: "",
          totalPlay: 0,
          queue: "normal",
        });
      }
    }
  }, [isOpen, playerToEdit, reset]);

  const onSubmit = (data: PlayerFormValues) => {
    if (playerToEdit) {
      updatePlayer(playerToEdit.id, data);
    } else {
      addPlayer(data.playerName, data.playerId, data.totalPlay, data.queue);
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-border-custom bg-surface p-6 shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border-custom/50 pb-4">
              <h3 className="text-lg font-bold text-text-main">
                {playerToEdit ? "Edit Player" : "Tambah Player"}
              </h3>
              <button
                onClick={onClose}
                className="rounded-lg p-1.5 text-text-secondary hover:bg-border-custom hover:text-text-main transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
              {/* Nama Player */}
              <div>
                <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1.5">
                  Nama Player
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <User className="h-4 w-4 text-text-secondary" />
                  </span>
                  <input
                    type="text"
                    {...register("playerName")}
                    placeholder="Shinra"
                    className="block w-full rounded-xl border border-border-custom bg-background py-2.5 pl-10 pr-4 text-sm text-text-main placeholder-text-secondary focus:border-brand-primary focus:outline-hidden focus:ring-1 focus:ring-brand-primary/30 transition-all"
                  />
                </div>
                {errors.playerName && (
                  <p className="mt-1 text-xs text-brand-danger font-medium">{errors.playerName.message}</p>
                )}
              </div>

              {/* ID Player */}
              <div>
                <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1.5">
                  ID Player
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Hash className="h-4 w-4 text-text-secondary" />
                  </span>
                  <input
                    type="text"
                    {...register("playerId")}
                    placeholder="834728391"
                    className="block w-full rounded-xl border border-border-custom bg-background py-2.5 pl-10 pr-4 text-sm text-text-main placeholder-text-secondary focus:border-brand-primary focus:outline-hidden focus:ring-1 focus:ring-brand-primary/30 transition-all"
                  />
                </div>
                {errors.playerId && (
                  <p className="mt-1 text-xs text-brand-danger font-medium">{errors.playerId.message}</p>
                )}
              </div>

              {/* Jumlah Main */}
              <div>
                <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1.5">
                  Jumlah Main
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <PlaySquare className="h-4 w-4 text-text-secondary" />
                  </span>
                  <input
                    type="number"
                    {...register("totalPlay", { valueAsNumber: true })}
                    placeholder="0"
                    className="block w-full rounded-xl border border-border-custom bg-background py-2.5 pl-10 pr-4 text-sm text-text-main placeholder-text-secondary focus:border-brand-primary focus:outline-hidden focus:ring-1 focus:ring-brand-primary/30 transition-all"
                  />
                </div>
                {errors.totalPlay && (
                  <p className="mt-1 text-xs text-brand-danger font-medium">{errors.totalPlay.message}</p>
                )}
              </div>

              {/* Queue Option */}
              <div>
                <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">
                  Queue Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {/* Antrian Biasa */}
                  <label
                    className={`flex items-center justify-center gap-2 rounded-xl border p-3 text-xs font-semibold cursor-pointer transition-all ${
                      selectedQueue === "normal"
                        ? "border-text-secondary/50 bg-border-custom/30 text-text-main"
                        : "border-border-custom bg-background text-text-secondary hover:border-border-custom/80"
                    }`}
                  >
                    <input
                      type="radio"
                      value="normal"
                      {...register("queue")}
                      className="sr-only"
                    />
                    <UserCheck className="h-4 w-4" />
                    <span>Antrian Biasa</span>
                  </label>

                  {/* Fast Track */}
                  <label
                    className={`flex items-center justify-center gap-2 rounded-xl border p-3 text-xs font-semibold cursor-pointer transition-all ${
                      selectedQueue === "fast"
                        ? "border-brand-primary/60 bg-brand-primary/10 text-brand-primary glow-primary"
                        : "border-border-custom bg-background text-text-secondary hover:border-border-custom/80"
                    }`}
                  >
                    <input
                      type="radio"
                      value="fast"
                      {...register("queue")}
                      className="sr-only"
                    />
                    <Zap className="h-4 w-4" />
                    <span>Fast Track</span>
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 border-t border-border-custom/50 pt-4 mt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 rounded-xl border border-border-custom py-2.5 text-sm font-semibold text-text-secondary hover:bg-background hover:text-text-main transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-brand-primary py-2.5 text-sm font-semibold text-white hover:bg-brand-primary/95 transition-colors shadow-md shadow-brand-primary/10 cursor-pointer"
                >
                  {playerToEdit ? "Simpan" : "Tambah Player"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default PlayerForm;
