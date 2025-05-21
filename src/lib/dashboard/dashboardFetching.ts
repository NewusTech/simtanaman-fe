import { ApiResponseAdminDashboard } from "@/types/dashboard/adminDashboard";
import { ApiResponseDistributorDashboard } from "@/types/dashboard/distributorDashboard";

export const fetchDistributorDashboard = async (token: string): Promise<ApiResponseDistributorDashboard['data']> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}dashboard/distributor`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await res.json();
    return data.data;
};

export const fetchAdminDashboard = async (token: string): Promise<ApiResponseAdminDashboard['data']> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}dashboard/distributor`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await res.json();
    return data.data;
};