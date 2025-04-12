import { create } from 'zustand';

// Tipe data untuk Role
interface Role {
  id: number;
  name: string;
}

// Tipe data untuk User
interface User {
  id: number;
  email: string;
  name: string;
  roleId: number;
  role: Role;
  createdAt: string;
  updatedAt: string;
  profileId: string | null;
  token: string;
}

// Tipe data untuk Zustand Store
interface UserStore {
  role: Role | null;
  setRole: (user: Role) => void;
  clearRole: () => void;
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

const useUserStore = create<UserStore>((set) => ({
  user: null,
  role: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
  setRole: (role) => set({ role }),
  clearRole: () => set({ role: null })
}));

export default useUserStore;