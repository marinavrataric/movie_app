import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";
import MovieInfoCard from "../../components/movie info card/MovieInfoCard";
import MovieRoullette from "../../modal/MovieRoulette";
import { Input } from "reactstrap";
import "./MoviePage.css";
import Axios from "axios";
import { MovieInterface } from "../../interfaces/MovieInterface";
import { MovieGenres } from "../../constants/MovieGenres";
import { MovieGenresInterface } from "../../interfaces/MovieGenreInterface";

const BASE_URL = "https://api.themoviedb.org";
const API_KEY = "0b0e8d104f0d6130a4fc67848f89e107";

interface MovieResponse {
  data: {
    results: MovieInterface[];
  };
}

interface Genre {
  id: number;
  name: string;
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
  const [selectedYear, setSelectedYear] = useState();

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

  // filter search movie
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

  const dropdownBarReleaseDate = distinctYearAlternative
    .sort((a: string, b: string) => (a < b ? 1 : -1))
    ?.map((year: string, index) => {
      return (
        <option key={index} value={year}>
          {year}
        </option>
      );
    });

  const handleSelectYear = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(e.target.value);
  };

  useEffect(() => {
    if (!selectedYear) return;
    const filterMovieYear = movieData?.filter((movie: MovieInterface) =>
      movie.release_date.startsWith(selectedYear)
    );
    setFilterMovie(filterMovieYear);
  }, [selectedYear, movieData]);

  // select rating
  const [selectedRating, setSlectedRating] = useState();

  const handleSelectRating = (e: ChangeEvent<HTMLSelectElement>) => {
    setSlectedRating(e.target.value);
  };

  const movieRating = movieData?.map(
    (movie: MovieInterface) => movie.vote_average
  );
  const movieRatingAlternative = [...new Set(movieRating)];

  const dropdownBarRating = movieRatingAlternative
    .sort((a: number, b: number) => (a < b ? 1 : -1))
    .map((rating: number, index) => {
      return (
        <option key={index} value={rating}>
          {rating}
        </option>
      );
    });

  useEffect(() => {
    if (!selectedRating) return;
    const filterMovieRating = movieData?.filter((movie: MovieInterface) => {
      if (movie.vote_average.toString() === selectedRating) return movie;
    });
    setFilterMovie(filterMovieRating);
  }, [selectedRating, movieData]);

  // select genre
  const [selectedGenre, setSelectedGenre] = useState();

  const handleSelectGenre = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedGenre(e.target.value);
  };

  const dropdownBarGenre = MovieGenres.map((genre: MovieGenresInterface) => {
    return (
      <option key={genre.id} value={genre.id}>
        {genre.name}
      </option>
    );
  });

  useEffect(() => {
    if (!selectedGenre) return;
    const filterMovieGenre = movieData?.filter((movie: MovieInterface) => {
      if (movie.genre_ids.includes(Number(selectedGenre))) return movie;
    });
    setFilterMovie(filterMovieGenre);
  }, [selectedGenre, movieData]);

  // select language
  const [selectedLanguage, setSelectedLanguage] = useState();

  const handleSelectLanguage = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(e.target.value);
  };

  const movieLanguages = movieData?.map((movie: MovieInterface) => {
    return movie.original_language;
  });
  const distinctMovieLanguage = [...new Set(movieLanguages)];

  const dropdownBarLanguage = distinctMovieLanguage?.map(
    (language: string, index) => {
      return (
        <option key={index} value={language}>
          {language}
        </option>
      );
    }
  );

  useEffect(() => {
    if (!selectedLanguage) return;
    const filterMovieLanguage = movieData?.filter((movie: MovieInterface) => {
      if (movie.original_language === selectedLanguage) return movie;
    });
    setFilterMovie(filterMovieLanguage);
  }, [selectedLanguage, movieData]);

  return (
    <div className="movie-card-page">
      <div className="search-bar">
        <div className="dropdown">
          <label>
            <p className="select-title">Select genre</p>
            <select value={selectedGenre} onChange={handleSelectGenre}>
              {dropdownBarGenre}
            </select>
          </label>
        </div>
        <div className="dropdown">
          <label>
            <p className="select-title">Select rating</p>
            <select value={selectedRating} onChange={handleSelectRating}>
              {dropdownBarRating}
            </select>
          </label>
        </div>
        <div className="dropdown">
          <label>
            <p className="select-title">Select year</p>
            <select value={selectedYear} onChange={handleSelectYear}>
              {dropdownBarReleaseDate}
            </select>
          </label>
        </div>
        <div className="dropdown">
          <label>
            <p className="select-title">Select language</p>
            <select value={selectedLanguage} onChange={handleSelectLanguage}>
              {dropdownBarLanguage}
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
