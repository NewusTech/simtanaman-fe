export interface LaporanPengajuanTanaman {
    id: number;
    userId: number;
    tanamanId: number;
    jumlah: number;
    tanggalPengajuan: string;
    tanggalKebutuhan: string;
    alasan: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    tanaman: {
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
        items: LaporanPengajuanTanaman[];
        total_pages: number;
        current_page: number;
        links: PaginationLinks;
    };
}