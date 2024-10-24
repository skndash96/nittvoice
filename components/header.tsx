"use client";
import { UserContext } from "@/context/userContext";
import Link from "next/link";
import { useContext } from "react";
import { Input } from "./ui/input";
import { FiSearch } from "react-icons/fi";
import { Button } from "./ui/button";

export default function Header() {
    const { user } = useContext(UserContext);

    return (
        <header className="px-2 sm:px-4 py-2 sticky top-0 flex gap-2 justify-between items-center bg-white z-[1]">
            <div>
                <h1 className="text-lg font-semibold">
                    <Link href="/" className="flex items-center gap-1">
                        {/* <Image src="/logo.png" className="w-8 h-8" width={36} height={36} alt="Logo" /> */}
                        Nittvoice
                    </Link>
                </h1>
            </div>

            <div className="flex items-center gap-2">
                <div className="relative">
                    <Input className="pl-8 max-sm:max-w-0 transition-all bg-neutral-100 border-none outline-none shadow-none" placeholder="Search" />
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary" />
                </div>

                <ul className="flex gap-1">
                    <li>
                        <Button className="classic" asChild>
                            <Link href="/new" className="font-semibold">
                                Create
                            </Link>
                        </Button>
                    </li>

                    <li>
                        <Button variant="ghost" asChild>
                            {user ?
                                <Link href="/account" className="font-semibold">
                                    Account
                                </Link>
                                :
                                <Link href="/auth" className="font-semibold">
                                    Login
                                </Link>
                            }
                        </Button>
                    </li>
                </ul>
            </div>
        </header>
    );
}