/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, useContext } from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
    const [favourites, setFavourites] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false); // Track if we've loaded from localStorage

    // Load favorites from localStorage on mount
    useEffect(() => {
        const storedFavourites = localStorage.getItem("favourites");
        
        if (storedFavourites) {
            try {
                const parsedFavourites = JSON.parse(storedFavourites);
                setFavourites(parsedFavourites);
            } catch (error) {
                console.error("Error parsing stored favourites:", error);
                // If there's an error parsing, start with empty array
                setFavourites([]);
            }
        }
        setIsLoaded(true); // Mark as loaded
    }, []);

    // Save to localStorage only after initial load and when favourites actually change
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('favourites', JSON.stringify(favourites));
        }
    }, [favourites, isLoaded]);

    const addFavourites = (movie) => {
        setFavourites(prev => [...prev, movie]);
    }

    const removeFavourites = (movieId) => {
        setFavourites(prev => prev.filter(movie => movie.id !== movieId));
    }

    const isFavourites = (movieId) => {
        return favourites.some(movie => movie.id === movieId);
    }

    const value = {
        favourites,
        addFavourites,
        removeFavourites,
        isFavourites,
    }

    return (
        <MovieContext.Provider value={value}>
            {children}
        </MovieContext.Provider>
    )
}