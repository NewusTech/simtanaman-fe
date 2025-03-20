import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Role, Permission, Feature, ROLE_PERMISSIONS } from '@/types/auth'

export function usePermission(requiredRole?: Role) {
    const router = useRouter()

    const getRole = (): Role | null => {
        const role = document.cookie
            .split('; ')
            .find(row => row.startsWith('role='))
            ?.split('=')[1] as Role | null

        return role
    }

    const hasPermission = (feature: Feature, permission: Permission): boolean => {
        const role = getRole()
        if (!role) return false
        return ROLE_PERMISSIONS[role][feature]?.includes(permission) || false
    }

    const checkFeatureAccess = (feature: Feature): boolean => {
        const role = getRole()
        if (!role) return false
        return Object.keys(ROLE_PERMISSIONS[role][feature] || {}).length > 0
    }

    useEffect(() => {
        const role = getRole()
        if (requiredRole && role !== requiredRole) {
            router.push('/home')
        }
    }, [requiredRole, router])

    return {
        hasPermission,
        checkFeatureAccess,
        role: getRole()
    }
}