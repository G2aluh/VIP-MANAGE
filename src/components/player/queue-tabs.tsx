"use client";

import React from "react";
import { motion } from "framer-motion";
import { usePlayerStore } from "@/store/player-store";
import { UserCheck, Zap } from "lucide-react";

export function QueueTabs() {
  const activeTab = usePlayerStore((state) => state.activeTab);
  const setActiveTab = usePlayerStore((state) => state.setActiveTab);
  const players = usePlayerStore((state) => state.players);

  const normalCount = players.filter((p) => p.queue === "normal").length;
  const fastCount = players.filter((p) => p.queue === "fast").length;

  const tabs = [
    {
      id: "normal" as const,
      label: "Antrian Biasa",
      count: normalCount,
      icon: UserCheck,
    },
    {
      id: "fast" as const,
      label: "Fast Track",
      count: fastCount,
      icon: Zap,
    },
  ];

  return (
    <div className="flex border-b border-border-custom w-full">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="relative flex flex-1 items-center justify-center gap-2 py-4 text-sm font-medium transition-colors focus:outline-hidden cursor-pointer"
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            {/* Tab Label & Icon */}
            <span className="flex items-center gap-2 z-10">
              <tab.icon className={`h-4 w-4 ${isActive ? "text-brand-primary" : "text-text-secondary"}`} />
              <span className={isActive ? "text-text-main font-semibold" : "text-text-secondary"}>
                {tab.label}
              </span>
              <span
                className={`ml-1 rounded-full px-2 py-0.5 text-2xs font-bold ${
                  isActive
                    ? "bg-brand-primary/10 text-brand-primary border border-brand-primary/20"
                    : "bg-surface text-text-secondary border border-border-custom"
                }`}
              >
                {tab.count}
              </span>
            </span>

            {/* Active Border Indicator */}
            {isActive && (
              <motion.div
                layoutId="active-queue-tab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary shadow-sm"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

export default QueueTabs;
