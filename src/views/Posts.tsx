import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { NotifContext } from "../contexts/notifContext";
import PostComponent from "../components/Post";
import { FullPost } from "../lib/types";
import CardSkeleton from "../components/CardSkeleton";
import End from "../components/End";
import { Button } from "../components/ui/button";
import { FaClock, FaFire, FaInbox } from "react-icons/fa";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { SearchContext } from "../contexts/searchContext";

export default function Posts() {
    const { addNotif } = useContext(NotifContext);

    const [posts, setPosts] = useState<FullPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [cat, setCat] = useState<"recent" | "hot">("recent");
    const { searchTerm, setSearchTerm } = useContext(SearchContext);
    const [time, setTime] = useState<string>("d");
    const page = useRef(1);
    const hasMore = useRef(true);

    const resetSearch = () => {
        setSearchTerm("");
    };

    const getPosts = (reset: boolean) => {
        if (reset) page.current = 1;

        setLoading(true);
        if (reset) setPosts([]);

        axios.get(`/api/posts?page=${page.current}&cat=${cat}&time=${time}&q=${searchTerm}`)
            .then(({ data }) => {
                if (data.length === 0) {
                    hasMore.current = false;
                } else {
                    setPosts(prev => [...prev, ...data]);
                    page.current = page.current + 1;
                }
            })
            .catch(error => {
                console.log(error, error.message);

                addNotif({
                    id: crypto.randomUUID(),
                    body: "Failed to fetch posts",
                    type: "error"
                });
            })
            .finally(() => setLoading(false));
    };

    const handleEnd = () => {
        if (hasMore.current) {
            getPosts(false);
        }
    };

    useEffect(() => {
        hasMore.current = true;
        getPosts(true);
    }, [cat, time, searchTerm]);

    return (
        <main className="px-2 pb-24 grow w-full max-w-lg mx-auto relative min-h-[150vh]">
            <div className="mt-2 mb-4 px-2 flex font-semibold">
                <Button onClick={() => setCat("recent")} className={`px-0 flex items-center gap-1 text-neutral-400 shadow-none ${cat === "recent" ? "text-emerald-700 opacity-100" : ""} hover:bg-transparent`} variant="ghost">
                    <FaClock />
                    Recent
                </Button>

                <Button onClick={() => setCat("hot")} className={`ml-4 px-0 flex items-center gap-1 text-neutral-400 shadow-none ${cat === "hot" ? "text-emerald-700 opacity-100" : ""} hover:bg-transparent`} variant="ghost">
                    <FaFire />
                    Hot
                </Button>

                {cat === "hot" && (
                    <Select value={time} onValueChange={v => setTime(v)}>
                        <SelectTrigger className="p-0 ml-4 focus:outline-none focus:border-none border-none shadow-none text-black w-fit font-normal">
                            <SelectValue className="p-0">
                                {
                                    time === "d" ? "Today" :
                                        time === "w" ? "This Week" :
                                            time === "m" ? "This Month" :
                                                "All Time"
                                }
                            </SelectValue>
                        </SelectTrigger>

                        <SelectContent defaultValue="d">
                            <SelectItem value="d">Today</SelectItem>
                            <SelectItem value="w">This Week</SelectItem>
                            <SelectItem value="m">This Month</SelectItem>
                            <SelectItem value="t">All Time</SelectItem>
                        </SelectContent>
                    </Select>
                )}
            </div>

            <p className="text-sm mb-4 opacity-75">
                {loading
                    ? "Loading..."
                    : searchTerm ? (
                        <>
                            Showing posts for
                            <span className="font-semibold"> "{searchTerm}"</span>
                            <Button
                                variant="outline"
                                className="p-0 text-red-500 w-6 h-6 border-none"
                                onClick={resetSearch}
                            >
                                x
                            </Button>
                        </>
                    )
                    : null
                }
            </p>

            <ul className="flex flex-col gap-4">
                {posts.map(post => (
                    <li key={post.id} className="">
                        <PostComponent data={post} />
                    </li>
                ))}
                {posts.length === 0 && !loading && (
                    <div className="flex flex-col items-center justify-center text-neutral-400">
                        <FaInbox size={48} />
                        <p className="mt-2">No posts found</p>
                    </div>
                )}
            </ul>

            <div className="absolute z-10 left-0 right-0 bottom-0">
                <End onReach={handleEnd} />
            </div>

            {loading && (
                <div className="flex flex-col gap-4">
                    {new Array(3).fill(null).map((_, i) => (
                        <CardSkeleton cardHeight="lg" key={i} />
                    ))}
                </div>
            )}
        </main>
    );
}