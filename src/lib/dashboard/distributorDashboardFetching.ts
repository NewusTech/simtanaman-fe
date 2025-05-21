import { ApiResponse } from "@/types/dashboard/distributorDashboard";

export const fetchDistributorDashboard = async (token: string): Promise<ApiResponse['data']> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}dashboard/distributor`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await res.json();
    return data.data;
};