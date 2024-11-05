import { Router } from "express";
import { authHandler } from "./route";

const AuthRouter = Router();

AuthRouter.get("/", authHandler);

export default AuthRouter;