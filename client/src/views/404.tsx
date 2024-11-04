import React from 'react';
import { BiError } from 'react-icons/bi';
import { Link } from 'wouter';

const NotFound: React.FC = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center space-y-4">
                <BiError className="text-amber-500 text-6xl mx-auto" />
                <h1 className="text-6xl font-bold text-gray-800">404</h1>
                <h2 className="text-2xl font-semibold text-gray-700">Page Not Found</h2>
                <p className="text-gray-600">Oops! The page you're looking for doesn't exist.</p>
                <Link to="/" className="inline-block px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                    Go Back Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;