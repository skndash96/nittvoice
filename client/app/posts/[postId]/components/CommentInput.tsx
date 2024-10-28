import { NotifContext } from "@/app/context/notifContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Comment, FullComment } from "@/lib/types";
import axios from "axios";
import { useContext, useState } from "react";

export default function CommentInput({
    postId,
    onCommentAdd
}: {
    postId: string,
    onCommentAdd: (comment: FullComment) => void
}) {
    const { addNotif } = useContext(NotifContext);

    const [addCommentLoading, setAddCommentLoading] = useState(false);
    const [input, setInput] = useState("");

    const handleComment = () => {
        setAddCommentLoading(true);
        axios.post(`/api/comments`, {
            body: input,
            postId: postId
        })
            .then(({ data }: { data: FullComment }) => {
                onCommentAdd(data);
                setInput("");
            })
            .catch(error => {
                console.error(error);
                addNotif({
                    id: crypto.randomUUID(),
                    body: "Failed to comment",
                    type: "error"
                });
            })
            .finally(() => setAddCommentLoading(false));
    };

    return (
        <div className="flex items-center gap-2">
            <Input className="h-12 bg-white" onChange={e => setInput(e.currentTarget.value)} placeholder="What's your thought?" />

            <Button className="h-12" disabled={addCommentLoading} onClick={handleComment}>
                Send
            </Button>
        </div>
    );
}