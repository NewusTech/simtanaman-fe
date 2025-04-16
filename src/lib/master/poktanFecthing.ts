import { ApiResponse } from "@/types/master/poktan";

// Fungsi untuk mengambil data dari API
export const fetchPoktanData = async (page: number, token: string): Promise<ApiResponse['data']> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}master/poktan?page=${page}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await res.json();
    return data.data;
};