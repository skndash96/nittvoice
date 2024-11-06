import { RequestHandler } from "express";
import getUser from "../actions/getUser";
import { PrismaClient } from "@prisma/client";
import prisma from "../../prisma/client";

// POST /api/comments/
export const createComment: RequestHandler = async (req, res) => {
    try {
        const user = getUser(req);

        if (!user) {
            res.status(401).end('Please Login');
            return;
        }

        const {
            body,
            postId
        } = req.body;

        const comment = await prisma.comment.create({
            data: {
                body,
                authorId: user.id,
                postId
            },
            include: {
                author: true,
                post: true,
                votes: {
                    take: 0
                }
            }
        });

        await prisma.post.update({
            where: {
                id: postId
            },
            data: {
                commentCount: {
                    increment: 1
                }
            }
        });

        res.json(comment).end();
    } catch (e) {
        console.log(e);

        res.status(500).end('Internal Server Error');
    }
};