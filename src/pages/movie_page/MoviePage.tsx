import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";
import MovieInfoCard from "../../components/movie info card/MovieInfoCard";
import MovieRoullette from "../../modal/MovieRoulette";
import { Input } from "reactstrap";
import "./MoviePage.css";
import Axios from "axios";
import { MovieInterface } from "../../interfaces/MovieInterface";

const BASE_URL = "https://api.themoviedb.org";
const API_KEY = "0b0e8d104f0d6130a4fc67848f89e107";

interface MovieResponse {
  data: {
    results: MovieInterface[];
  };
}

function MoviePage() {
  const numberOfMoviesToLoad = 8;
  const [numberOfMovies, setNumberOfMovies] = useState(numberOfMoviesToLoad);
  const [movieData, setMovieData] = useState<MovieInterface[]>();

  const POPULAR_MOVIE_URL = `${BASE_URL}/3/movie/popular?api_key=${API_KEY}`;

  useEffect(() => {
    Axios.get(POPULAR_MOVIE_URL).then((res: MovieResponse) => {
      const loadedMovieData = res.data.results;
      setMovieData(loadedMovieData);
      setFilter(loadedMovieData);
    });
  }, [POPULAR_MOVIE_URL]);

  const loadMovies = () => {
    setNumberOfMovies(numberOfMovies + numberOfMoviesToLoad);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputSearchText, setInputSearchText] = useState("");

  const inputSearchTextLowerCase = inputSearchText.toLocaleLowerCase();
  const [filter, setFilter] = useState();

  const handleSumbitSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const filterMovieData = movieData?.filter((movie: MovieInterface) =>
      movie.title.toLocaleLowerCase().includes(inputSearchTextLowerCase)
    );
    setFilter(filterMovieData);
    setInputSearchText("");
  };

  const maximumNumberOfMovies = 21;

  return (
    <div className="movie-card-page">
      <form onSubmit={handleSumbitSearch}>
        <Input
          value={inputSearchText}
          placeholder="Search movie..."
          className="input-search"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setInputSearchText(e.target.value)
          }
        />
      </form>
      {filter?.length !== 0 ? (
        <MovieInfoCard numberOfMovies={numberOfMovies} movieData={filter} />
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
