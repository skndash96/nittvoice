import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import axios from "axios";
import prisma from "../../prisma/client";

export const authHandler: RequestHandler = async (req, res) => {
    try {
        const params = new URLSearchParams(req.url.split("?").pop());

        const code = params.get("code");

        if (!code) {
            res.status(400).send("Bad Oauth Code").end();
            return;
        }

        const accessToken = await getAccessToken(code);

        if (!accessToken) {
            res.status(400).send("Bad Oauth Code").end();
            return;
        }

        let dAuthUser: {
            email: string;
            name: string;
            phoneNumber: string;
            gender: string;
        } = await getOauthUser(accessToken);

        if (!dAuthUser?.email) {
            res.status(400).send("No User found from Oauth Provider").end();
            return;
        }

        const userPayload = await upsertUser({
            id: dAuthUser.email.split("@").shift()!,
            name: dAuthUser.name,
            email: dAuthUser.email,
            phone: dAuthUser.phoneNumber,
            gender: dAuthUser.gender
        });

        const jwtToken = jwt.sign(userPayload, process.env.JWT_SECRET!)

        res.cookie("TOKEN", jwtToken, {
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 28),
        });

        res.status(200).end();
    } catch (e: any) {
        console.log(e);

        res.status(500).end(e.message);
    }
}

async function getAccessToken(code: string) {
    const q = new URLSearchParams([
        ["client_id", "9N2RgIB-5yQ23MeR"],
        ["client_secret", process.env.DAUTH_CLIENT_SECRET!],
        ["code", code],
        ["redirect_uri", process.env.DAUTH_REDIRECT_URI!],
        ["grant_type", "authorization_code"]
    ]);

    try {
        const { data } = await axios.post("https://auth.delta.nitt.edu/api/oauth/token", q.toString(), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });

        return data.access_token;
    } catch (e: any) {
        throw new Error(e.response.data.error_description);
    }
}

async function getOauthUser(token: string) {
    try {
        const { data: dAuthUser } = await axios.post("https://auth.delta.nitt.edu/api/resources/user", null, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        return dAuthUser;
    } catch (e: any) {
        throw new Error(e.response.data.error_description);
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
    const user = {
        id,
        name,
        email,
        gender,
        phone
    };

    const userPayload = await prisma.user.upsert({
        create: user,
        update: user,
        where: { id: user.id }
    });

    return userPayload;
}