import { respond } from "@/lib/utils";
import { PrismaClient } from "@prisma/client";
import getUser from "../actions/getUser";

export async function GET(req: Request) {
    try {
        const prisma = new PrismaClient();

        const user = getUser(req);

        const posts = await prisma.post.findMany({
            take: 20,
            include: {
                author: {
                    select: {
                        name: true
                    }
                },
                votes: {
                    take: user ? 1 : 0,
                    where: {
                        voterId: user?.id
                    }
                }
            }
        });
        
        return respond(200, "ok", posts);
    } catch (error) {
        console.error(error);
        return respond(500, "Internal server error");
    }
}