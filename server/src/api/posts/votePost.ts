import { RequestHandler } from "express";
import getUser from "../actions/getUser";
import { PrismaClient } from "@prisma/client";
import prisma from "../../prisma/client";

// POST /api/posts/:postId/vote
export const votePost: RequestHandler = async (req, res) => {
    try {

        const { postId } = req.params;

        const user = getUser(req);

        const {
            isUpvote,
            isDelete
        } = req.body;

        if (!user) {
            res.status(400).end("Please Login");
            return;
        }

        const prevVote = await prisma.vote.findUnique({
            where: {
                voterId_postId: {
                    voterId: user.id,
                    postId
                }
            }
        });

        if (!prevVote && isDelete) {
            res.status(400).end("Vote does not exist");
            return;
        }

        const tx = [];

        if (isDelete) {
            tx.push(
                prisma.vote.delete({
                    where: {
                        voterId_postId: {
                            voterId: user.id,
                            postId: postId
                        }
                    }
                })
            );
        } else {
            if (prevVote) {
                tx.push(
                    prisma.vote.update({
                        data: {
                            voteType: isUpvote ? 1 : -1
                        },
                        where: {
                            voterId_postId: {
                                voterId: user.id,
                                postId
                            }
                        }
                    })
                );
            } else {
                tx.push(
                    prisma.vote.create({
                        data: {
                            voterId: user.id,
                            postId: postId,
                            voteType: isUpvote ? 1 : -1
                        }
                    })
                );
            }
        };

        let upvoteInc = 0, downvoteInc = 0;

        if (prevVote) {
            if (isDelete) {
                if (prevVote.voteType === 1) {
                    upvoteInc = -1;
                } else if (prevVote.voteType === -1) {
                    downvoteInc = -1;
                }
            } else {
                if (prevVote.voteType === 1 && !isUpvote) {
                    upvoteInc = -1;
                    downvoteInc = 1;
                } else if (prevVote.voteType === -1 && isUpvote) {
                    upvoteInc = 1;
                    downvoteInc = -1;
                }
            }
        } else {
            if (isUpvote) {
                upvoteInc = 1;
            } else {
                downvoteInc = 1;
            }
        }

        tx.push(prisma.post.update({
            where: {
                id: postId
            },
            data: {
                upvoteCount: {
                    increment: upvoteInc
                },
                downvoteCount: {
                    increment: downvoteInc
                }
            }
        }));

        await prisma.$transaction(tx);

        res.status(200).end();
    } catch (e) {
        console.log(e);

        res.status(500).end("Internal Server Error");
    }
};