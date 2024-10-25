import { FaExclamationTriangle } from "react-icons/fa";

export default function NotFound() {
    return (
        <main className="p-4">
            <div className="flex items-center text-red-500">
                <FaExclamationTriangle className="text-6xl mr-4" />
                <h1 className="text-2xl font-bold">Page Not Found</h1>
            </div>
            
            <p className="mt-4 text-gray-600">The page you are looking for does not exist or has been removed.</p>
        </main>
    );
}