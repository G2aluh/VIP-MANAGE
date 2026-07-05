export interface Player {
  id: string;
  playerName: string;
  playerId: string;
  totalPlay: number;
  queue: "normal" | "fast";
  createdAt: string;
  updatedAt: string;
}
