function SearchBar({ movie, setMovie, searchMovie }) {
  return (
    <div>
     <input
         className="search-input"
         type="text"
         placeholder="Enter movie name"
         value={movie}
         onChange={(e) => setMovie(e.target.value)}
      />

       <button className="search-button" onClick={searchMovie}>
         Search
      </button>
    </div>
  );
}

export default SearchBar;