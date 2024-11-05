import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "wouter";
import { getCookie } from "../lib/utils";
import { Button } from "../components/ui/button";
import { ImSpinner2 } from "react-icons/im";
import { UserContext } from "../contexts/userContext";
import { NotifContext } from "../contexts/notifContext";

export default function Auth() {
    const [_, setLocation] = useLocation();

    const { refresh } = useContext(UserContext);
    const { addNotif } = useContext(NotifContext);

    const [status, setStatus] = useState<-1 | 0 | 1>(0);

    useEffect(() => {
        const token = getCookie("TOKEN");

        const params = new URLSearchParams(window.location.search);

        const code = params.get("code");

        if (code) {
            axios.get("/api/auth" + "?code=" + code)
                .then(() => {
                    addNotif({
                        id: crypto.randomUUID(),
                        body: "Logged in.",
                        type: "success"
                    });
                    setStatus(1);
                })
                .catch(() => {
                    setStatus(-1);
                    addNotif({
                        id: crypto.randomUUID(),
                        body: "Sorry, something went wrong.",
                        type: "error"
                    });
                });
        } else if (token) {
            setStatus(1);
        } else {
            setStatus(-1);
        }
    }, []);

    useEffect(() => {
        refresh();

        if (status === 1) {
            setTimeout(() => setLocation("/"), 2000);
        }
    }, [status]);

    const dAuth = {
        protocol: "https",
        host: "auth.delta.nitt.edu",
        path: "/authorize",
        params: new URLSearchParams([
            ["client_id", "9N2RgIB-5yQ23MeR"],
            ["redirect_uri", window.location.protocol+"//"+window.location.host+"/auth"],
            ["response_type", "code"],
            ["grant_type", "authorization_code"],
            ["scope", "email+profile+user+openid"]
        ])
    };

    return (
        <main className="grow p-4 w-fit mx-auto">
            <h1 className="text-center text-2xl font-semibold">
                NittVoice
            </h1>

            <div className="mt-4">
                {status === -1 ? (
                    <Button className="w-40 h-12 relative overflow-hidden" asChild>
                        <a href={`${dAuth.protocol}://${dAuth.host}${dAuth.path}?${dAuth.params}`}>
                            <img
                                src="/dauth.png"
                                alt="Dauth Login"
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </a>
                    </Button>
                ) : (
                    <Button className="w-40 h-12" disabled>
                        <ImSpinner2 size={24} className="animate-spin" />
                        {status === 0 ? "Please wait" : "Redirecting"}
                    </Button>
                )}
            </div>
        </main>
    );
}