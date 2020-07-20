import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./MovieDetails.css";
import RatingStars from "react-rating-stars-component";
import { constants } from "../../constants/GeneralConstans";
import { useMovieRating } from "../../hooks/useMovieRating";

interface Movie {
  id: string;
  original_language: string;
  overview: string;
  poster_path: string;
  title: string;
  vote_average: number | null;
  popularity: number | null;
  release_date: string;
}

function MovieDetails() {
  const location = useLocation<Movie>();

  const movieData = location.state;
  const [currentMovieRating, handleRating] = useMovieRating();

  return (
    <div className="movie-details-page">
      <h3 className="movie-title">
        {movieData.title} ({movieData.release_date.substr(0, 4)})
      </h3>
      <div className="movie-poster">
        <img
          alt="poster"
          src={`https://image.tmdb.org/t/p/original${movieData.poster_path}`}
          className="movie-poster"
        ></img>
      </div>
      <div className="rating">
        <RatingStars
          count={10}
          size={24}
          value={currentMovieRating}
          onChange={handleRating}
        />
      </div>
      <p className="movie-overview">{movieData.overview}</p>
      <p className="movie-rating">Rating: {movieData.vote_average}</p>
      <p className="movie-popularity">Popularity: {movieData.popularity}</p>
      <p className="movie-language">Language: {movieData.original_language}</p>
    </div>
  );
}

export default MovieDetails;
