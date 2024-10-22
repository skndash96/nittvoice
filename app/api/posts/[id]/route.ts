import { respond } from "@/lib/utils";
import { PrismaClient } from "@prisma/client";
import { useParams } from "next/navigation";

export async function GET() {
    const prisma = new PrismaClient();
    const { _id } = useParams();

    if (!_id) respond(400, "Invalid Id");
    
    const id = typeof _id === "object" ? _id[0] : _id;

    const post = await prisma.post.findUnique({
        where: {
            id: id
        },
        include: {
            author: {
                select: {
                    name: true
                }
            }
        }
    });
}