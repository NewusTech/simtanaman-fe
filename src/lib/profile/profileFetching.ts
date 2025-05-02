import { ApiResponse } from "@/types/profile/profile";

// Fungsi untuk mengambil data dari API
export const fetchProfileData = async ( token: string): Promise<ApiResponse['data']> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}profile/`, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
    const data = await res.json();
    return data.data;
};

// Fungsi untuk mengubah data profil
export const updateProfileData = async (
    token: string,
    payload: object
): Promise<Response> => {

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}profile/`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        throw new Error(`Failed to update profile: ${res.status} ${res.statusText}`);
    }

    const data = await res;
    return data;
};

// Fungsi untuk mengubah password
export const updatePasswordData = async (
    token: string,
    payload: object
): Promise<Response> => {

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}auth/change-password`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        throw new Error(`Failed to update profile: ${res.status} ${res.statusText}`);
    }

    const data = await res;
    return data;
};