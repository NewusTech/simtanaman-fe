import { ApiResponse } from "@/types/pengajuan/pengajuan";

// Fungsi untuk mengambil data dari API
export const fetchPengajuanData = async (page: number, token: string): Promise<ApiResponse['data']> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}submissions/tanaman?page=${page}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await res.json();
    return data.data;
};