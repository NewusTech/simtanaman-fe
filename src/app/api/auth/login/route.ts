import { NextResponse } from 'next/server'
import { findUser } from '@/data/mock-users'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { email, password } = body

        const user = findUser(email, password)

        if (!user) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            )
        }

        const response = {
            token: user.token,
            role: user.role,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        }

        return NextResponse.json(response)
    } catch (error) {
        return NextResponse.json(
            { error: 'Authentication failed' },
            { status: 500 }
        )
    }
}