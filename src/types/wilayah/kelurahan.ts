export interface Kelurahan {
    id: number;
    name: string;
    code: string;
    full_code: string;
    pos_code: string;
    kecamatan_id: number;
}

export interface ApiResponse {
    status: number;
    message: string;
    data: Kelurahan[];
}