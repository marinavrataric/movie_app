import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MovieInfoCard.css";
import { Link } from "react-router-dom";

interface Movie {
  id: string;
  original_language: string;
  title: string;
  release_date: string;
  vote_average: number;
  poster_path: string;
}

interface Props {
  numberOfMovies: number;
}

function MovieInfoCard(props: Props) {
  const [movieData, setMovieData] = useState<[Movie]>();

  const BASE_URL = "https://api.themoviedb.org";
  const API_KEY = "0b0e8d104f0d6130a4fc67848f89e107";
  const POPULAR_MOVIE_URL = `${BASE_URL}/3/movie/popular?api_key=${API_KEY}`;

  useEffect(() => {
    axios.get(POPULAR_MOVIE_URL).then((res) => {
      setMovieData(res.data.results);
    });
  }, [POPULAR_MOVIE_URL]);

  const allMovies = movieData?.slice(0, props.numberOfMovies).map((movie) => {
    return (
      <div className="info-cart" key={movie.id}>
        <Link
          to={{
            pathname: `/${movie.id}`,
            state: movie,
          }}
        >
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
        </Link>
      </div>
    );
  });

  return <div className="movie-card-grid">{allMovies}</div>;
}

export default MovieInfoCard;
