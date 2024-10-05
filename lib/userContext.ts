import { createContext } from "react";
import { UserType } from "./types";

export type UserContextValueType = {
    user: UserType | null,
    setUser(u: UserType | null): void
};

export const UserContext = createContext<UserContextValueType>({
    user: null,
    setUser() {}
});
