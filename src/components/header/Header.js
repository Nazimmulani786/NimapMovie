import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-light fixed-top"
        style={{ backgroundColor: "rgb(104, 171, 181)" }}
      >
        <Link
          to="/"
          className="navbar-brand"
          style={{
            textDecoration: "underline solid red",
            fontSize: "2x-large",
            width: "30%",
            marginLeft: "10px",
          }}
        >
          <span style={{ color: "red" }}>M</span>OVIE-
          <span style={{ color: "red" }}>M</span>ANIA
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="search-bar collapse navbar-collapse"
          id="navbarSupportedContent"
        >
          <ul className="search-left-bar navbar-nav ">
            <li className="nav-item">
              <Link to="/movies/popular" className="nav-link">
                Popular
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/movies/top_rated" className="nav-link">
                Top_Rated
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/movies/upcoming" className="nav-link">
                Upcoming
              </Link>
            </li>
          </ul>
          <div className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="text"
              placeholder="Search for movies..."
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
            <Link to={`/search?q=${searchQuery}`} className="btn ">
              Search
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
