import { respond } from "@/lib/utils";
import { User } from "@prisma/client";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export default function getUser(req: Request): User | null {
    const cookieStore = cookies();
    const token = cookieStore.get("TOKEN")?.value;

    if (!token) return null;

    try {
        const user = jwtDecode<User>(token);
        return user;
    } catch (error) {
        console.error(error);
        return null;
    }
}