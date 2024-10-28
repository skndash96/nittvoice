import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import { Request } from "express";

export default function getUser(req: Request) {
    const token = req.cookies.TOKEN;
    
    if (!token) return null;

    ///throws if jwt expired or malformed
    const payload = jwt.verify(token, process.env.JWT_SECRET!);

    if (typeof payload !== 'object' || !payload || !('id' in payload) || !('email' in payload)) {
        throw new Error("Invalid token payload");
    }

    //@ts-expect-error - We have already checked the payload
    const user: User = payload;

    return user;
}
