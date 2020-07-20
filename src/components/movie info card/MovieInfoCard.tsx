import React from "react";
import "./MovieInfoCard.css";
import { Link } from "react-router-dom";
import { MovieInterface } from "../../interfaces/MovieInterface";

interface Props {
  numberOfMovies: number;
  movieData: Array<MovieInterface> | undefined;
}

function MovieInfoCard(props: Props) {
  const allMovies = props.movieData
    ?.slice(0, props.numberOfMovies)
    .map((movie: MovieInterface) => {
      return (
        <div className="info-cart" key={movie.id}>
          <Link
            style={{ textDecoration: "none" }}
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
