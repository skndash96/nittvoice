"use client";
import { useContext, useRef, useState } from "react";
import axios from "axios";
import { NotifContext } from "@/app/context/notifContext";
import PostComponent from "./[postId]/components/Post";
import { FullPost } from "@/lib/types";
import CardSkeleton from "./[postId]/components/CardSkeleton";
import End from "./[postId]/components/End";

export default function Home() {
    const { addNotif } = useContext(NotifContext);

    const [posts, setPosts] = useState<FullPost[]>([]);
    const [loading, setLoading] = useState(true);
    const page = useRef(1);
    const hasMore = useRef(true);

    const getPosts = () => {
        setLoading(true);

        axios.get("/api/posts?page=" + page.current)
            .then(({ data }) => {
                if (data.length === 0) {
                    hasMore.current  = false;
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
            getPosts();
        }
    };

    return (
        <main className="px-2 py-4 grow w-full max-w-lg mx-auto">
            <ul className="flex flex-col gap-4">
                {posts.map(post => (
                    <li key={post.id} className="">
                        <PostComponent data={post} />
                    </li>
                ))}
            </ul>

            <End onReach={handleEnd} />
            
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
