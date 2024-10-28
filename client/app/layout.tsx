import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { NotifsProvider } from "@/app/context/notifContext";
import { UserProvider } from "@/app/context/userContext";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html data-theme="light" lang="en">
            <head>
                <title> NittVoice </title>
            </head>

            <body>
                <div className="relative min-h-screen flex flex-col">
                    <UserProvider>
                        <NotifsProvider>
                            <Header />
                            {children}
                            <Footer />
                        </NotifsProvider>
                    </UserProvider>
                </div>
            </body>
        </html>
    );
}
