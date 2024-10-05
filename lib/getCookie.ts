export default function getCookie(name: string): string|null {
    return window
        .document
        .cookie
        .split(";")
        .find(c => c.startsWith(name+"="))
        ?.split("=")
        .pop() || null;
}