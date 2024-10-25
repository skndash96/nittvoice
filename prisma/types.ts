import { Post, User, Vote } from "@prisma/client";

export type FullPost = Post & {
    votes: Vote[];
    author: User;
};
