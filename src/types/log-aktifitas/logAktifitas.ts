export interface LogAktifitas {
    id: number;
    detail: string;
    process: string;
    createdAt: string;
    user: {
        name: string;
    };
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
        items: LogAktifitas[];
        total_pages: number;
        current_page: number;
        links: PaginationLinks;
    };
}