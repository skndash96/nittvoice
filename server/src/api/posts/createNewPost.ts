import { RequestHandler } from "express";
import getUser from "../actions/getUser";
import { PrismaClient } from "@prisma/client";
import { cloudinary, UPLOAD_PRESETS } from "../../lib/cloudinary";
import prisma from "../../prisma/client";

// POST /api/posts/
export const createNewPost: RequestHandler = async (req, res) => {
    const user = getUser(req);

    if (!user) {
        res.status(401).end("Please Login.");
        return;
    }
    
    const { title, body } = req.body;

    if (!title) {
        res.status(400).end("Title is required.");
        return;
    }

    if (title.length < 25) {
        res.status(400).end("Title must be at least 25 characters.");
        return;
    }

    try {
        const file = req.file;
        
        let url = null;

        if (file) {
            const type = req.file?.mimetype.split("/")[0];
            const size = file.size;

            if (type !== "image" && type !== "video") {
                throw new Error("Invalid file type");
            }

            //Size limitations
            //Image 5mb
            //Video 100mb
            if (size > 5 * 1024 * 1024 && type === "image") {
                throw new Error("Image too large");
            } else if (size > 100 * 1024 * 1024 && type === "video") {
                throw new Error("Video too large");
            }
    
            const b64 = Buffer.from(file.buffer).toString('base64');
            const dataURI = `data:${file.mimetype};base64,${b64}`;
    
            try {
                const result = await cloudinary.uploader.upload(dataURI, {
                    ...UPLOAD_PRESETS[type],
                    resource_type: type
                });

                url = result.secure_url;
            } catch (e: any) {
                console.error(e);

                res.status(500).end("Failed to upload file");
                return;
            }
        }

        const tx = [];

        const postId = crypto.randomUUID();

        tx.push(prisma.post.create({
            data: {
                id: postId,
                title,
                body,
                authorId: user.id
            }
        }));
        
        if (file && url) {
            tx.push(prisma.media.create({
                data: {
                    name: file.originalname,
                    size: file?.size,
                    type: file?.mimetype.split("/")[0],
                    url,
                    userId: user.id,
                    postId
                }
            }));
        }

        const _ = await prisma.$transaction(tx);

        res.status(200).send("Success");
    } catch (e: any) {
        console.log(e);

        res.status(500).end(e.message);
    }
};
