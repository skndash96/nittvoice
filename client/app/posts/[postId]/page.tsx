"use client";
import axios from "axios";
import PostComponent from "./components/Post";
import { FullComment, FullPost } from "@/lib/types";
import { FaExclamationTriangle } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { NotifContext } from "@/app/context/notifContext";
import CardSkeleton from "./components/CardSkeleton";
import CommentsList from "./components/CommentsList";
import CommentInput from "./components/CommentInput";

export default function PostPage() {
    const { postId: _postId } = useParams();
    const postId = typeof _postId === "object" ? _postId[0] : _postId;

    const { addNotif } = useContext(NotifContext);

    const [post, setPost] = useState<FullPost | null>(null);
    const [comments, setComments] = useState<FullComment[]>([]);

    const [postLoading, setPostLoading] = useState(true);
    const [commentsLoading, setCommentsLoading] = useState(true);

    useEffect(() => {
        axios.get("/api/posts/" + postId)
            .then(({ data }) => {
                setPost(data);
            })
            .catch(e => {
                console.error(e);
                addNotif({ type: "error", body: "Failed to fetch post.", id: crypto.randomUUID() });
            })
            .finally(() => setPostLoading(false));

        axios.get(`/api/posts/${postId}/comments`)
            .then(({ data }) => {
                setComments(data);
            })
            .catch(e => {
                console.error(e);
                addNotif({ type: "error", body: "Failed to fetch comments.", id: crypto.randomUUID() });
            })
            .finally(() => setCommentsLoading(false));
    }, []);

    return (
        <main className="p-4 grow flex flex-col">
            {postLoading ? (
                <CardSkeleton cardHeight="lg" />
            ) : post ? (
                <>
                    <PostComponent showComments={false} data={post} />

                    <div className="mt-8 p-4">
                        <h1 className="mb-2 font-semibold text-lg"> Comments </h1>
                        <CommentsList postId={postId} />
                    </div>
                </>
            ) : (
                <div className="flex items-center text-red-500">
                    <div className="flex items-center text-red-500">
                        <FaExclamationTriangle className="text-6xl mr-4" />
                        <h1 className="text-2xl font-bold">Post Not Found</h1>
                    </div>

                    <p className="mt-4 text-gray-600">The post you are looking for does not exist or has been removed.</p>
                </div>
            )}
        </main>
    );
}