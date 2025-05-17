export interface SeedStock {
    id: number;
    plantId: number;
    userId: number;
    jumlah: number;
    createdAt: string;
    updatedAt: string;
    plant: {
        id: number;
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
        items: SeedStock[];
        total_pages: number;
        current_page: number;
        links: PaginationLinks;
    };
}