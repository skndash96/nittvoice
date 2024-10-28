"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BsFillSendFill } from "react-icons/bs";
import { useContext, useState } from "react";
import { NotifContext } from "@/app/context/notifContext";
import axios from "axios";
import { PiArrowFatUp, PiArrowFatUpFill, PiArrowFatDown, PiArrowFatDownFill } from "react-icons/pi";
import { FullPost } from "@/lib/types";
import Avatar from "./Avatar";
import VoteMenu from "./VoteMenu";
import Share from "./Share";
import CommentsDrawer from "./CommentsDrawer";

export default function PostComponent({
    data,
    showComments = true
}: {
    data: FullPost,
    showComments?: boolean
}) {
    const [userVote, setUserVote] = useState<number>(data.votes[0]?.voteType || 0);
    const [postVote, setPostVote] = useState<number>(data.upvoteCount - data.downvoteCount);

    const { addNotif } = useContext(NotifContext);

    const handleVote = async (vote: number) => {
        const isDelete = userVote === vote;

        try {
            await axios.post(`/api/posts/${data.id}/vote`, {
                isUpvote: vote === 1,
                isDelete
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            setUserVote(isDelete ? 0 : vote);
            setPostVote(prev => prev + (isDelete ? -vote : -userVote + vote));
        } catch (error: any) {
            console.log(error, error.message);

            addNotif({
                id: crypto.randomUUID(),
                type: "error",
                body: error.response.data.error
            });
        }
    };

    return (
        <div className="p-2 flex flex-col gap-2">
            <Avatar author={data.author} timestamp={data.createdAt} />

            <Link href={`/posts/${data.id}`}>
                <h3 className="font-semibold text-lg">
                    {data.title}
                </h3>

                {data.media && (
                    <div className="mt-2 relative w-full h-72 rounded-xl shadow-sm overflow-hidden bg-neutral/10">
                        <Image
                            src={data.media}
                            alt={data.title}
                            fill
                            sizes="80vw 50vh"
                            className="opacity-50 object-center blur-lg"
                            loading="lazy"
                        />
                        <Image
                            fill
                            src={data.media}
                            alt={data.title}
                            loading="lazy"
                            className="object-contain shadow-xl"
                        />
                    </div>
                )}
            </Link>

            {data.body && (
                <p className="leading-5 font-sans">
                    {data.body}
                </p>
            )}

            <div className="flex items-center justify-between text-emerald-900">
                <div className="flex gap-4">
                    <VoteMenu userVote={userVote} postVote={postVote} handleVote={handleVote} />

                    {showComments && (
                        <CommentsDrawer commentCount={data.commentCount || 0} postId={data.id} />
                    )}
                </div>

                <Share link={`/posts/${data.id}`} />
            </div>
        </div>
    );
}
