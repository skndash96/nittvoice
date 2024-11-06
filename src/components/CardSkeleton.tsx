import { Skeleton } from "../components/ui/skeleton";

export default function CardSkeleton({
    cardHeight
}: {
    cardHeight: "sm" | "lg"
}) {
    return (
        <div className="">
            <div className="flex gap-4 items-center">
                <Skeleton className="w-8 h-8 rounded-full" />
                <Skeleton className="w-1/2 h-2" />
            </div>
            <div className="mt-2">
                <Skeleton className={`w-full ${cardHeight === "sm" ? "h-20" : "h-60"}`} />
            </div>
        </div>
    )
}