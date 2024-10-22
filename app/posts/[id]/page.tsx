import Post from "@/app/posts/[id]/components/post";
import { PrismaClient } from "@prisma/client";
import { FaExclamationTriangle } from "react-icons/fa";

export default async function PostPage({
    params: {
        id
    }
}: {
    params: {
        id: string
    }
}) {
    const prisma = new PrismaClient();

    const post = await prisma.post.findUnique({
        where: {
            id: id
        },
        include: {
            author: true
        }
    });

    if (!post) {
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
                <Post data={post} />
            </div>
        </main>
    );
}