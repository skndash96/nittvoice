import { PrismaClient } from "@prisma/client";
import { RequestHandler } from "express";
import getUser from "../actions/getUser";

// GET /api/posts/
export const getPosts: RequestHandler = async (req, res) => {
    const prisma = new PrismaClient();
    
    const user = getUser(req);

    const { page: _page } = req.query;
    const page = parseInt(_page as string) || 1;
    const step = 20;

    if (page < 1) {
        res.status(400).end("Invalid page number");
        return;
    }
    
    try {
        const posts = await prisma.post.findMany({
            take: step,
            skip: (page - 1) * step,
            orderBy: {
                createdAt: "desc"
            },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        email: true
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
    
        res.json(posts).end();
    } catch (e: any) {
        console.log(e);

        res.status(500).end("Internal Server Error");
    }
};