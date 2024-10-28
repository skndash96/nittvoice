import Link from "next/link";

export default function Footer() {
    return (
        <footer className="p-4 text-sm border-t-2 border-solid">
            <p className="text-center">
                Copyright @2024 | By <Link className="hover:underline" href="https://github.com/skndash96" target="_blank">skndash96</Link>
            </p>
        </footer>
    );
}