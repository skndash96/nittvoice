import { createClient } from "@/lib/supabase";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { UserType, UserTypeInsert } from "@/lib/types";

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

        let user = await getOauthUser(accessToken);
        
        if (!user?.email) {
            return respond(400, "No User found from Oauth Provider");
        }

        user.id = user.email.split("@").shift();
        user = {
            id: user.id,
            name: user.name,
            gender: user.gender,
            phone: user.phoneNumber
        };
        
        const jwtToken = jwt.sign(user, process.env.SUPABASE_JWT_SECRET!);

        await upsertUser(user, jwtToken);

        cookies().set("TOKEN", jwtToken);

        return respond(200, "ok");
    } catch (e) {
        console.error(e);

        return respond(500, "Something went wrong");
    }
}

async function upsertUser(user: UserTypeInsert, jwtToken: string) {
    const supabase = createClient(jwtToken);
    
    const { data, error: error1 } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .maybeSingle<UserType>();

    if (error1) throw error1;

    if (!data) {
        const { error: error2 } = await supabase
            .from("users")
            .insert<UserTypeInsert>(user);

        console.log("Inserting");

        if (error2) throw error2;
    } else {
        const { error: error2 } = await supabase
            .from("users")
            .update(user)
            .eq("id", user.id);

        console.log("Updating");

        if (error2) throw error2;
    }
}

async function getOauthUser(token: string) {
    const res = await fetch("https://auth.delta.nitt.edu/api/resources/user", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    const user = await res.json();

    return user;
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

function respond(status: number, message: string): Response {
    return new Response(JSON.stringify({
        success: status >= 200 && status < 300,
        message
    }), {
        status,
        headers: {
            "Content-Type": "application/json"
        }
    });
}
