;
import { UserContext } from "../contexts/userContext";
import { Link} from "wouter";
import { useContext } from "react";
import { Button } from "./ui/button";
import Searchbar from "./Searchbar";

export default function Header() {
    const { user } = useContext(UserContext);

    return (
        <header className="px-2 sm:px-4 py-2 sticky top-0 flex gap-2 justify-between items-center bg-white text-black z-[1]">
            <div>
                <h1 className="text-lg font-semibold">
                    <Link href="/posts" className="flex items-center gap-1">
                        <img src="/logo.png" className="w-8 h-8" width={36} height={36} alt="Logo" />
                        Nittvoice
                    </Link>
                </h1>
            </div>

            <div className="relative flex items-center gap-2">
                <Searchbar />
                
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
                                <Link href="/profile" className="font-semibold">
                                    Profile
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