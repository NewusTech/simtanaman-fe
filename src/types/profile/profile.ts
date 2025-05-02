export interface Role {
    id: number;
    name: string;
}

export interface Profile {
    id: number;
    nik: string;
    tanggalLahir: string; // Bisa menggunakan Date jika diperlukan
    jenisKelamin: string;
    nip: string | null;
    noTelepon: string;
    alamat: string;
    createdAt: string; // Bisa menggunakan Date jika diperlukan
    updatedAt: string; // Bisa menggunakan Date jika diperlukan
}

export interface User {
    id: number;
    email: string;
    name: string;
    password: string;
    roleId: number;
    createdAt: string; // Bisa diganti dengan Date jika diperlukan
    updatedAt: string; // Bisa diganti dengan Date jika diperlukan
    deletedAt: string | null; // Bisa null jika belum dihapus
    profileId: number | null; // Bisa null jika belum ada profil
    role: Role; // Menghubungkan ke tipe Role
    profile: Profile; // Bisa didefinisikan lebih lanjut jika ada tipe untuk profil
}

export interface ApiResponse {
    status: number;
    message: string;
    data: User;
}