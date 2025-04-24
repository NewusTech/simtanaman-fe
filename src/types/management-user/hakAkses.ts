export interface HakAkses {
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
        items: HakAkses[];
        total_pages: number;
        current_page: number;
        links: PaginationLinks;
    };
}

export interface ApiResponseById {
    status: number;
    message: string;
    data: {
        id: number,
        name: string;
    };
}