export interface Kabupaten {
    id: number;
    type: string;
    name: string;
    code: string;
    full_code: string;
    provinsi_id: number;
}

export interface ApiResponse {
    status: number;
    message: string;
    data: Kabupaten[];
}