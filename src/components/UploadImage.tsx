import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaTrash, FaLink } from 'react-icons/fa';
import { Button } from './ui/button';
import { Input } from './ui/input';

export default function UploadImage({
    file, setFile
}: {
    file: File | null;
    setFile: (file: File | null) => void;
}) {
    const [dropping, setDropping] = useState(false);

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const onDropIn: React.DragEventHandler<HTMLLabelElement> = (e) => {
        e.preventDefault();
        setDropping(true);
    };

    const onDropOut: React.DragEventHandler<HTMLLabelElement> = (e) => {
        e.preventDefault();
        setDropping(false);
    };

    const onDrop: React.DragEventHandler<HTMLLabelElement> = (e) => {
        e.preventDefault();
        setDropping(false);

        const file = e.dataTransfer?.files?.[0];
        if (!file) return;

        setFile(file);
    };

    return (
        <AnimatePresence>
            {file ? (
                <motion.div
                    key="upload-preview"
                    transition={{ duration: 0.2 }}
                    exit={{ opacity: 0, height: 0 }}
                    className="w-fit mx-auto relative border border-emerald-400"
                >
                    {file.type.startsWith("image") ? (
                        <img src={URL.createObjectURL(file)} alt="Preview" width={400} className="w-full h-64 object-contain rounded-lg" />
                    ) : (
                        <video src={URL.createObjectURL(file)} controls width={400} height={300} className="w-full h-64 object-cover rounded-lg" />
                    )}

                    <Button onClick={() => setFile(null)} className="absolute bottom-2 right-2 self-end w-fit text-neutral-300 bg-neutral-900 hover:bg-neutral-900 hover:text-red-500" size="sm" variant="destructive">
                        <FaTrash />
                    </Button>
                </motion.div>
            ) : (
                <motion.div
                    key="upload-drop"
                    transition={{ duration: 0.2 }}
                    exit={{ opacity: 0 }}
                    className="w-full flex"
                >
                    <label
                        htmlFor="file"
                        onDrop={onDrop}
                        onDragEnter={onDropIn}
                        onDragLeave={onDropOut}
                        onDragOver={onDropIn}
                        className={`cursor-pointer p-2 w-full mx-auto px-4 py-12 border-2 border-emerald-500 border-dashed flex justify-center items-center gap-2 ${dropping ? "bg-emerald-200" : ""}`}
                    >
                        <FaLink className="w-6 h-6 text-emerald-500" />
                        <span> Upload or drop here </span>
                    </label>

                    <Input
                        id="file"
                        onChange={handleFile}
                        type="file"
                        accept="image/webp, image/jpeg, image/png, image/gif, video/mp4, video/webm"
                        placeholder="Attach Image"
                        className="h-0 p-0 w-0"
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
};