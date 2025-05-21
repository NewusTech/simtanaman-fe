export interface CardsAdmin {
    pengajuan: {
        sedangDiproses: number;
        disetujui: number;
        diperbaiki: number;
        direvisi: number;
    };
}
export interface StokBibit {
    namaTanaman: string;
    jumlah: number;
}
export interface ChartPengajuanStokBulanan {
    bulan: string;
    jumlah: number;
}
export interface Chart {
    pengajuanStokBulanan: ChartPengajuanStokBulanan[];
}
export interface ApiResponseAdminDashboard {
    status: number;
    message: string;
    data: {
        cards: CardsAdmin;
        stokBibit: StokBibit[];
        chart: Chart;
    };
}