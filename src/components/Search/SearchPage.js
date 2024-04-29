import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("q");

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=c16fdbdce4772e21b588692b7d5fa362&l&query=${searchQuery}`
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
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {searchResults.map((movie) => (
          <Link
            to={`/movie/${movie.id}`}
            key={movie.id}
            style={{
              textDecoration: "none",
              color: "inherit",
              width: "20%",
              margin: "25px",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "10px 10px 0 0",
                  marginBottom: "10px",
                }}
              />
              <div style={{ padding: "10px", height: "100%" }}>
                <h2 style={{ fontSize: "1.2rem", marginBottom: "5px" }}>
                  {movie.title}
                </h2>
                <p
                  style={{
                    fontSize: "14px",
                    maxHeight: "80px",
                    overflow: "hidden",
                  }}
                >
                  {movie.overview}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
