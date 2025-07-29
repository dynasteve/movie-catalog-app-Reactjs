import '../css/MovieCard.css'
import { useMovieContext } from '../contexts/MovieContext';

export function MovieCard({movie}) {
    const {isFavourites, addFavourites, removeFavourites} = useMovieContext();
    const favourite = isFavourites(movie.id)

    function onFavClick(e) {
        e.preventDefault()
        if (favourite) removeFavourites(movie.id)
        else addFavourites(movie)
    }
    return (
        <div className="movie-card">
            <div className="movie-poster">
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="movie.title" />
                <div className="movie-overlay">
                    <button className={`fav-btn ${favourite ? "active" : ""}`} onClick={onFavClick}>
                        ♥
                    </button>
                </div>
            </div>
            <div className="movie-info">
                <h1 className="movie-title">{movie.title}</h1>
                <p className="movie-release-date">{movie.release_date?.split("-")[0]}</p>
            </div>
        </div>
    );
}
