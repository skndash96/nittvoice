import { PrismaClient } from "@prisma/client";
import { RequestHandler } from "express";
import getUser from "../actions/getUser";
import prisma from "../../prisma/client";

// GET /api/posts/:postId/
export const getSinglePost : RequestHandler = async (req, res) => {
    const user = getUser(req);

    const { postId } = req.params;

    try {
        const post = await prisma.post.findUnique({
            where: {
                id: postId
            },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    }
                },
                votes: {
                    take: user ? 1 : 0,
                    where: {
                        commentId: null,
                        voterId: user?.id
                    }
                },
                media: {
                    select: {
                        url: true,
                        type: true
                    }
                }
            }
        });

        res.json(post).end();
    } catch (e) {
        console.log(e);

        res.status(500).end("Internal Server Error");
    }
};