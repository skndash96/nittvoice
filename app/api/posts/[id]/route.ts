import { respond } from "@/lib/utils";
import { PrismaClient } from "@prisma/client";
import { useParams } from "next/navigation";
import getUser from "../../actions/getUser";

export async function GET(req: Request) {
    const user = getUser(req);

    const prisma = new PrismaClient();
    const params = useParams();

    let id = params.id;

    if (typeof id === "object") id = id[0];

    if (!id) return respond(400, "Missing id parameter");

    try {
        const post = await prisma.post.findUnique({
            where: {
                id: id
            },
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

        return respond(200, "ok", post);
    } catch (error) {
        console.error(error);

        return respond(500, "Internal server error");
    }
}