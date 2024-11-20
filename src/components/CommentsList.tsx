import { FaCommentAlt } from "react-icons/fa";
import CommentComponent from "./Comment";
import { FullComment } from "../lib/types";
import { useContext, useRef, useState } from "react";
import axios from "axios";
import { NotifContext } from "../contexts/notifContext";
import CommentInput from "./CommentInput";
import List from "./List";

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
        if (hasMore.current === false) return;

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
        <div className="h-full flex flex-col gap-2">
            <CommentInput postId={postId} onCommentAdd={(c) => setComments(prev => [c, ...prev])} />

            <div className="mt-4 grow overflow-y-auto">
                <List
                    data={comments}
                    Item={CommentComponent}
                    loading={loading}
                    skeletonHeight="sm"
                    EmptyDataComponent={() => (
                        <div className="flex flex-col items-center gap-2">
                            <FaCommentAlt className="text-4xl text-neutral-400" />
                            <p className="text-neutral-400">No Comments yet.</p>
                        </div>
                    )}
                    onEnd={handleEnd}
                />
            </div>
        </div>
    );
}