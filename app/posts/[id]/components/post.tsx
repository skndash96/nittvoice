"use client";
import Image from "next/image";
import Link from "next/link";
import { displayDateAge } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FaCommentAlt } from "react-icons/fa";
import { BsFillSendFill } from "react-icons/bs";
import { useContext, useState } from "react";
import { NotifContext } from "@/context/notifContext";
import axios from "axios";
import { FullPost } from "@/prisma/types";
import { PiArrowFatUp, PiArrowFatUpFill, PiArrowFatDown, PiArrowFatDownFill } from "react-icons/pi";

export default function PostComponent({
    data
}: {
    data: FullPost
}) {
    const [userVote, setUserVote] = useState<number>(data.votes[0]?.voteType);
    const { addNotif } = useContext(NotifContext);

    const handleVote = async (vote: number) => {
        const isDelete = userVote === vote;

        try {
            await axios.post("/api/vote", {
                postId: data.id,
                isUpvote: vote === 1,
                isDelete
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            setUserVote(isDelete ? 0 : vote);
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
        <div className="p-2 pb-6 flex flex-col gap-2">
            <div className="flex items-center gap-1 text-sm">
                <div className="mr-2 w-9 aspect-square rounded-full grid place-items-center bg-neutral-200">
                    {data.author?.name.split(" ").map((name) => name[0].toUpperCase())}
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-sm">
                        {data.authorId}
                    </span>
                    <span>•</span>
                    <span className="text-sm opacity-75">
                        {displayDateAge(data.createdAt!.toString())}
                    </span>
                </div>
            </div>

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

            <div className="px-2 flex items-center justify-between text-emerald-900">
                <div className="flex gap-2">
                    <div className="rounded-lg flex items-center">
                        <Button onClick={() => handleVote(1)} size="icon" variant="ghost" className="px-2 h-8 hover:bg-transparent hover:text-purple-600">
                            {
                                userVote === 1 ? (
                                    <PiArrowFatUpFill />
                                ) : (
                                    <PiArrowFatUp />
                                )
                            }
                        </Button>

                        <span>
                            {data.upvoteCount - data.downvoteCount}
                        </span>

                        <Button onClick={() => handleVote(-1)} size="icon" variant="ghost" className="px-2 hover:bg-transparent hover:text-sky-600">
                            {
                                userVote === -1 ? (
                                    <PiArrowFatDownFill />
                                ) : (
                                    <PiArrowFatDown />
                                )
                            }
                        </Button>
                    </div>

                    <Button size="lg" variant="ghost" className="px-2">
                        <FaCommentAlt />
                        1.2k
                    </Button>
                </div>

                <Button size="lg" variant="ghost" className="px-4">
                    <BsFillSendFill />
                    12
                </Button>
            </div>
        </div>
    );
}
