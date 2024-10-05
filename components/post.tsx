import { PostType } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { BiDownArrow, BiShareAlt, BiUpArrow } from "react-icons/bi";

export default function Post({
    p
}: {
    p: PostType
}) {
    return (
        <div className="p-2 flex flex-col gap-2 pb-4">
            <div className="flex items-center gap-1 text-sm">
                <div className="w-6 h-6 rounded-full bg-neutral/50"></div>
                {p.userId}

                <span className="mx-1">•</span>

                <span className="text-sm opacity-75">
                    {displayDate(p.createdAt)}
                </span>
            </div>

            <Link href={`/posts/${p.id}`}>
                <h3 className="font-semibold text-lg">
                    {p.title}
                </h3>

                <div className="mt-2 relative w-full h-72 rounded-xl shadow-sm overflow-hidden bg-neutral/10">
                    <Image
                        fill
                        src={p.media}
                        alt={p.title}
                        className="opacity-25 blur-lg"
                    />
                    <Image
                        fill
                        src={p.media}
                        alt={p.title}
                        className="object-contain shadow-xl"
                    />
                </div>
            </Link>

            {p.body && (
                <p className="leading-5 font-sans">
                    {p.body}
                </p>
            )}

            <div className="mt-2 flex flex-row items-center gap-2">
                <div className="flex items-center bg-neutral/10 rounded-lg">
                    <button className="btn btn-sm btn-square btn-ghost">
                        <BiUpArrow size={14} />
                    </button>
                    <span className="px-1 text-sm">
                        {p.votes > 0 && (p.votes) || 0}
                    </span>
                    <button className="btn p-0 btn-sm btn-square btn-ghost">
                        <BiDownArrow size={14} />
                    </button>
                </div>
                <button className="btn btn-sm btn-square btn-ghost hover:shadow-md">
                    <BiShareAlt size={18} />
                </button>
            </div>
        </div>
    );
}

function displayDate(old: Date) {
    const now = new Date();
    let val = (now.valueOf() - old.valueOf()) / 1000;
    let unit = "s";

    if (val / 60 > 1) {
        val = val / 60;
        unit = "m";

        if (val / 60 > 1) {
            val = val / 60;
            unit = "h";

            if (val / 24 > 1) {
                val = val / 24;
                unit = "d";

                if (val / 7 > 1) {
                    val = val / 7;
                    unit = "w";

                    if (val / 4 > 1) {
                        val = val / 4;
                        unit = "mo";

                        if (val / 12 > 1) {
                            val = val / 12;
                            unit = "y";
                        }
                    }
                }
            }
        }
    }

    val = Math.floor(val);

    return `${val}${unit} ago`;
} 