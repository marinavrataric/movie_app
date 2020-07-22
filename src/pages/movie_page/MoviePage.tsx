import React, { useState } from "react";
import MovieInfoCard from "../../components/movie info card/MovieInfoCard";
import MovieRoullette from "../../modal/MovieRoulette";
import "./MoviePage.css";
import SearchBar from "../../components/search-bar/SearchBar";
import { useMovies } from "../../hooks/useMovies";
import { useMoviesWithOptions } from "../../hooks/useMoviesWithOptions";
import {
  MovieDisplayOptionsInterface,
  FilterTypes,
  SortTypes,
} from "../../interfaces/DisplayMovies";

const initialDisplayOptions: MovieDisplayOptionsInterface = {
  filterOption: null,
  sortOption: null,
};

function MoviePage() {
  const numberOfMoviesToLoad = 8;
  const maximumNumberOfMovies = 21;

  const [numberOfMovies, setNumberOfMovies] = useState(numberOfMoviesToLoad);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const movieData = useMovies();

  const [displayOptions, setDisplayOptions] = useState<
    MovieDisplayOptionsInterface
  >(initialDisplayOptions);

  const changeFilterOptions = (
    filterType: FilterTypes,
    value: number | string
  ) => {
    const { filterOption } = displayOptions;
    setDisplayOptions({
      ...displayOptions,
      filterOption: {
        ...filterOption,
        [filterType]: value,
      },
    });
  };

  const changeSortOption = (sortKey: SortTypes, asc: boolean) => {
    setDisplayOptions({
      ...displayOptions,
      sortOption: {
        sortKey,
        asc,
      },
    });
  };

  const filterMovie = useMoviesWithOptions(movieData, displayOptions);

  const loadMovies = () => {
    setNumberOfMovies(numberOfMovies + numberOfMoviesToLoad);
  };

  return (
    <div className="movie-card-page">
      <SearchBar
        movieData={movieData}
        setFilterMovie={changeFilterOptions}
        setSortMovie={changeSortOption}
      />
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
