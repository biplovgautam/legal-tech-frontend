import { create } from "zustand";
import { User } from "@/types/user";

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  initialized: boolean;

  fetchMe: () => Promise<void>;
  init: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  loading: false,
  error: null,
  initialized: false,

  fetchMe: async () => {
    if (get().loading || get().user) return;

    set({ loading: true, error: null });

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/me`,
        {
          credentials: "include",
        }
      );

      if (!res.ok) {
        throw new Error("Unauthorized");
      }

      const data: User = await res.json();

      set({
        user: data,
        loading: false,
      });
    } catch (err) {
      set({
        user: null,
        loading: false,
        error: err instanceof Error ? err.message : "Failed to load user",
      });
    }
  },

  init: () => {
    if (get().initialized) return;

    set({ initialized: true });
    void get().fetchMe();
  },

  logout: () => {
    set({ user: null, initialized: false });
  },
}));
