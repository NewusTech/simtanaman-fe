import { ApiResponse } from "@/types/planting/submissionPlant";


// Fungsi untuk mengambil data dari API
export const fetchSubmissionPlantData = async (page: number, token: string): Promise<ApiResponse['data']> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}submissions/stok-tanaman?page=${page}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await res.json();
    return data.data;
};