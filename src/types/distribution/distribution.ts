export interface Distribution {
    id: number;
    nik: string;
    noTelepon: string;
    email: string;
    noKartuTani: string | null;
    noRegistrasiPoktan: string;
    namaKetuaPoktan: string | null;
    namaLengkap: string | null;
    Provinsi: string;
    Kabupaten: string;
    Kecamatan: string;
    DesaKelurahan: string;
    alamat: string;
    latitude: number | null;
    longitude: number | null;
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
    tanamanKebutuhanId: number | null;
    statusLahanId: number;
    poktanId: number;
    methodId: number;
    createdAt: string;
    updatedAt: string;
    tanaman: {
      id: number;
      name: string;
    };
    poktan: {
      id: number;
      name: string;
      ketuaPoktan: string;
      totalAnggota: number;
      kecamatan: string;
      kelurahan: string;
      desa: string | null;
      longitude: number;
      latitude: number;
      alamat: string;
      createdAt: string;
      updatedAt: string;
      deletedAt: string | null;
    };
    tanamanKebutuhan: any;
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
        items: Distribution[];
        total_pages: number;
        current_page: number;
        links: PaginationLinks;
    };
}

export interface ApiResponseById {
  status: number;
  message: string;
  data: {
    nik: string,
    noTelepon: string,
    email: string,
    noKartuTani: string | null,
    noRegistrasiPoktan: string,
    namaKetuaPoktan: string | null,
    namaLengkap: string | null,
    Provinsi: string,
    Kabupaten: string,
    Kecamatan: string,
    DesaKelurahan: string,
    alamat: string,
    latitude: number | null,
    longitude: number | null,
    luasLahan: number,
    jumlahTanamanHektar: number,
    masaTanam: string,
    tahunMusimTanam: number,
    jumlahTanaman: number,
    alasan: string,
    ktp: string,
    kartuTani: string,
    status: string,
    tanamanId: number,
    tanamanKebutuhanId: number | null,
    statusLahanId: number,
    poktanId: number,
    methodId: number,
    tanaman: {
      name: string,
    },
    poktan: {
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
    tanamanKebutuhan: any,
    distribusiTanaman: any[],
  };
}
