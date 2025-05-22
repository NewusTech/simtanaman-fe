export interface LaporanDistributor {
    id: number;
    nik: string;
    noTelepon: string;
    email: string;
    noKartuTani: string;
    noRegistrasiPoktan: string;
    namaKetuaPoktan: string;
    namaLengkap: string;
    Provinsi: string;
    Kabupaten: string;
    Kecamatan: string;
    DesaKelurahan: string;
    alamat: string;
    latitude: number;
    longitude: number;
    luasLahan: number;
    jumlahTanamanHektar: number;
    masaTanam: string;
    tahunMusimTanam: number;
    jumlahTanaman: number;
    alasan: string;
    ktp: string;
    kartuTani: string;
    status: string;
    tanamanId: number;
    tanamanKebutuhanId: number;
    statusLahanId: number;
    poktanId: number | null;
    methodId: number;
    createdAt: string;
    updatedAt: string;
    tanaman: {
        id: number;
        name: string;
    };
    poktan: any | null;
    tanamanKebutuhan: {
        id: number;
        name: string;
    };
    distribusiTanaman: any[];
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
        items: LaporanDistributor[];
        total_pages: number;
        current_page: number;
        links: PaginationLinks;
    };
}