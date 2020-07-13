import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MovieInfoCard.css";

interface Movie {
  id: string;
  original_language: string;
  title: string;
  release_date: string;
  vote_average: number;
  poster_path: string;
}

function MovieInfoCard() {
  const [movieData, setMovieData] = useState<[Movie]>();
  const [numberOfMovies, setnumberOfMovies] = useState(8);

  const MOVIE_URL =
    "https://api.themoviedb.org/3/movie/popular?api_key=0b0e8d104f0d6130a4fc67848f89e107&language=en-US&page=1";

  useEffect(() => {
    axios.get(MOVIE_URL).then((res) => {
      setMovieData(res.data.results);
    });
  }, []);

  const allMovies = movieData?.slice(0, numberOfMovies).map((movie) => {
    return (
      <div className="info-cart" key={movie.id}>
        <img
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          alt="movie-img-small"
          className="movie-info-img"
        ></img>
        <p className="movie-info-rating">{movie.vote_average}</p>
        <p className="movie-info-title-year">
          {movie.title} ({movie.release_date.substring(0, 4)})
        </p>
        <p className="movie-info-language">
          Language: {movie.original_language}
        </p>
      </div>
    );
  });

  const loadMovies = () => {
    setnumberOfMovies(numberOfMovies + 8);
  };

  return (
    <div className="movie-card-page">
      <div className="movie-card-grid">{allMovies}</div>
      {numberOfMovies < 21 ? (
        <button className="load-btn" onClick={loadMovies}>
          Load
        </button>
      ) : (
        <p className="end-of-page">End of the page</p>
      )}
    </div>
  );
}

export default MovieInfoCard;
