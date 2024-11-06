;
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { UserContext } from "../contexts/userContext";
import { ChangeEventHandler, FormEventHandler, useContext, useState } from "react";
import { FiAlertCircle } from "react-icons/fi";
import { NotifContext } from "../contexts/notifContext";
import axios from "axios";
import { FaLink } from "react-icons/fa";
import { Skeleton } from "./ui/skeleton";

export default function CreatePostForm() {
    const { user } = useContext(UserContext);
    const { addNotif } = useContext(NotifContext);

    const [title, setTitle] = useState<string>("");
    const [body, setBody] = useState<string>("");
    const [file, setFile] = useState<File | null>(null);

    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);

    const createPreview = (file: File | null) => {
        if (!file) {
            setPreview(null);
            return;
        }

        const reader = new FileReader();

        reader.onloadend = () => {
            setPreview(reader.result);
        };

        reader.readAsDataURL(file);
    };

    const handleFile: ChangeEventHandler<HTMLInputElement> = (e) => {
        const file = e.target.files?.[0] || null;
        setFile(file);
        createPreview(file);
    };

    const handleSubmit: FormEventHandler = async (e) => {
        e.preventDefault();

        if (title.length < 25) {
            addNotif({
                id: crypto.randomUUID(),
                type: "error",
                body: "Title must be at least 25 characters"
            });
            return;
        }

        const formData = new FormData();

        formData.append("title", title);
        formData.append("body", body);

        if (file) {
            const type = file.type.split('/')[0];

            try {
                if (!["image", "video"].includes(type)) {
                    throw new Error("Invalid file type");
                } else if (file.type.startsWith("image") && file.size > 5 * 1024 * 1024) {
                    throw new Error("Image too large");
                } else if (file.type.startsWith("video") && file.size > 100 * 1024 * 1024) {
                    throw new Error("Video too large");
                }
            } catch (e: any) {
                addNotif({
                    id: crypto.randomUUID(),
                    type: 'error',
                    body: e.message
                });

                return;
            }

            formData.append("file", file);
        }

        try {
            setUploading(true);
            await axios.post("/api/posts", formData);
            setTitle("");
            setBody("");
            setPreview(null);

            addNotif({
                id: crypto.randomUUID(),
                type: "success",
                body: "Post created successfully"
            });
        } catch (e: any) {
            addNotif({
                id: crypto.randomUUID(),
                type: 'error',
                body: e.response.data
            });
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="py-8">
            {!user && (
                <div className="mb-4 p-2 flex gap-2  items-center bg-amber-400/25 rounded-lg w-fit mx-auto text-center">
                    <FiAlertCircle className="text-amber-700" size={32} />
                    <p>Login before you can create a Post</p>
                </div>
            )}

            <div className="grid md:grid-cols-2 gap-8">
                <form className="px-4 flex flex-col gap-4">
                    <h1 className="text-lg font-semibold">
                        What&apos;s up?
                    </h1>

                    <Input
                        type="text"
                        placeholder="Enter Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <Textarea
                        className="min-h-32 pt-4 input input-bordered resize-y"
                        placeholder="Explain What's up? (optional)"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    />

                    <div className="flex justify-between items-center">
                        <div className="flex">
                            <label htmlFor="file" className="cursor-pointer flex items-center gap-2">
                                <FaLink className="w-6 h-6 text-emerald-500" />
                                Attach
                            </label>

                            <Input
                                id="file"
                                onChange={handleFile}
                                type="file"
                                accept="image/webp, image/jpeg, image/png, image/gif, video/mp4, video/webm"
                                placeholder="Attach Image"
                                className="h-0 p-0 w-0"
                            />
                        </div>

                        <Button disabled={!user || uploading} onClick={handleSubmit} className="w-fit ml-auto">
                            {uploading ? "Uploading..." : "Post"}
                        </Button>
                    </div>
                </form>

                <div className="px-4">
                    <h1 className="text-lg font-bold">
                        Preview
                    </h1>

                    <div className="mt-4 p-4 flex flex-col gap-2 border-2 border-emerald-500 border-dashed rounded-lg">
                        <h2 className="text-lg font-semibold">
                            {title.length ? title : (
                                <Skeleton className="w-full h-4" />
                            )}
                        </h2>

                        <p>
                            {body.length || title.length ? body : (
                                <div className="mt-4 flex flex-col gap-2">
                                    <Skeleton className="w-1/2 h-2" />
                                    <Skeleton className="w-3/4 h-2" />
                                    <Skeleton className="w-1/4 h-2" />
                                </div>
                            )}
                        </p>
                        
                        {preview && (
                            file?.type.startsWith("video") ? (
                                // @ts-ignore
                                <video src={preview} controls />
                            ) : (
                                // @ts-ignore
                                <img src={preview} alt="Preview" />
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}