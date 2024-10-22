"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UserContext } from "@/context/userContext";
import { useContext } from "react";
import { FiAlertCircle } from "react-icons/fi";

export default function CreatePost() {
    const { user } = useContext(UserContext);

    return (
        <div>
            <form className="py-8 px-4 flex flex-col gap-4">
                {!user && (
                    <div className="p-2 flex gap-2  items-center bg-amber-400/25 rounded-lg w-fit mx-auto text-center">
                        <FiAlertCircle className="text-amber-700" size={32} />
                        <p>Login before you can create a Post</p>
                    </div>
                )}

                <h1 className="text-lg font-semibold">
                    What&apos;s up?
                </h1>

                <Input
                    type="text"
                    placeholder="Enter Title"
                />

                <Input
                    type="file"
                    placeholder="Attach Image"
                />

                <Textarea
                    className="min-h-32 pt-4 input input-bordered resize-y"
                    placeholder="Explain What's up? (optional)"
                />

                <Button disabled={!user} className="w-fit mx-auto">
                    Post
                </Button>
            </form>
        </div>
    );
}