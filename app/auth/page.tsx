"use client";
import getCookie from "@/lib/getCookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Auth() {
    const router = useRouter();

    const [status, setStatus] = useState<number>(0);
    //-1 not logged in
    // 0 loading
    // 1 successful log in attempt
    // 2 logged in

    useEffect(() => {
        const token = getCookie("TOKEN");

        const params = new URLSearchParams(location.search);

        const code = params.get("code");

        if (code) {
            (async () => {
                try {
                    const res = await fetch("/api/auth" + "?code=" + code, {
                        method: 'GET'
                    });

                    const json = await res.json();

                    if (json.success) {
                        location.search = "?";
                        setStatus(2);
                    } else {
                        setStatus(-1);
                    }
                } catch (e) {
                    console.error(e);
                }
            })();
        } else if (token) {
            setStatus(2);
            return;
        } else {
            setStatus(-1);
        }
    }, []);

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

            {
                status === -1
                    ? <Link
                        href={`${dAuth.protocol}://${dAuth.host}${dAuth.path}?${dAuth.params}`}
                        className="mt-4 overflow-hidden block rounded-xl"
                    >
                        <Image
                            src="/dauth.png"
                            alt="Dauth Login"
                            width={160}
                            height={80}
                            priority
                        />
                    </Link>

                    : status === 2
                        ? <>
                            <div className="p-2 w-40 h-12 text-sm grid place-items-center bg-neutral text-white rounded-lg">
                                Logged In
                            </div>

                            <Link href="/" className="underline">
                                Go Home
                            </Link>
                        </>

                        : <div className="w-40 h-12 grid place-items-center rounded-xl text-center bg-neutral">
                            <span className="loading loading-spinner bg-accent"></span>
                            {
                                status === 1 && "Success"
                            }
                        </div>
            }
        </div>
    );
}