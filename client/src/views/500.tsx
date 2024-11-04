import React from 'react';
import { BiError } from 'react-icons/bi';
import { Link } from 'wouter';

const Error: React.FC = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center space-y-4">
                <BiError className="text-red-500 text-6xl mx-auto" />
                <h1 className="text-6xl font-bold text-gray-800">500</h1>
                <h2 className="text-2xl font-semibold text-gray-700">Internal Error</h2>
                <p className="text-gray-600">Something went wrong and it&apos;ll be fixed soon!</p>
                <Link to="/" className="inline-block px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                    Go Back Home
                </Link>
            </div>
        </div>
    );
};

export default Error;