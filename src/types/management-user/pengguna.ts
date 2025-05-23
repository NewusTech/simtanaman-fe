export interface Role {
    name: string;
}

export interface Pengguna {
    id: number;
    name: string;
    email: string;
    profile: {
        jenisKelamin: string;
    };
    role: Role;
    active_status: boolean;
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
        items: Pengguna[];
        total_pages: number;
        current_page: number;
        links: PaginationLinks;
    };
}

export interface ApiResponseById {
    status: number;
    message: string;
    data: {
        id: number;
        name: string;
        email: string;
        password: string;
        roleId: number;
        jenisKelamin: string;
        status: boolean;
    };
}