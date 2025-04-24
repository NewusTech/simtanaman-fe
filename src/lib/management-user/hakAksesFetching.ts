import { ApiResponse, ApiResponseById } from "@/types/management-user/hakAkses";

/// Fungsi untuk mengambil data dari API
export const fetchHakAksesData = async (page: number, token: string): Promise<ApiResponse['data']> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}role?page=${page}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await res.json();
    return data.data;
};

export const fetchHakAksesDataById = async (id: number, token: string): Promise<ApiResponseById['data']> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}role/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await res.json();
    return data.data;
};

// Fungsi untuk mengirim data ke API
export const postHakAksesData = async (payload: object, token: string): Promise<Response> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}role`, {
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
export const putHakAksesData = async (id: number, payload: object, token: string): Promise<Response> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}role/${id}`, {
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
export const deleteHakAksesData = async (id: number, token: string): Promise<Response> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}role/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await res;
    return data;
};
// Fungsi untuk mencari data HakAkses berdasarkan nama
export const searchHakAksesData = async (search: string, token: string): Promise<ApiResponse['data']> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}role?search=${search}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await res.json();
    return data.data;
}