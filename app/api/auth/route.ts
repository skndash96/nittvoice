import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { respond } from "@/lib/utils";

export async function GET(req: Request) {
    const params = new URLSearchParams(req.url.split("?").pop());
    const code = params.get("code");

    try {
        if (!code) {
            return respond(400, "No Oauth Code provided");
        }

        const accessToken = await getAccessToken(code);

        if (!accessToken) {
            return respond(400, "Bad Oauth Code");
        }

        let dAuthUser: {
            email: string;
            name: string;
            phoneNumber: string;
            gender: string;
        } = await getOauthUser(accessToken);

        if (!dAuthUser?.email) {
            return respond(400, "No User found from Oauth Provider");
        }

        const user = {
            id: dAuthUser.email.split("@").shift()!,
            name: dAuthUser.name,
            email: dAuthUser.email,
            phone: dAuthUser.phoneNumber,
            gender: dAuthUser.gender
        };

        const returnedUser = await upsertUser(user);
        
        const jwtToken = jwt.sign(returnedUser, process.env.JWT_SECRET!)
        
        cookies().set("TOKEN", jwtToken, {
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 28),
        });

        return respond(200, "ok", returnedUser);
    } catch (e) {
        console.error(e);

        return respond(500, "Something went wrong");
    }
}

async function upsertUser({
    id, name, email, gender, phone
}: {
    id: string,
    name: string,
    email: string,
    gender: string,
    phone: string
}) {
    const prisma = new PrismaClient();

    const user = {
        id,
        name,
        email,
        gender,
        phone
    };

    const returnedUser = await prisma.user.upsert({
        create: user,
        update: user,
        where: { id: user.id }
    });

    return returnedUser;
}

async function getOauthUser(token: string) {
    const res = await fetch("https://auth.delta.nitt.edu/api/resources/user", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    const dAuthUser = await res.json();

    return dAuthUser;
}

async function getAccessToken(code: string): Promise<string> {
    const q = new URLSearchParams([
        ["client_id", "9N2RgIB-5yQ23MeR"],
        ["client_secret", process.env.DAUTH_CLIENT_SECRET!],
        ["code", code],
        ["redirect_uri", "http://127.0.0.1:3000/auth"],
        ["grant_type", "authorization_code"]
    ]);

    const tokenRes = await fetch("https://auth.delta.nitt.edu/api/oauth/token", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: q.toString()
    });

    const json = await tokenRes.json();

    return json.access_token;
}