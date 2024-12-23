;
import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import { getCookie } from "../lib/utils";
import { User } from "../lib/types";

export type UserContextValueType = {
    user: User
    | null,
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
        } else {
            setUser(null);
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