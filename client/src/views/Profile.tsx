"use client";

import { Button } from "../components/ui/button";
import { NotifContext } from "../contexts/notifContext";
import { UserContext } from "../contexts/userContext";
import { useLocation } from "wouter";
import { useContext, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";

export default function Profile() {
    const [_, setLocation] = useLocation();
    const { user, refresh } = useContext(UserContext);
    const { addNotif } = useContext(NotifContext);

    const handleSignOut = () => {
        document.cookie = document
            .cookie
            .split(";")
            .map(c => c.startsWith("TOKEN=") ? "TOKEN=" : c)
            .join(";");

        refresh();

        addNotif({
            id: window.crypto.randomUUID(),
            body: "Signed out",
            type: "info"
        });
    };

    useEffect(() => {
        if (!user) {
            setLocation("/auth");
        }
    }, [user]);
    
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
            ) : (
                <div className="flex flex-col items-center gap-2">
                    <FaSignInAlt className="text-7xl text-neutral-500" />
                    <p className="text-neutral-600">Please Sign In</p>
                </div>
            )}
        </main>
    );
}