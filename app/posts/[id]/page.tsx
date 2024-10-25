import { Post } from "@prisma/client";
import axios from "axios";
import { FaExclamationTriangle } from "react-icons/fa";
import PostComponent from "./components/post";
import { redirect } from "next/navigation";
import { FullPost } from "@/prisma/types";

export default async function PostPage({
    params: {
        id
    }
}: {
    params: {
        id: string
    }
}) {
    try {
        const { data } = await axios.get<FullPost>(`/api/posts/${id}`);
    
        if (!data) {
            return (
                <main className="flex flex-col items-center justify-center h-screen bg-gray-100">
                    <div className="flex items-center text-red-500">
                        <FaExclamationTriangle className="text-6xl mr-4" />
                        <h1 className="text-2xl font-bold">Post Not Found</h1>
                    </div>
                    
                    <p className="mt-4 text-gray-600">The post you are looking for does not exist or has been removed.</p>
                </main>
            );
        }
    
        return (
            <main className="p-4">
                <div className="">
                    <PostComponent data={data} />
                </div>
            </main>
        );
    } catch (error) {
        console.log(error);
        return redirect("/500");
    }
}