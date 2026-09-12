import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import MovieCard from "./components/MovieCard";
import SearchBar from "./components/SearchBar";
import Loading from "./components/Loading";
import ErrorMessage from "./components/ErrorMessage";
import MovieDetails from "./pages/MovieDetails";
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
import "./App.css";

function App() {
  const [movie, setMovie] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchMovie = async () => {
    if (!movie.trim()) {
      setMovies([]);
      setError("Please enter a movie name!");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?s=${movie}&apikey=${API_KEY}`
      );

      if (response.data.Response === "False") {
        setMovies([]);
        setError("Movie not found. Try searching for another movie!");
      } else {
        const movieList = response.data.Search;

        const detailedMovies = await Promise.all(
          movieList.map(async (item) => {
            const details = await axios.get(
              `https://www.omdbapi.com/?i=${item.imdbID}&apikey=${API_KEY}`
            );

            return details.data;
          })
        );

        setMovies(detailedMovies);
      }
    } catch (error) {
      setMovies([]);
      setError("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="app">
            <h1 className="title">🎬 MOVIE EXPLORER</h1>

                  <div className="search-area">
                  <SearchBar
                    movie={movie}
                    setMovie={setMovie}
                    searchMovie={searchMovie}
                   />
                  </div>

            {/* <p>You searched for: {movie}</p> */}

            {loading && <Loading />}

           {error && <ErrorMessage message={error} />}

            {/* <p>Number of movies: {movies.length}</p> */}

             <div className="movie-grid">
             {movies.map((item) => (
             <MovieCard key={item.imdbID} item={item} />
               ))}
            </div>
          </div>
        }
      />

      <Route path="/movie/:id" element={<MovieDetails />} />
    </Routes>
  );
}

export default App;