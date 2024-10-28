import { FaCommentAlt } from "react-icons/fa";
import CardSkeleton from "./CardSkeleton";
import CommentComponent from "./Comment";
import { FullComment } from "@/lib/types";
import End from "./End";
import { use, useContext, useRef, useState } from "react";
import axios from "axios";
import { NotifContext } from "@/app/context/notifContext";
import CommentInput from "./CommentInput";

export default function CommentsList({
    postId
}: {
    postId: string
}) {
    const { addNotif } = useContext(NotifContext);

    const [comments, setComments] = useState<FullComment[]>([]);
    const [loading, setLoading] = useState(true);
    const page = useRef(1);
    const hasMore = useRef(true);

    const handleEnd = () => {
        setLoading(true);

        axios.get(`/api/posts/${postId}/comments?page=${page.current}`)
            .then(({ data }) => {
                if (data.length === 0) {
                    hasMore.current = false;
                } else {
                    setComments([...comments, ...data]);
                    page.current = page.current + 1;
                }
            })
            .catch(e => {
                console.error(e);
                addNotif({
                    id: crypto.randomUUID(),
                    body: "Failed to fetch comments",
                    type: "error"
                });
            })
            .finally(() => setLoading(false));
    };

    return (
        <div className="flex flex-col gap-2">
            <CommentInput postId={postId} onCommentAdd={(c) => setComments(prev => [c, ...prev])} />

            <ul className="mt-4">
                {comments.map(comment => (
                    <CommentComponent data={comment} key={comment.id} />
                ))}
            </ul>

            <End onReach={handleEnd} />

            <div className="-mt-8">
                {loading && (
                    new Array(2).fill(null).map((_, i) => (
                        <CardSkeleton cardHeight="sm" key={i} />
                    ))
                )}
            </div>

            {!loading && comments.length === 0 && (
                <div className="flex flex-col items-center gap-2">
                    <FaCommentAlt className="text-4xl text-neutral-400" />
                    <p className="text-neutral-400">No data yet</p>
                </div>
            )}
        </div>
    );
}