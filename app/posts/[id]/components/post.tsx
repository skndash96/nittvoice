"use client";
import Image from "next/image";
import Link from "next/link";
import { Post } from "@prisma/client";
import { displayDateAge } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MdEmojiEmotions } from "react-icons/md";
import { FaCommentAlt } from "react-icons/fa";
import { BsFillSendFill } from "react-icons/bs";

export default function PostComponent({
    data
}: {
    data: Post
}) {
    return (
        <div className="p-2 flex flex-col gap-2 pb-4">
            <div className="flex items-center gap-1 text-sm">
                <div className="mr-2 w-9 aspect-square rounded-full grid place-items-center bg-neutral-200">
                    {/* @ts-ignore */}
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
                    <Button size="lg" variant="ghost" className="px-2">
                        <MdEmojiEmotions className="" />
                        40
                    </Button>
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
