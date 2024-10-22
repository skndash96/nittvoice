"use client";
import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import { User } from "@prisma/client";
import { getCookie } from "@/lib/utils";

export type UserContextValueType = {
    user: User | null,
    refresh: () => void
};

export const UserContext = createContext<UserContextValueType>({
    user: null,
    refresh: () => {}
});

export function UserProvider({
    children
}: {
    children: React.ReactNode;
}) {
    const [user, setUser] = useState<User | null>(null);
    const [counter, setCounter] = useState<number>(0);

    const refresh = () => setCounter(counter + 1);

    useEffect(() => {
        const token = getCookie("TOKEN");

        console.log("refreshing cookie", token);

        if (token) {
            const user = jwtDecode<User>(token);

            setUser(user);
        }
    }, [counter]);

    return (
        <UserContext.Provider value={{
            user,
            refresh
        }}>
            {children}
        </UserContext.Provider>
    );
}