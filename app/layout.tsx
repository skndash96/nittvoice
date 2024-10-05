"use client";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { UserContext } from "@/lib/userContext";
import { useEffect, useState } from "react";
import { UserType } from "@/lib/types";
import getCookie from "@/lib/getCookie";
import { jwtDecode } from "jwt-decode";


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [user, _setUser] = useState<UserType|null>(null);
    const setUser = (u: UserType|null) => _setUser(u);

    useEffect(() => {
        const token = getCookie("TOKEN");

        if (token) {
            const user = jwtDecode<UserType>(token);

            setUser(user);
        }
    }, []);

    return (
        <html data-theme="light" lang="en">
            <head>
                <title> NittVoice </title>
            </head>
            
            <body>
                <UserContext.Provider value={{
                    user,
                    setUser
                }}>
                    <div className="min-h-screen flex flex-col">
                        <Header  />
                        {children}
                        <Footer />
                    </div>
                </UserContext.Provider>
            </body>
        </html>
    );
}
