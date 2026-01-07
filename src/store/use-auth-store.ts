import { create } from "zustand";
import { User } from "@/types/user";
import api from "@/lib/axios";

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  initialized: boolean;

  fetchMe: () => Promise<void>;
  init: () => void;
  logout: () => void;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  loading: false,
  error: null,
  initialized: false,

  setUser: (user: User) => set({ user, initialized: true, loading: false }),

  fetchMe: async () => {
    // If already loading, or we have a user, typically we skip.
    // However, for robustness, if we are calling fetchMe explicitly, we usually want to verify.
    // But to prevent double-fetching on mount, we can keep the user check, 
    // UNLESS we define a 'refetch' argument. For now, let's keep it simple.
    if (get().loading) return;

    set({ loading: true, error: null });

    try {
      const res = await api.get<User>("/users/me");
      
      set({
        user: res.data,
        loading: false,
        initialized: true, // Ensure initialized is true on success
      });
    } catch (err: any) {
      set({
        user: null,
        loading: false,
        initialized: true, // Ensure initialized is true even on failure (meaning we tried)
        error: err.response?.data?.detail || "Failed to load user",
      });
    }
  },

  init: () => {
    // Determine if we need to fetch. 
    // If we are not initialized, definitely fetch.
    if (!get().initialized) {
      void get().fetchMe();
    }
  },

  logout: () => {
    set({ user: null, initialized: false, error: null });
  },
}));
