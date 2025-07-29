/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, useContext } from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
    const [favourites, setFavourites] = useState([]);

    useEffect(() => {
        const storedFavourites = localStorage.getItem("favourites")

        if (storedFavourites) setFavourites(JSON.parse(storedFavourites))
    }, []);

    useEffect(() => {
        localStorage.setItem('favourites', JSON.stringify(favourites))
    }, [favourites]);

    const addFavourites = (movie) => {
        setFavourites(prev => [...prev, movie])
    }

    const removeFavourites = (movieId) => {
        setFavourites(prev => prev.filter(movie => movie.id !== movieId))
    }

    const isFavourites = (movieId) => {
        return favourites.some(movie => movie.id === movieId)
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
