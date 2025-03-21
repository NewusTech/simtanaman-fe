"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function NotificationPage() {
    const [selectFilter, setSelectFilter] = useState("semua");
    const [listNotification, setListNotification] = useState([
        {
            id: 1,
            title: "Notifikasi 1",
            date: new Date(),
            read: false,
        },
        {
            id: 2,
            title: "Notifikasi 2",
            date: new Date(),
            read: true,
        },
        {
            id: 3,
            title: "Notifikasi 3",
            date: new Date(),
            read: false,
        },
    ]);
    return (
        <div className="p-4 bg-white shadow-md rounded-lg">
            <div className="flex justify-between items-center mb-4 border-b pb-4">
                <div className="flex items-center gap-4">
                    <Button onClick={() => { setSelectFilter('semua') }} className={`rounded-full border border-primary-default ${selectFilter == 'semua' ? 'bg-primary-default text-white' : 'text-primary-default'}`}>Semua</Button>
                    <Button onClick={() => { setSelectFilter('dibaca') }} className={`rounded-full border border-primary-default ${selectFilter == 'dibaca' ? 'bg-primary-default text-white' : 'text-primary-default'}`}>Dibaca</Button>
                    <Button onClick={() => { setSelectFilter('belum-dibaca') }} className={`rounded-full border border-primary-default ${selectFilter == 'belum-dibaca' ? 'bg-primary-default text-white' : 'text-primary-default'}`}>Belum Dibaca</Button>
                </div>
                <div className="text-primary-default underline cursor-pointer">Tandai dibaca semua</div>
            </div>
            <div className="flex flex-col">
                {listNotification.map((notification) => (
                    <div key={notification.id} className={`flex justify-between items-center p-4 border-b ${notification.read ? 'bg-white' : 'bg-primary-100'}`}>
                        <div className="text-sm font-medium">{notification.title}</div>
                        {notification.date.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </div>
                ))}
            </div>
        </div>
    );
}