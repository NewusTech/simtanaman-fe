import { ApiResponse, ApiResponseById } from "@/types/distribution/distribution";

// Fungsi untuk mengambil data dari API
export const fetchDistributionData = async (page: number, token: string): Promise<ApiResponse['data']> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}distributions/tanaman?page=${page}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await res.json();
    return data.data;
};

export const fetchDistributionDataById = async (id: number, token: string): Promise<ApiResponseById['data']> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}distributions/tanaman/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await res.json();
    return data.data;
};

// Fungsi untuk mengirim data ke API
export const postDistributionData = async (payload: object, token: string): Promise<Response> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}distributions/tanaman`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
    });
    const data = await res;
    return data;
};

// Fungsi untuk mengupdate data ke API
export const putDistributionData = async (id: number, payload: object, token: string): Promise<Response> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}distributions/tanaman/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
    });
    const data = await res;
    return data;
};

// Fungsi untuk menghapus data dari API
export const deleteDistributionData = async (id: number, token: string): Promise<Response> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}distributions/tanaman/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await res;
    return data;
};
// Fungsi untuk mencari data poktan berdasarkan nama
export const searchDistributionData = async (search: string, token: string): Promise<ApiResponse['data']> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}distributions/tanaman?search=${search}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await res.json();
    return data.data;
}