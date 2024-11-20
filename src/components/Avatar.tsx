import { User } from "../lib/types";
import { displayDateAge } from "../lib/utils";

export default function Avatar({
    author, timestamp
}: {
    author: User,
    timestamp?: Date
}) {
    return (
        <div className="flex items-center gap-1 text-sm">
            <div className="mr-2 w-9 aspect-square rounded-full grid place-items-center bg-neutral-200">
                {author?.name.split(" ").slice(0, 3).map((name) => name[0].toUpperCase())}
            </div>

            <div className="flex items-center gap-2">
                <span className="text-sm">
                    {author.id}
                </span>
                
                {timestamp && (
                    <>
                        <span>•</span>
                        <span className="text-sm opacity-75">
                            {displayDateAge(timestamp.toString())}
                        </span>
                    </>
                )}
            </div>
        </div>
    );
}