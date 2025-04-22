"use client";

import { useRouter } from "next/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../dropdown-menu";
import Link from "next/link";
import { BellIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface UserProfilProps {
    image?: string;
    role?: string;
}
export default function UserProfil() {
    const router = useRouter();
    const [userData, setUserData] = useState({
        name: '',
        role: ''
    });

    useEffect(() => {
        const role = document.cookie
            .split('; ')
            .find(row => row.startsWith('role='))
            ?.split('=')[1] || '';

        setUserData({
            name: role ? role.charAt(0).toUpperCase() + role.slice(1) : 'Guest',
            role: role
        });
    }, []);

    const handleProfile = () => {
        console.log("Profile");

        router.push("/home/profile");
    }

    const handleLogout = () => {
        // Remove auth cookies
        document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
        document.cookie = "role=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";

        // Redirect to login page
        router.push("/auth/login");
    }

    return (
        <div className="flex items-center gap-4">
            <div onClick={() => { router.push('/home/notification') }} className="flex items-center relative mr-10 cursor-pointer">
                <BellIcon className="w-7 h-7" />
                <div className="absolute top-0 right-0 w-[15px] h-[15px] text-center text-white text-[10px] bg-danger-600 rounded-full">10</div>
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <div className="flex items-center">
                        <div className="flex items-center">
                            <div className="flex flex-col items-end mr-2">
                                <div className="text-sm font-semibold text-primary-default">
                                    {userData.name}
                                </div>
                                <div className="text-sm font-medium text-primary-default">
                                    {userData.role}
                                </div>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                        </div>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white shadow-md mr-2 w-48">
                    <DropdownMenuLabel>
                        <div className="flex items-center justify-end">
                            <div className="flex flex-col items-end mr-2">
                                <div className="text-sm font-semibold text-primary-default">
                                    {userData.name}
                                </div>
                                <div className="text-sm font-medium text-primary-default">
                                    {userData.role}
                                </div>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-gray-400 mx-1" />
                    <DropdownMenuItem className="hover:bg-primary-100 cursor-pointer">
                        <Link href="/home/profile">
                            Profil
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-primary-100 cursor-pointer">
                        <Link href="/home/log">
                            Log Aktivitas
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={handleLogout}
                        className="text-danger-600 hover:bg-primary-100 cursor-pointer"
                    >
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}