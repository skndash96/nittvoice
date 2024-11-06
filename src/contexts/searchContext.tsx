import React, { createContext, useState, ReactNode } from 'react';

interface SearchContextType {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
}

export const SearchContext = createContext<SearchContextType>({
    searchTerm: '',
    setSearchTerm: () => {},
});

interface SearchProviderProps {
    children: ReactNode;
}

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const value = {
        searchTerm,
        setSearchTerm,
    };

    return (
        <SearchContext.Provider value={value}>
            {children}
        </SearchContext.Provider>
    );
};