;
import { Button } from "../components/ui/button";
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from "../components/ui/drawer";
import { FaCommentAlt } from "react-icons/fa";
import CommentsList from "./CommentsList";

export default function CommentsDrawer({
    postId,
    commentCount
}: {
    postId: string,
    commentCount: number
}) {
    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button size="lg" variant="ghost" className="px-2">
                    <FaCommentAlt />
                    {commentCount}
                </Button>
            </DrawerTrigger>

            <DrawerContent className="p-4 w-full max-w-2xl mx-auto flex flex-col bg-neutral-100 h-[75vh]">
                <DrawerTitle className="mb-4"> Comments </DrawerTitle>

                <CommentsList postId={postId} />
            </DrawerContent>
        </Drawer>
    );
}