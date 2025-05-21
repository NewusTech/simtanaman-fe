export interface CardsDistribusi {
    dalamProses: number;
    dijadwalkan: number;
    selesai: number;
}
export interface StokBibit {
    namaTanaman: string;
    jumlah: number;
}
export interface ChartDistribusiBulanan {
    bulan: string;
    jumlah: number;
}
export interface ChartPengajuanStokBulanan {
    bulan: string;
    jumlah: number;
}
export interface Chart {
    distribusiBulanan: ChartDistribusiBulanan[];
    pengajuanStokBulanan: ChartPengajuanStokBulanan[];
}
export interface ApiResponse {
    status: number;
    message: string;
    data: {
        cards: CardsDistribusi;
        stokBibit: StokBibit[];
        chart: {
            distribusiBulanan: ChartDistribusiBulanan[];
            pengajuanStokBulanan: ChartPengajuanStokBulanan[];
        };
    };
}