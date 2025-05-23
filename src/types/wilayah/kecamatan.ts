export interface Kecamatan {
    id: number;
    name: string;
    code: string;
    full_code: string;
    kabupaten_id: number;
}

export interface ApiResponseKecamatan {
    status: number;
    message: string;
    data: Kecamatan[];
}