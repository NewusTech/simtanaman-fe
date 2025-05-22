import { ApiResponse } from "@/types/report/laporanPengajuanTanaman";

export const fetchLaporanPengajuanTanamanData = async (
    page: number,
    filter: { startDate?: string; endDate?: string; tanamanId?: string },
    token: string
): Promise<ApiResponse['data']> => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}report/submission/stok-tanaman?page=${page}&startDate=${filter.startDate}&endDate=${filter.endDate}&tanamanId=${filter.tanamanId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    const data = await res.json();
    return data.data;
};