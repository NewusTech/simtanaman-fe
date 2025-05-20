export interface Provinsi {
    id: number;
    name: string;
    code: string;
}

export interface ApiResponse {
    status: number;
    message: string;
    data: Provinsi[];
}