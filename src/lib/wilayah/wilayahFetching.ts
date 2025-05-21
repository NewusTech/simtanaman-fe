import { ApiResponseKabupaten } from "@/types/wilayah/kabupaten";
import { ApiResponseKecamatan } from "@/types/wilayah/kecamatan";
import { ApiResponseKelurahan } from "@/types/wilayah/kelurahan";
import { ApiResponseProvinsi } from "@/types/wilayah/provinsi";

export const fetchProvinsiData = async (token: string): Promise<ApiResponseProvinsi['data']> => {
    const res = await fetch(`https://api-wliayah.vercel.app/region/provinces`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await res.json();
    return data.data;
};

export const fetchKabupatenData = async (id:string,token: string): Promise<ApiResponseKabupaten['data']> => {
    const res = await fetch(`https://api-wliayah.vercel.app/region/regencies/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await res.json();
    return data.data;
};

export const fetchKecamatanData = async (id:string,token: string): Promise<ApiResponseKecamatan['data']> => {
    const res = await fetch(`https://api-wliayah.vercel.app/region/districts/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await res.json();
    return data.data;
};

export const fetchKelurahanData = async (id:string,token: string): Promise<ApiResponseKelurahan['data']> => {
    const res = await fetch(`https://api-wliayah.vercel.app/region/villages/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await res.json();
    return data.data;
};

