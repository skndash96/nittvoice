"use client";

import { Button } from "@/components/ui/button";
import { NotifContext } from "@/context/notifContext";
import { UserContext } from "@/context/userContext";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export default function AccountPage() {
    const router = useRouter();
    const { user, refresh } = useContext(UserContext);
    const { addNotif } = useContext(NotifContext);

    const handleSignOut = () => {
        document.cookie = document
            .cookie
            .split(";")
            .map(c => c.startsWith("TOKEN=") ? "TOKEN=" : c)
            .join(";");

        refresh();

        router.push("/auth");

        addNotif({
            id: window.crypto.randomUUID(),
            body: "Signed out",
            type: "info"
        });
    };

    return (
        <main className="p-4">
            {user ? (
                <>

                    <div className="flex items-center gap-4">
                        <div className="w-20 grid place-items-center text-3xl bg-neutral-200 shadow-md rounded-full aspect-square">
                            {user.name.split(" ").map(name => name[0]).join("")}
                        </div>
                        <div>
                            <h1 className="text-xl font-semibold">
                                {user.name}
                            </h1>
                            <span>
                                {user.id}
                            </span>
                        </div>
                    </div>
                    
                    <Button variant="destructive" onClick={handleSignOut} className="mt-4 btn btn-sm btn-error">
                        Sign out
                    </Button>
                </>
            ) : <p className="p-2">
                Login to Access this page
            </p>}
        </main>
    );
}