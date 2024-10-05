import Post from "@/components/post";
import { PostType, toPost } from "@/lib/types";
import { createClient } from "@/lib/supabase";
import { redirect } from "next/navigation";

export default async function PostPage({
    params: {
        id
    }
}: {
    params: {
        id: string
    }
}) {
    const supabase = createClient();

    const { data: _data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("id", id).single<PostType>();

    if (error) {
        console.error(error);
        redirect("/not-found");
        return;
    }

    const data = toPost(_data);

    return (
        <main className="p-4">
            <div className="">
                <Post p={data} />
            </div>
        </main>
    );
}