import { Router } from "express";
import { createComment } from "./createComment";
import { voteComment } from "./voteComment";

const commentsRouter = Router();

commentsRouter.post("/", createComment);
commentsRouter.post("/:commentId/vote", voteComment);

export default commentsRouter;