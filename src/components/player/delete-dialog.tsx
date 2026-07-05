"use client";

import React from "react";
import { AlertTriangle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface DeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  playerName: string;
}

export function DeleteDialog({ isOpen, onClose, onConfirm, playerName }: DeleteDialogProps) {
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
            transition={{ type: "spring", duration: 0.3 }}
            className="relative z-10 w-full max-w-sm overflow-hidden rounded-2xl border border-border-custom bg-surface p-6 shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 rounded-lg p-1 text-text-secondary hover:bg-border-custom hover:text-text-main transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Alert Icon & Info */}
            <div className="flex flex-col items-center text-center mt-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-danger/10 text-brand-danger border border-brand-danger/20 mb-4">
                <AlertTriangle className="h-6 w-6 animate-bounce" />
              </div>
              <h3 className="text-lg font-bold text-text-main">Hapus Player?</h3>
              <p className="mt-2 text-sm text-text-secondary">
                Apakah Anda yakin ingin menghapus player <span className="text-text-main font-semibold">"{playerName}"</span>? Data tidak bisa dikembalikan.
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={onClose}
                className="flex-1 rounded-xl border border-border-custom py-2.5 text-xs font-semibold text-text-secondary hover:bg-background hover:text-text-main transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className="flex-1 rounded-xl bg-brand-danger py-2.5 text-xs font-semibold text-white hover:bg-brand-danger/90 transition-colors shadow-md shadow-brand-danger/10 cursor-pointer"
              >
                Hapus
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default DeleteDialog;
