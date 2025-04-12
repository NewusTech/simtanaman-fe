export type Role = 'admin' | 'penyuluh' | 'distributor' | 'user'

export type Permission = 'create' | 'read' | 'update' | 'delete'

export type Feature =
    | 'dashboard'
    | 'pengajuan_aspirasi'
    | 'riwayat_pengajuan'
    | 'forum_diskusi'
    | 'laporan'
    | 'data_master'
    | 'kelola_akun'

export const ROLE_PERMISSIONS: Record<Role, Record<Feature, Permission[]>> = {
    admin: {
        dashboard: ['create', 'read', 'update', 'delete'],
        pengajuan_aspirasi: ['create', 'read', 'update', 'delete'],
        riwayat_pengajuan: ['create', 'read', 'update', 'delete'],
        forum_diskusi: ['create', 'read', 'update', 'delete'],
        laporan: ['create', 'read', 'update', 'delete'],
        data_master: ['create', 'read', 'update', 'delete'],
        kelola_akun: ['create', 'read', 'update', 'delete']
    },
    penyuluh: {
        dashboard: ['read'],
        pengajuan_aspirasi: ['create', 'read', 'update'],
        riwayat_pengajuan: ['read'],
        forum_diskusi: ['create', 'read', 'update'],
        laporan: ['read', 'create'],
        data_master: ['read'],
        kelola_akun: ['read', 'update']
    },
    distributor: {
        dashboard: ['read'],
        pengajuan_aspirasi: ['create', 'read'],
        riwayat_pengajuan: ['read'],
        forum_diskusi: ['create', 'read', 'update'],
        laporan: ['read'],
        data_master: ['read'],
        kelola_akun: ['read', 'update']
    },
    user: {
        dashboard: ['read'],
        pengajuan_aspirasi: ['create', 'read'],
        riwayat_pengajuan: ['read'],
        forum_diskusi: ['create', 'read'],
        laporan: ['read'],
        data_master: ['read'],
        kelola_akun: ['read']
    }
}