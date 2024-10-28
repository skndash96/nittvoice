import { RequestHandler } from "express";
import getUser from "../actions/getUser";

// POST /api/posts/
export const createNewPost: RequestHandler = async (req, res) => {
    const user = getUser(req);

    if (!user) {
        res.status(401).end("Please Login.");
        return;
    }

    res.status(400).end("Not implemented.");
};
