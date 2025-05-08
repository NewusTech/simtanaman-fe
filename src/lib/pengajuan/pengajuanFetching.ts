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

// Fungsi untuk menambahkan data ke API
export const addPengajuanData = async (payload: Object, token: string): Promise<Response> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}submissions/tanaman`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });
    const data = await res;
    return data;
}