import React, { useEffect, useState } from "react";
import "./movieList.css";
import { useParams } from "react-router-dom";
import Cards from "../card/card";

const MovieList = () => {
  const [movieList, setMovieList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(10);
  const { type } = useParams();

  useEffect(() => {
    getData();
  }, [type, currentPage]);

  const getData = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/${
        type ? type : "popular"
      }?api_key=c16fdbdce4772e21b588692b7d5fa362&language=en-US&page=${currentPage}`
    )
      .then((res) => res.json())
      .then((data) => setMovieList(data.results));
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber(pageNumber));
  const totalPages = 100;

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => paginate(i)}
          className={currentPage === i ? "active" : ""}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="movie__list">
      <h2 className="list__title">{(type ? type : "POPULAR").toUpperCase()}</h2>
      <div className="list__cards">
        {movieList.map((movie) => (
          <Cards key={movie.id} movie={movie} />
        ))}
      </div>
      <div className="pagination">
        <button onClick={goToPreviousPage}>&laquo;</button>
        {renderPageNumbers().slice(
          currentPage > 2 ? currentPage - 2 : 0,
          currentPage + 1
        )}
        <button onClick={goToNextPage}>&raquo;</button>
      </div>
    </div>
  );
};

export default MovieList;
