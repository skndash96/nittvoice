import { FaExclamationTriangle } from "react-icons/fa";

export default function NotFound() {
    return (
        <main className="p-4">
            <div className="flex items-center text-red-500">
                <FaExclamationTriangle className="text-6xl mr-4" />
                <h1 className="text-2xl font-bold">Something went Wrong!</h1>
            </div>
            
            <p className="mt-4 text-gray-600">We are working on it. Try refreshing the browser or try again later!</p>
        </main>
    );
}