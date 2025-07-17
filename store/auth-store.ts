import { create } from "zustand";

export type UserType = {
  _id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
};

type AuthState = {
  user: UserType | null;
  loading: boolean;
  setUser: (user: UserType | null) => void;
  setLoading: (loading: boolean) => void;
  clearUser: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
  clearUser: () => set({ user: null }),
}));
