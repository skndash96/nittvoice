import { Button } from "@/components/ui/button";
import { NotifContext } from "@/app/context/notifContext";
import { FullComment } from "@/lib/types";
import { displayDateAge } from "@/lib/utils";
import axios from "axios";
import { useContext, useState } from "react";
import { PiArrowFatDown, PiArrowFatDownFill, PiArrowFatUp, PiArrowFatUpFill } from "react-icons/pi";
import Avatar from "./Avatar";
import VoteMenu from "./VoteMenu";
import Share from "./Share";

export default function CommentComponent({
    data
}: {
    data: FullComment
}) {
    const [userVote, setUserVote] = useState<number>(data.votes?.find(v => v.commentId === data.id)?.voteType || 0);
    const [commentVote, setCommentVote] = useState<number>(data.upvoteCount - data.downvoteCount);
    const { addNotif } = useContext(NotifContext);

    const handleVote = (vote: number) => {
        const isDelete = userVote === vote;

        axios.post(`/api/comments/${data.id}/vote`, {
            isDelete: isDelete,
            isUpvote: vote === 1
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(() => {
            setUserVote(isDelete ? 0 : vote);
            setCommentVote(prev => prev - userVote + vote);
            addNotif({
                id: crypto.randomUUID(),
                body: isDelete ? "Vote removed" : `Voted ${vote === 1 ? "up" : "down"}`,
                type: "success"
            });
        })
        .catch(e => {
            addNotif({
                id: crypto.randomUUID(),
                body: e.response.data,
                type: "error"
            });
        });
    };

    return (
        <div key={data.id} className="p-2 bg-white shadow-md rounded-lg">
            <Avatar author={data.author} timestamp={data.createdAt} />

            <p>
                {data.body}
            </p>

            <div className="flex items-center justify-between text-emerald-900">
                <VoteMenu userVote={userVote} postVote={commentVote} handleVote={handleVote} />

                <Share link={`/posts/${data.postId}?comment=${data.id}`} />
            </div>
        </div>
    );
}