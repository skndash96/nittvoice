import { FaInbox } from "react-icons/fa";
import { FullPost } from "../lib/types";
import List from "./List";
import PostComponent from "./Post";

export default function PostsList({
    data,
    loading,
    onEnd
}: {
    data: FullPost[],
    loading: boolean,
    onEnd: () => void
}) {
    const NoPosts = () => (
        <div className="flex flex-col items-center justify-center text-neutral-400">
            <FaInbox size={48} />
            <p className="mt-2">No posts yet</p>
        </div>
    );

    return (
        <List
            data={data}
            Item={PostComponent}
            loading={loading}
            skeletonHeight="lg"
            EmptyDataComponent={NoPosts}
            onEnd={onEnd}
        />
    );
}