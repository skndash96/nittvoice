import { respond } from "@/lib/utils";
import { PrismaClient } from "@prisma/client";
import getUser from "../actions/getUser";

export async function POST(req: Request) {
    try {
        const user = getUser(req);

        if (!user) return respond(401, "Please Login before you can vote.");

        const prisma = new PrismaClient();

        let { postId, isUpvote, isDelete } = await req.json();
        isUpvote = !!isUpvote;
        isDelete = !!isDelete;

        if (!postId) {
            return respond(400, "Please provide a postId");
        };

        const prevVote = await prisma.vote.findUnique({
            where: {
                voterId_postId: {
                    voterId: user.id,
                    postId: postId
                }
            }
        });

        if (!prevVote && isDelete) {
            return respond(400, "You can't delete a vote that doesn't exist.");
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
            tx.push(
                prisma.vote.upsert({
                    create: {
                        voterId: user.id,
                        postId: postId,
                        voteType: isUpvote ? 1 : -1
                    },
                    update: {
                        voteType: isUpvote ? 1 : -1
                    },
                    where: {
                        voterId_postId: {
                            voterId: user.id,
                            postId: postId
                        }
                    }
                })
            );
        };

        let upvoteInc = 0, downvoteInc;

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

        return respond(200, "Success");
    } catch (error) {
        console.error(error);
        return respond(500, "Internal Server Error");
    }
}