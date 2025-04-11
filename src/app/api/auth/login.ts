import type { NextApiRequest, NextApiResponse } from 'next';

interface Role {
  id: number;
  name: string;
}

interface User {
  id: number;
  email: string;
  name: string;
  roleId: number;
  role: Role;
  createdAt: string;
  updatedAt: string;
  profileId: string | null;
  token: string;
}

interface LoginResponse {
  status: number;
  message: string;
  data: User;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { email, password } = req.body;

      // Menggunakan fetch untuk request ke API eksternal
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result: LoginResponse = await response.json();

      // Menangani status 404 (User tidak ditemukan)
      if (result.status === 401) {
        return res.status(401).json({ error: 'User not found' });
      }

      // Menangani status 200 (login berhasil)
      if (result.status === 200) {
        return res.status(200).json({ user: result.data });
      }

      // Menangani kesalahan umum
      return res.status(400).json({ error: result.message });
    } catch (error) {
      res.status(500).json({ error: 'Login gagal, coba lagi!' });
    }
  } else {
    res.status(405).json({ error: 'Metode tidak diizinkan' });
  }
}