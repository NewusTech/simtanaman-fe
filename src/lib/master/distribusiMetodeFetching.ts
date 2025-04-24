import { ApiResponse } from "@/types/master/distribusiMetode";

// Fungsi untuk mengambil data dari API
export const fetchDistribusiData = async (page: number, token: string): Promise<ApiResponse['data']> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}master/distribution-method?page=${page}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await res.json();
    return data.data;
};

// Fungsi untuk menambahkan data jenis tanaman
export const postDistribusiData = async (name: string, token: string): Promise<Response> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}master/distribution-method`, {
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
export const putDistribusiData = async (id: number, name: string, token: string): Promise<Response> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}master/distribution-method/${id}`, {
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
export const deleteDistribusiData = async (id: number, token: string): Promise<Response> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}master/distribution-method/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await res;
    return data;
};

// Fungsi untuk mengambil data jenis tanaman berdasarkan ID
export const getDistribusiById = async (id: number, token: string): Promise<ApiResponse['data']> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}master/distribution-method/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await res.json();
    return data.data;
}

// Fungsi untuk search data jenis tanaman
export const searchDistribusiData = async (search: string, token: string): Promise<ApiResponse['data']> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}master/distribution-method?search=${search}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await res.json();
    return data.data;
};