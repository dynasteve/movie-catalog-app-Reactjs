import { MovieCard } from "../components/MovieCard"
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "../services/api";
import '../css/Home.css'

export default function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null); // Fixed: was seterror
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies)
            } catch (err) {
                console.log(err);
                setError("Failed to load Movies"); // Fixed: was seterror
            } finally {
                setLoading(false);
            };
        }
        loadPopularMovies();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return
        if (loading) return

        setLoading(true)
        try {
            const searchResults = await searchMovies(searchQuery)
            setMovies(searchResults)
            setError(null) // Fixed: was seterror
            
        } catch (err) {
            console.log(err)
            setError("Failed to find movies...") // Fixed: was seterror
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input type="text" placeholder="Search for a movie here"
                    className="search-input" value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} />
                <button type="submit" className="search-button">Search</button>
            </form>

            {error && <div className="error-message">{error}</div>}

            {loading ? <div className="loading">Loading...</div> :
                <div className="movies-grid">
                    {movies.map((movie) => (
                        <MovieCard movie={movie} key={movie.id} />
                    ))}
                </div>
            }

        </div>
    )
}