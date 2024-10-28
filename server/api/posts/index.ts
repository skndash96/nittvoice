import { Router } from "express";
import { votePost } from "./votePost";
import { getPosts } from "./getPosts";
import { getSinglePost } from "./getSinglePost";
import { getPostComments } from "./getPostComments";
import { createNewPost } from "./createNewPost";

const postsRouter = Router();

postsRouter.get("/", getPosts);
postsRouter.get("/:postId", getSinglePost);
postsRouter.get("/:postId/comments", getPostComments);
postsRouter.post("/", createNewPost);
postsRouter.post("/:postId/vote", votePost);

export default postsRouter;