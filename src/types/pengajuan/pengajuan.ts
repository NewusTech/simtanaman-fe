export interface Tanaman {
    id: number;
    name: string;
}

export interface MethodTanam {
    id: number;
    name: string;
}

export interface PoktanDetail {
    id: number;
    name: string;
    ketuaPoktan: string | null;
    totalAnggota: number;
    kecamatan: string;
    kelurahan: string;
    longitude: number;
    latitude: number;
    alamat: string;
    createdAt: string; // Consider using Date type if you parse it
    updatedAt: string; // Consider using Date type if you parse it
    deletedAt: string | null;
}

export interface StatusLahan {
    id: number;
    name: string;
}

// Define TanamanKebutuhan interface if its structure is known, otherwise use null or any
// export interface TanamanKebutuhan { ... }

export interface PengajuanItem {
    id: number;
    nik: string;
    noTelepon: string;
    email: string;
    noKartuTani: string | null;
    noRegistrasiPoktan: string;
    namaKetuaPoktan: string | null;
    Provinsi: string;
    Kabupaten: string;
    Kecamatan: string;
    DesaKelurahan: string;
    alamat: string;
    luasLahan: number;
    jumlahTanamanHektar: number;
    masaTanam: string;
    tahunMusimTanam: number;
    jumlahTanaman: number;
    alasan: string;
    ktp: string;
    kartuTani: string | null; // Assuming empty string means null or optional
    status: string; // Consider using a specific enum or literal types if possible: 'Diajukan' | 'Disetujui' | 'Ditolak' etc.
    tanamanId: number;
    tanamanKebutuhanId: number | null;
    statusLahanId: number;
    poktanId: number;
    methodId: number;
    createdAt: string; // Consider using Date type if you parse it
    updatedAt: string; // Consider using Date type if you parse it
    tanaman: Tanaman;
    methodTanam: MethodTanam;
    poktan: PoktanDetail;
    statusLahan: StatusLahan;
    tanamanKebutuhan: any | null; // Use a specific interface if structure is known, otherwise any or null
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
        items: PengajuanItem[];
        total_pages: number;
        current_page: number;
        links: PaginationLinks;
    };
}