import { redirect } from "next/navigation";
import { FaSpinner } from "react-icons/fa";

export default function Home() {
    redirect("/posts");

    return (
        <main className="grow">
            <div className="flex items-center justify-center h-full w-fit">
                <FaSpinner className="animate-spin text-4xl" />
                <span className="ml-2 text-xl">Redirecting...</span>
            </div>
        </main>
    );
}