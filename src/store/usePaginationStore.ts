import create from 'zustand';

interface PaginationStore {
    currentPage: number;
    totalPages: number;
    items: { id: number; name: string }[];
    loading: boolean;
    setPage: (page: number) => void;
    setItems: (items: { id: number; name: string }[]) => void;
    setLoading: (loading: boolean) => void;
    setTotalPages: (totalPages: number) => void;
}

export const usePaginationStore = create<PaginationStore>((set) => ({
    currentPage: 1,
    totalPages: 1,
    items: [],
    loading: false,
    setPage: (page: number) => set(() => ({ currentPage: page })),
    setItems: (items: { id: number; name: string }[]) => set(() => ({ items })),
    setLoading: (loading: boolean) => set(() => ({ loading })),
    setTotalPages: (totalPages: number) => set(() => ({ totalPages })),
}));