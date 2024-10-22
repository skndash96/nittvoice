"use client";
import { useEffect, useState } from "react";
import { Post } from "@prisma/client"
import PostComponent from "./posts/[id]/components/post";

export default function Home() {
    const [posts, setPosts] = useState<Post[]>([]);

    const getPosts = async () => {
        try {
            const res = await fetch("/api/posts");
            const { success, message, data } = await res.json();

            if (!success) throw message;

            setPosts(data);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        getPosts();
    }, []);
    
    return (
        <main>
            <ul className="py-4 max-w-lg mx-auto flex flex-col gap-4">
                {posts.map(post => (
                    <li key={post.id} className="border-b-2 border-solid last:border-none">
                        <PostComponent data={post} />
                    </li>
                ))}
            </ul>
        </main>
    );
}
