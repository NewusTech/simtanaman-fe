import { ApiResponse } from "@/types/log-aktifitas/logAktifitas";

// Fungsi untuk mengambil data dari API
export const fetchLogAktifitasData = async (page: number, token: string, startDate:string, endDate:string): Promise<ApiResponse['data']> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}log/activity?page=${page}&startDate=${startDate}&endDate=${endDate}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await res.json();
    return data.data;
};