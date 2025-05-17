import { ApiResponse } from "@/types/planting/seed-stock";

// Fungsi untuk mengambil data dari API
export const fetchSeedStockData = async (page: number, token: string): Promise<ApiResponse['data']> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}stok/tanaman?page=${page}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await res.json();
    return data.data;
};

// Fungsi untuk Post data ke API
export const postSeedStockData = async (formData: any, token: string): Promise<Response> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}stok/tanaman`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
    });
    const data = await res;
    return data;
};

// Fungsi untuk mengambil data dari API
export const fetchSeedStockDataAdditionById = async (page: number, id:number, token: string): Promise<ApiResponse['data']> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}stok/tanaman/addition/${id}?page=${page}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await res.json();
    return data.data;
};

export const fetchSeedStockDataReleaseById = async (page: number, id:number, token: string): Promise<ApiResponse['data']> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}stok/tanaman/releases/${id}?page=${page}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await res.json();
    return data.data;
};