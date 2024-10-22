import { respond } from "@/lib/utils";
import { PrismaClient } from "@prisma/client";

export async function GET(req: Request) {
    const prisma = new PrismaClient();

    const posts = await prisma.post.findMany({
        take: 20,
        include: {
            author: {
                select: {
                    name: true
                }
            },
            reactions: true
        }
    });

    return respond(200, "ok", posts);
}