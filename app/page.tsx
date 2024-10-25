"use client";
import { useContext, useEffect, useState } from "react";
import { Post } from "@prisma/client"
import PostComponent from "./posts/[id]/components/post";
import axios from "axios";
import { NotifContext } from "@/context/notifContext";

export default function Home() {
    const { addNotif } = useContext(NotifContext);

    const [posts, setPosts] = useState<Post[]>([]);

    const getPosts = () => {
        axios.get("/api/posts")
        .then(({ data }) => setPosts(data))
        .catch(error => {
            console.log(error, error.message);
            addNotif({
                id: crypto.randomUUID(),
                body: "Failed to fetch posts",
                type: "error"
            });
        });
    };

    useEffect(() => {
        getPosts();
    }, []);
    
    return (
        <main>
            <ul className="py-4 max-w-lg mx-auto flex flex-col">
                {posts.map(post => (
                    <li key={post.id} className="">
                        <PostComponent data={post} />
                    </li>
                ))}
            </ul>
        </main>
    );
}
