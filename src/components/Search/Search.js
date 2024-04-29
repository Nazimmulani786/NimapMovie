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
