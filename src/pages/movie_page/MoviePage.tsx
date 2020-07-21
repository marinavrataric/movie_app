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
  const maximumNumberOfMovies = 21;
  const POPULAR_MOVIE_URL = `${BASE_URL}/3/movie/popular?api_key=${API_KEY}`;

  const [numberOfMovies, setNumberOfMovies] = useState(numberOfMoviesToLoad);
  const [movieData, setMovieData] = useState<MovieInterface[]>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterMovie, setFilterMovie] = useState<MovieInterface[]>();
  const [inputSearchText, setInputSearchText] = useState("");
  const [selectedYear, setSelectedYear] = useState("2020");

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

  // search movie
  const inputSearchTextLowerCase = inputSearchText.toLocaleLowerCase();

  const handleSumbitSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const filterMovieSearch = movieData?.filter((movie: MovieInterface) =>
      movie.title.toLocaleLowerCase().includes(inputSearchTextLowerCase)
    );
    setFilterMovie(filterMovieSearch);
    setInputSearchText("");
  };

  // select year
  const mapSlicedYears = movieData?.map((movie: MovieInterface) =>
    movie.release_date.slice(0, 4)
  );
  const distinctYearAlternative = [...new Set(mapSlicedYears)];

  const dropdownBarReleaseDate = distinctYearAlternative?.map(
    (year: string, index) => {
      return (
        <option key={index} value={year}>
          {year}
        </option>
      );
    }
  );

  const handleSelectYear = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(e.target.value);
  };

  useEffect(() => {
    const filterMovieYear = movieData?.filter((movie: MovieInterface) =>
      movie.release_date.startsWith(selectedYear)
    );
    setFilterMovie(filterMovieYear);
  }, [selectedYear, movieData]);

  return (
    <div className="movie-card-page">
      <div className="search-bar">
        <div className="dropdown">
          <label>
            Select movie release
            <select value={selectedYear} onChange={handleSelectYear}>
              {dropdownBarReleaseDate}
            </select>
          </label>
        </div>
        <form onSubmit={handleSumbitSearch} className="input-search">
          <Input
            value={inputSearchText}
            placeholder="Search movie..."
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setInputSearchText(e.target.value)
            }
          />
        </form>
      </div>
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
