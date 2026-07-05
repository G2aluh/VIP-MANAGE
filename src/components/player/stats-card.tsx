"use client";

import React from "react";
import { Users, UserCheck, Zap, Play } from "lucide-react";
import { motion } from "framer-motion";
import { usePlayerStore } from "@/store/player-store";

export function StatsCards() {
  const players = usePlayerStore((state) => state.players);

  const totalPlayers = players.length;
  const normalQueueCount = players.filter((p) => p.queue === "normal").length;
  const fastTrackCount = players.filter((p) => p.queue === "fast").length;
  const totalPlays = players.reduce((sum, p) => sum + p.totalPlay, 0);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } },
  };

  const stats = [
    {
      title: "Total Player",
      value: totalPlayers,
      icon: Users,
      color: "text-brand-primary bg-brand-primary/10 border-brand-primary/20",
      description: "Semua pemain terdaftar",
    },
    {
      title: "Antrian Biasa",
      value: normalQueueCount,
      icon: UserCheck,
      color: "text-text-secondary bg-border-custom/50 border-border-custom",
      description: "Pemain antrian reguler",
    },
    {
      title: "Fast Track",
      value: fastTrackCount,
      icon: Zap,
      color: "text-brand-primary bg-brand-primary/15 border-brand-primary/30 glow-primary",
      description: "Antrian prioritas cepat",
    },
    {
      title: "Total Main",
      value: totalPlays,
      icon: Play,
      color: "text-brand-success bg-brand-success/10 border-brand-success/20 glow-success",
      description: "Akumulasi jumlah game",
    },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="relative overflow-hidden rounded-2xl border border-border-custom bg-surface p-5 transition-shadow hover:shadow-lg hover:shadow-black/20"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-text-secondary uppercase tracking-wider">
                {stat.title}
              </p>
              <h4 className="mt-2 text-3xl font-bold tracking-tight text-text-main">
                {stat.value}
              </h4>
            </div>
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl border ${stat.color}`}>
              <stat.icon className="h-6 w-6" />
            </div>
          </div>
          <p className="mt-3 text-2xs text-text-secondary font-light">
            {stat.description}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default StatsCards;
