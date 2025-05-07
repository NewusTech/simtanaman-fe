import { ApiResponse, ApiResponseById } from "@/types/management-user/pengguna";

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

// Fungsi untuk menambah data pengguna
export const addPenggunaData = async (payload: Object, token: string): Promise<Response> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}user`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });
    const data = await res;
    return data;
};

// Fungsi untuk mengambil data pengguna berdasarkan id
export const fetchPenggunaById = async (id: number, token: string): Promise<ApiResponseById['data']> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}user/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await res.json();
    return data.data;
};

// Fungsi untuk mengupdate data pengguna
export const updatePenggunaData = async (id: number, payload: Object, token: string): Promise<Response> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}user/${id}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });
    const data = await res;
    return data;
};

// Fungsi untuk menghapus data pengguna
export const deletePenggunaData = async (id: number, token: string): Promise<Response> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}user/${id}/hard`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await res;
    return data;
};