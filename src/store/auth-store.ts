import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  username: string;
  role: "admin" | "guest";
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  loginAsGuest: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: async (username, password) => {
        // Mock authentication check
        // For development/demo convenience, admin credential is username: admin, password: admin123
        if (username.toLowerCase() === "admin" && password === "admin123") {
          const user: User = { username: "Admin VIP", role: "admin" };
          set({ user, isAuthenticated: true });
          return { success: true };
        }
        
        return { 
          success: false, 
          error: "Username atau password salah! Hubungi admin untuk mendapatkan akses." 
        };
      },

      loginAsGuest: () => {
        const user: User = { username: "Tamu VIP", role: "guest" };
        set({ user, isAuthenticated: true });
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: "viporchive-auth-storage",
    }
  )
);

export default useAuthStore;
