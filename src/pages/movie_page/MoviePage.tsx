import React, { useState } from "react";
import MovieInfoCard from "../../components/movie info card/MovieInfoCard";
import MovieRoullette from "../../modal/MovieRoulette";
import "./MoviePage.css";

function MoviePage() {
  const [numberOfMovies, setNumberOfMovies] = useState(8);

  const loadMovies = () => {
    setNumberOfMovies(numberOfMovies + 8);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="movie-card-page">
      <MovieInfoCard numberOfMovies={numberOfMovies} />
      <div className="div-btn-center">
        {numberOfMovies < 21 ? (
          <button className="load-btn" onClick={loadMovies}>
            Load
          </button>
        ) : (
          <p className="end-of-page">End of the page</p>
        )}
        <button className="load-btn" onClick={() => setIsModalOpen(true)}>
          Roll
        </button>
      </div>
      {isModalOpen && (
        <MovieRoullette
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  );
}

export default MoviePage;
