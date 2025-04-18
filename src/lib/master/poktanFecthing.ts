import { ApiResponse, ApiResponseById } from "@/types/master/poktan";

// Fungsi untuk mengambil data dari API
export const fetchPoktanData = async (page: number, token: string): Promise<ApiResponse['data']> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}master/poktan?page=${page}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await res.json();
    return data.data;
};

export const fetchPoktanDataById = async (id: number, token: string): Promise<ApiResponseById['data']> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}master/poktan/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await res.json();
    return data.data;
};

// Fungsi untuk mengirim data ke API
export const postPoktanData = async (payload: object, token: string): Promise<Response> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}master/poktan`, {
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
export const putPoktanData = async (id: number, payload: object, token: string): Promise<Response> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}master/poktan/${id}`, {
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