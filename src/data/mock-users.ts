export const mockUsers = [
    {
        id: '1',
        email: 'admin@simtanaman.com',
        password: 'admin123',
        name: 'Admin User',
        role: 'admin',
        token: 'admin-mock-token-123'
    },
    {
        id: '2',
        email: 'penyuluh@simtanaman.com',
        password: 'penyuluh123',
        name: 'Penyuluh User',
        role: 'penyuluh',
        token: 'penyuluh-mock-token-123'
    },
    {
        id: '3',
        email: 'distributor@simtanaman.com',
        password: 'distributor123',
        name: 'Distributor User',
        role: 'distributor',
        token: 'distributor-mock-token-123'
    },
    {
        id: '4',
        email: 'user@simtanaman.com',
        password: 'user123',
        name: 'Regular User',
        role: 'user',
        token: 'user-mock-token-123'
    }
]

export const findUser = (email: string, password: string) => {
    return mockUsers.find(user =>
        user.email === email && user.password === password
    )
}