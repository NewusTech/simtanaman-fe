import { ApiResponse } from "@/types/master/statusKepemilikan";

// Fungsi untuk mengambil data dari API
export const fetchStatusKepemilikanData = async (page: number, token: string): Promise<ApiResponse['data']> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}master/status-kepemilikan?page=${page}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await res.json();
    return data.data;
};

// Fungsi untuk menambahkan data jenis tanaman
export const poststatusKepemilikanData = async (name: string, token: string): Promise<Response> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}master/status-kepemilikan`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: name }),
    });
    const data = await res;
    return data;
};

// Fungsi untuk mengupdate data jenis tanaman
export const putstatusKepemilikanData = async (id: number, name: string, token: string): Promise<Response> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}master/status-kepemilikan/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: name }),
    });
    const data = await res;
    return data;
};

// Fungsi untuk menghapus data jenis tanaman
export const deletestatusKepemilikanData = async (id: number, token: string): Promise<Response> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}master/status-kepemilikan/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await res;
    return data;
};

// Fungsi untuk mengambil data jenis tanaman berdasarkan ID
export const getstatusKepemilikanById = async (id: number, token: string): Promise<ApiResponse['data']> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}master/status-kepemilikan/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await res.json();
    return data.data;
}

// Fungsi untuk search data jenis tanaman
export const searchstatusKepemilikanData = async (search: string, token: string): Promise<ApiResponse['data']> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}master/status-kepemilikan?search=${search}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await res.json();
    return data.data;
};