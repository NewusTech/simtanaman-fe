import { ApiResponse } from "@/types/management-user/pengguna";

// Fungsi untuk mengambil data dari API
export const fetchPenggunaData = async (page: number, token: string, role: string): Promise<ApiResponse['data']> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}user?role=${role}&page=${page}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await res.json();
    return data.data;
};