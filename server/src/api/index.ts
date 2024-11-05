import { Router } from "express";
import postsRouter from "./posts";
import commentsRouter from "./comments";
import AuthRouter from "./auth";

const apiRouter = Router();

apiRouter.use("/posts", postsRouter);
apiRouter.use("/comments", commentsRouter);
apiRouter.use("/auth", AuthRouter);

export default apiRouter;