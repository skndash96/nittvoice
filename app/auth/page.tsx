"use client";
import { NotifContext } from "@/context/notifContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/userContext";
import { FiLoader } from "react-icons/fi";
import { ImSpinner2 } from "react-icons/im";
import { Button } from "@/components/ui/button";
import { getCookie } from "@/lib/utils";
import axios from "axios";

export default function Auth() {
    const router = useRouter();
    const { refresh } = useContext(UserContext);
    const { addNotif } = useContext(NotifContext);

    const [status, setStatus] = useState<-1 | 0 | 1>(0);

    useEffect(() => {
        const token = getCookie("TOKEN");

        const params = new URLSearchParams(location.search);

        const code = params.get("code");

        if (code) {
            axios.get("/api/auth" + "?code=" + code)
                .then(({ data }) => {
                    refresh();
                    addNotif({
                        id: crypto.randomUUID(),
                        body: "Logged in.",
                        type: "success"
                    });
                    setStatus(1);
                })
                .catch(error => {
                    setStatus(-1);
                    addNotif({
                        id: crypto.randomUUID(),
                        body: "Sorry, something went wrong.",
                        type: "error"
                    });
                    console.error(error);
                });
        } else if (token) {
            setStatus(1);
        } else {
            setStatus(-1);
        }
    }, []);

    useEffect(() => {
        if (status === 1) {
            setTimeout(() => router.push("/"), 2000);
        }
    }, [status]);
    const dAuth = {
        protocol: "https",
        host: "auth.delta.nitt.edu",
        path: "/authorize",
        params: new URLSearchParams([
            ["client_id", "9N2RgIB-5yQ23MeR"],
            ["redirect_uri", "http://127.0.0.1:3000/auth"],
            ["response_type", "code"],
            ["grant_type", "authorization_code"],
            ["scope", "email+profile+user+openid"]
        ])
    };

    return (
        <div className="p-4 w-fit mx-auto">
            <h1 className="text-center text-2xl font-semibold">
                NittVoice
            </h1>

            <div className="mt-4">
                {status === -1 ? (
                    <Button className="w-40 h-12 relative overflow-hidden" asChild>
                        <Link href={`${dAuth.protocol}://${dAuth.host}${dAuth.path}?${dAuth.params}`}>
                            <Image
                                src="/dauth.png"
                                alt="Dauth Login"
                                fill
                                priority
                            />
                        </Link>
                    </Button>
                ) : (
                    <Button className="w-40 h-12" disabled>
                        <ImSpinner2 size={24} className="animate-spin" />
                        {status === 0 ? "Please wait" : "Redirecting"}
                    </Button>
                )}
            </div>
        </div >
    );
}