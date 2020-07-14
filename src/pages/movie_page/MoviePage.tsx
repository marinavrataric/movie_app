import React, { useState } from "react";
import MovieInfoCard from "../../components/movie info card/MovieInfoCard";

function MoviePage() {
  const [numberOfMovies, setNumberOfMovies] = useState(8);

  const loadMovies = () => {
    setNumberOfMovies(numberOfMovies + 8);
  };
  return (
    <div className="movie-card-page">
      <MovieInfoCard numberOfMovies={numberOfMovies} />
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

export default MoviePage;
