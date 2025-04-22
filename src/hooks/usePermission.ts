import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Role, Permission, Feature, ROLE_PERMISSIONS } from '@/types/auth'
import useUserStore from '@/store/auth/userStore'

export function usePermission(requiredRole?: Role) {
    const router = useRouter()
    const user = useUserStore((state) => state.user)

    const getRole = (): Role | null => {
        const role = user?.role?.name
        return (role as Role) || null
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