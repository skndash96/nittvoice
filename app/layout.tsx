import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { NotifsProvider } from "@/context/notifContext";
import { UserProvider } from "@/context/userContext";

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
                <UserProvider>
                    <NotifsProvider>
                        <div className="min-h-screen flex flex-col">
                            <Header />
                            {children}
                            <Footer />
                        </div>
                    </NotifsProvider>
                </UserProvider>
            </body>
        </html>
    );
}
