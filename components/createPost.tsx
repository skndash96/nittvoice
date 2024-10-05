"use client";
import { UserContext } from "@/lib/userContext";
import { useContext } from "react";

export default function CreatePost() {
    const { user } = useContext(UserContext);

    return (
        <div>
            <form className="py-8 px-4 flex flex-col gap-4">
                {!user && (
                    <p className="p-2 bg-amber-400/25 rounded-lg w-fit mx-auto text-center">Login before you can create a Post</p>
                )}

                <h1 className="text-lg font-semibold">
                    What&apos;s up?
                </h1>

                <input
                    className="input input-bordered"
                    type="text"
                    placeholder="Enter Title"
                />

                <input
                    className="file-input file-input-bordered"
                    type="file"
                    placeholder="Attach Image"
                />

                <textarea
                    className="min-h-32 pt-4 input input-bordered resize-y"
                    placeholder="Explain What's up? (optional)"
                />

                <button disabled={!user} className="w-fit mx-auto btn bg-accent">
                    Post
                </button>
            </form>
        </div>
    );
}