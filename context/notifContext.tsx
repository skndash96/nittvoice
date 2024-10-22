"use client";

import NotifsList from "./components/notifsList";
import { createContext, useState } from "react";

export type NotifContextValueType = {
    addNotif: (n: NotifType) => void,
    removeNotif: (id: string) => void
}

export type NotifType = {
    id: string,
    body: string,
    type: "error"|"info"|"warning"|"success"
}

export const NotifContext = createContext<NotifContextValueType>({
    addNotif: () => null,
    removeNotif: () => null
});

export function NotifsProvider({
    children
}: {
    children: React.ReactNode
}) {
    const [notifs, setNotifs] = useState<NotifType[]>([]);
    const addNotif = (n: NotifType) => setNotifs(s => [...s, n]);
    const removeNotif = (id: string) => setNotifs(s => {
        const idx = s.findIndex(n => n.id === id);
        if (idx !== -1) {
            s.splice(idx, 1);
        }
        return [...s];
    });

    return (
        <NotifContext.Provider value={{
            addNotif,
            removeNotif
        }}>
            {children}
            <NotifsList data={notifs} />
        </NotifContext.Provider>
    );
}