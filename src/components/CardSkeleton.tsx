import { Skeleton } from "../components/ui/skeleton";

export default function CardSkeleton({
    cardHeight,
    avatarSize = "sm"
}: {
    avatarSize?: "sm" | "lg",
    cardHeight: "sm" | "lg"
}) {
    return (
        <div className="">
            <div className="flex gap-4 items-center">
                <Skeleton className={`w-12 h-12 rounded-full ${avatarSize === "sm" ? "w-8 h-8" : ""}`} />
                <Skeleton className="w-1/2 h-2" />
            </div>
            <div className="mt-2">
                <Skeleton className={`w-full ${cardHeight === "sm" ? "h-20" : "h-60"}`} />
            </div>
        </div>
    )
}