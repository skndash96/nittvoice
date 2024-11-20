;
import { Link } from "wouter";
import { useContext, useState } from "react";
import { NotifContext } from "../contexts/notifContext";
import axios from "axios";
import { FullPost } from "../lib/types";
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
                body: error.response.data
            });
        }
    };

    return (
        <div className="p-2 flex flex-col gap-2">
            <Link href={`/profiles/${data.author.id}`}>
                <Avatar author={data.author} timestamp={data.createdAt} />
            </Link>

            <Link href={`/posts/${data.id}`}>
                <h3 className="font-semibold text-lg break-words">
                    {data.title}
                </h3>
            </Link>

            {data.media && (
                <ul className="mt-2">
                    {data.media.map(m => (
                        <li key={m.url}>
                            {m.type === "video" ? (
                                <video
                                    src={m.url}
                                    className="object-contain w-full h-full"
                                    controls={true}
                                />
                            ) : (
                                <div className="relative w-full h-72 rounded-xl overflow-hidden shadow-sm bg-neutral-200">
                                    <img
                                        src={m.url}
                                        alt={data.title}
                                        className="absolute opacity-50 object-cover object-center blur-lg"
                                        loading="lazy"
                                    />
                                    <img
                                        src={m.url}
                                        alt={data.title}
                                        loading="lazy"
                                        className="absolute h-full left-1/2 -translate-x-1/2 object-contain"
                                    />
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}

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
