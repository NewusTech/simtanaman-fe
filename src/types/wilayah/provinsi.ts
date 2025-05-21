export interface Provinsi {
    id: number;
    name: string;
    code: string;
}

export interface ApiResponseProvinsi {
    status: number;
    message: string;
    data: Provinsi[];
}