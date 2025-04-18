import { ApiResponse } from "@/types/master/jenisTanaman";

// Fungsi untuk mengambil data dari API
export const fetchJenisTanamanData = async (page: number, token: string): Promise<ApiResponse['data']> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}master/jenis-tanaman?page=${page}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await res.json();
    return data.data;
};

// Fungsi untuk menambahkan data jenis tanaman
export const postJenisTanamanData = async (name: string, token: string): Promise<Response> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}master/jenis-tanaman`, {
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
export const putJenisTanamanData = async (id: number, name: string, token: string): Promise<Response> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}master/jenis-tanaman/${id}`, {
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
export const deleteJenisTanamanData = async (id: number, token: string): Promise<Response> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}master/jenis-tanaman/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await res;
    return data;
};

// Fungsi untuk mengambil data jenis tanaman berdasarkan ID
export const getJenisTanamanById = async (id: number, token: string): Promise<ApiResponse['data']> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}master/jenis-tanaman/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await res.json();
    return data.data;
}

// Fungsi untuk search data jenis tanaman
export const searchJenisTanamanData = async (search: string, token: string): Promise<ApiResponse['data']> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}master/jenis-tanaman?search=${search}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await res.json();
    return data.data;
};