import { create } from "zustand";

type PermissionState = {
  role: string | null;
  setRole: (role: string) => void;
  clearRole: () => void;
};

export const usePermission = create<PermissionState>((set) => ({
  role: null,
  setRole: (role) => set({ role }),
  clearRole: () => set({ role: null }),
}));