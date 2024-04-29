// import React from "react";

// const SearchResults = ({ searchResults }) => {
//   return (
//     <div className="search-results-container">
//       <div className="search-results">
//         {searchResults.map((movie) => (
//           <div key={movie.id} className="movie">
//             {movie.poster_path && (
//               <img
//                 src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//                 alt={movie.title}
//                 className="movie-poster"
//               />
//             )}
//             <div className="movie-details">
//               <h2>{movie.title}</h2>
//               <p>{movie.overview}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SearchResults;


import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SearchResults from "./Search.js";

const Search = () => {
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("q");

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=c16fdbdce4772e21b588692b7d5fa362&query=${searchQuery}`
        );
        const data = await response.json();
        setSearchResults(data.results);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    if (searchQuery) {
      fetchSearchResults();
    }
  }, [searchQuery]);

  return (
    <div>
      <h1>Search Results</h1>
      <SearchResults searchResults={searchResults} />
    </div>
  );
};

export default Search;
