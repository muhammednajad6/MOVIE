import { Link } from "react-router-dom";

function MovieCard({ item }) {
  return (

    
    <div className="movie-card">

      <Link to={`/movie/${item.imdbID}`}>
         <img
           className="movie-poster"
           src={item.Poster}
           alt={item.Title}

          style={{
            borderRadius: "8px",
            cursor: "pointer",
          }}
        />
      </Link>

      <h2 className="movie-title">{item.Title}</h2>

      <p>Year: {item.Year}</p>

      <p>⭐ IMDb Rating: {item.imdbRating}</p>

      <p>🎭 Genre: {item.Genre}</p>

      <p>📖 {item.Plot}</p>

      <Link to={`/movie/${item.imdbID}`}>
        <button className="details-button">View Details</button>
      </Link>
    </div>
  );
}

export default MovieCard;