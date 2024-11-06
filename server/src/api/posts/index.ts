import { Router } from "express";
import { votePost } from "./votePost";
import { getPosts } from "./getPosts";
import { getSinglePost } from "./getSinglePost";
import { getPostComments } from "./getPostComments";
import { createNewPost } from "./createNewPost";
import { uploadMiddleware } from "../../lib/multer";
const postsRouter = Router();

postsRouter.get("/", getPosts);
postsRouter.get("/:postId", getSinglePost);
postsRouter.get("/:postId/comments", getPostComments);
postsRouter.post("/", uploadMiddleware.single("file"), createNewPost);
postsRouter.post("/:postId/vote", votePost);

export default postsRouter;