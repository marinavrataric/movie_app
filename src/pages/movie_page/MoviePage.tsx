import React, { useState, useEffect } from "react";
import MovieInfoCard from "../../components/movie info card/MovieInfoCard";
import MovieRoullette from "../../modal/MovieRoulette";
import "./MoviePage.css";
import Axios from "axios";
import { MovieInterface } from "../../interfaces/MovieInterface";
import SearchBar from "../../components/search-bar/SearchBar";

const BASE_URL = "https://api.themoviedb.org";
const API_KEY = "0b0e8d104f0d6130a4fc67848f89e107";

interface MovieResponse {
  data: {
    results: MovieInterface[];
  };
}

function MoviePage() {
  const numberOfMoviesToLoad = 8;
  const maximumNumberOfMovies = 21;
  const POPULAR_MOVIE_URL = `${BASE_URL}/3/movie/popular?api_key=${API_KEY}`;

  const [numberOfMovies, setNumberOfMovies] = useState(numberOfMoviesToLoad);
  const [movieData, setMovieData] = useState<MovieInterface[]>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterMovie, setFilterMovie] = useState<MovieInterface[]>();

  useEffect(() => {
    Axios.get(POPULAR_MOVIE_URL).then((res: MovieResponse) => {
      const loadedMovieData = res.data.results;
      setMovieData(loadedMovieData);
      setFilterMovie(loadedMovieData);
    });
  }, [POPULAR_MOVIE_URL]);

  const loadMovies = () => {
    setNumberOfMovies(numberOfMovies + numberOfMoviesToLoad);
  };

  return (
    <div className="movie-card-page">
      <SearchBar movieData={movieData} setFilterMovie={setFilterMovie} />
      {filterMovie?.length !== 0 ? (
        <MovieInfoCard
          numberOfMovies={numberOfMovies}
          movieData={filterMovie}
        />
      ) : (
        <p className="no-results-title">No results</p>
      )}

      <div className="div-btn-center">
        {numberOfMovies < maximumNumberOfMovies ? (
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
