"use client";
import { UserContext } from "@/lib/userContext";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";

export default function Header() {
    const { user } = useContext(UserContext);

    return (
        <header className="sticky top-0 flex justify-between items-center bg-white z-[1] border-b-[1px] border-solid shadow-sm">
            <div className="px-2 py-1">
                <h1 className="text-lg font-bold">
                    <Link href="/" className="flex items-center gap-1">
                        <Image src="/logo.png" className="w-8 h-8" width={36} height={36} alt="Logo" />
                        NittVoice
                    </Link>
                </h1>
            </div>

            <div className="px-1">
                <ul className="flex gap-1">
                    <li>
                        <Link href="/new" className="my-1 p-1 px-2 btn btn-sm btn-accent">
                            New Post
                        </Link>
                    </li>

                    <li>
                        {user ?
                            <Link href="/account" className="my-1 p-1 px-2 btn btn-sm btn-primary">
                                Account
                            </Link>
                            :
                            <Link href="/auth" className="my-1 p-1 px-2 btn btn-sm btn-primary">
                                Login
                            </Link>
                        }
                    </li>
                </ul>
            </div>
        </header>
    );
}