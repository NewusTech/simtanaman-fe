import { ApiResponse } from "@/types/master/metodePenanaman";

// Fungsi untuk mengambil data dari API
export const fetchMetodePenanamanData = async (page: number, token: string): Promise<ApiResponse['data']> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}master/method-pupuk?page=${page}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await res.json();
    return data.data;
};