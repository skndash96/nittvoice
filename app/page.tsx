"use client";

import Post from "@/components/post";
import { PostType, toPost } from "@/lib/types";
import { createClient } from "@/lib/supabase";
import { useEffect, useState } from "react";

export default function Home() {
    const [posts, setPosts] = useState<PostType[]>([]);

    const getPosts = async () => {
        try {
            const supabase = createClient(); //no need token here

            const { data, error } = await supabase
                .from("posts")
                .select("*")
                .returns<PostType[]>();

            if (error) throw error;

            setPosts(data?.map(d => toPost(d)) || []);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        getPosts();
    }, []);
    
    return (
        <main>
            <ul className="py-4 flex flex-col gap-4">
                {posts.map(p => (
                    <li key={p.id} className="border-b-2 border-solid last:border-none">
                        <Post p={p} />
                    </li>
                ))}
            </ul>
        </main>
    );
}
