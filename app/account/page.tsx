"use client";

import { UserContext } from "@/lib/userContext";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export default function AccountPage() {
    const router = useRouter();
    const { user, setUser } = useContext(UserContext);

    const handleSignOut = () => {
        document.cookie = document
            .cookie
            .split(";")
            .map(c => c.startsWith("TOKEN=") ? "TOKEN=" : c)
            .join(";");

        setUser(null);
        
        router.push("/auth");
    };

    return (
        <main className="p-4">
            {user ? (
                <>
                    <h1 className="text-xl font-semibold">
                        Your Account
                    </h1>

                    <table className="mt-4">
                        <tbody>
                            <tr>
                                <th className="p-2 text-left">Username:</th>
                                <td className="p-2">{user.id}</td>
                            </tr>

                            <tr>
                                <th className="p-2 text-left">Name:</th>
                                <td className="p-2">{user.name}</td>
                            </tr>
                        </tbody>
                    </table>

                    <button onClick={handleSignOut} className="mt-4 btn btn-sm btn-error">
                        Sign out
                    </button>
                </>
            ) : <p className="p-2">
                Login to Access this page
            </p>}
        </main>
    );
}