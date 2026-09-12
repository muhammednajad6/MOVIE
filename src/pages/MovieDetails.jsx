import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`
        );

        if (response.data.Response === "False") {
          setError("Movie details not found.");
        } else {
          setMovie(response.data);
        }
      } catch (error) {
        setError("Something went wrong. Please try again.");
      }

      setLoading(false);
    };

    getMovieDetails();
  }, [id]);

  return (
    <div className="details-page">
      <h1 className="details-heading">🎬 Movie Details</h1>

      {loading && <p>Loading...</p>}

      {error && <p>{error}</p>}

      {movie && (
        <div >
          <img
            className="details-poster"
            src={movie.Poster}
           alt={movie.Title}
           />

          <h2 className="details-title">{movie.Title}</h2>

          <p>Year: {movie.Year}</p>

          <p className="imdb-rating">⭐ IMDb Rating: {movie.imdbRating}</p>

          <p>🎭 Genre: {movie.Genre}</p>

          <p>🎬 Director: {movie.Director}</p>

          <p>👥 Actors: {movie.Actors}</p>

          <p>⏱️ Runtime: {movie.Runtime}</p>

          <p>🗣️ Language: {movie.Language}</p>

          <p>🏆 Awards: {movie.Awards}</p>

          <p>📖 Plot: {movie.Plot}</p>

          <Link to="/">
            <button className="back-button">⬅️ Back to Search</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default MovieDetails;