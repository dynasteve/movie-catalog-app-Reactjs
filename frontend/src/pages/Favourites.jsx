import '../css/Favorites.css'
import { useMovieContext } from '../contexts/MovieContext'
import { MovieCard } from '../components/MovieCard'

export default function Favourites() {
    const { favourites } = useMovieContext();

    if (favourites.length === 0) {
        return (
            <div className="favourites-empty">
                <h2>No favourite movies added yet...</h2>
                <p>Add movies to your favourites catalog today by clicking the "Heart Button"</p>
            </div>
        )
    }

    return (
        <div className="favourites">
            <h2>Your Favourite Movies</h2>
            <div className="movies-grid">
                {favourites.map((movie) => (
                    <MovieCard movie={movie} key={movie.id} />
                ))}
            </div>
        </div>
    )
}