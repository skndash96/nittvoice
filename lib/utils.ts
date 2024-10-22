import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCookie(name: string): string|null {
    return window
        .document
        .cookie
        .split(";")
        .find(c => c.startsWith(name+"="))
        ?.split("=")
        .pop() || null;
}

export function respond(status: number, message: string, data?: unknown): Response {
    return new Response(JSON.stringify({
        success: status >= 200 && status < 300,
        message,
        data
    }), {
        status,
        headers: {
            "Content-Type": "application/json"
        }
    });
}

export function displayDateAge(s: string) {
    const old = new Date(s);
    const now = new Date();

    let val = (now.valueOf() - old.valueOf()) / 1000;
    let unit = "s";

    if (val / 60 > 1) {
        val = val / 60;
        unit = "m";

        if (val / 60 > 1) {
            val = val / 60;
            unit = "h";

            if (val / 24 > 1) {
                val = val / 24;
                unit = "d";

                if (val / 7 > 1) {
                    val = val / 7;
                    unit = "w";

                    if (val / 4 > 1) {
                        val = val / 4;
                        unit = "mo";

                        if (val / 12 > 1) {
                            val = val / 12;
                            unit = "y";
                        }
                    }
                }
            }
        }
    }

    val = Math.floor(val);

    return `${val}${unit} ago`;
} 