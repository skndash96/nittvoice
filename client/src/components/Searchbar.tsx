import useMediaQuery from "../hooks/useMediaQuery";
import { FiSearch } from "react-icons/fi";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { FormEventHandler, useContext, useEffect, useState } from "react";
import { SearchContext } from "../contexts/searchContext";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "./ui/dropdown-menu";

interface SearchInputProps {
    q: string;
    setQ: (q: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ q, setQ }) => {    
    const { searchTerm } = useContext(SearchContext);

    useEffect(() => {
        setQ(searchTerm);
    }, [searchTerm]);

    return (
        <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary" />

            <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="pl-10 bg-neutral-100 peer transition-all border-none outline-none shadow-none"
                placeholder="Search"
            />
        </div>
    );
};

export default function Searchbar() {
    const isLargeScreen = useMediaQuery("(min-width: 640px)");
    const { setSearchTerm } = useContext(SearchContext);
    const [q, setQ] = useState<string>("");

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        setSearchTerm(q);
    };

    return (
        <div className="relative">
            {isLargeScreen ? (
                <form onSubmit={handleSubmit}>
                    <SearchInput
                        q={q}
                        setQ={setQ}
                    />
                </form>
            ) : (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="">
                            <FiSearch className="text-primary" />
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="max-w-72">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                            <SearchInput
                                q={q}
                                setQ={setQ}
                            />
                            {q && (
                                <Button variant="secondary" disabled={!q} type="submit" className="w-full">
                                    Search {q && `for "${q}"`}
                                </Button>
                            )}
                        </form>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </div>
    );
}