export interface Poktan {
    id: number;
    name: string;
}

export interface PaginationLinks {
    prev: string | null;
    next: string | null;
}

export interface ApiResponse {
    status: number;
    message: string;
    data: {
        total_items: number;
        page: number;
        items: Poktan[];
        total_pages: number;
        current_page: number;
        links: PaginationLinks;
    };
}

export interface ApiResponseById {
    status: number;
    message: string;
    data: {
        name: string,
        totalAnggota: number,
        kelurahan: string
        latitude: number,
        longitude: number,
        ketuaPoktan: string,
        kecamatan: string,
        desa: string,
        alamat: string,
    };
}