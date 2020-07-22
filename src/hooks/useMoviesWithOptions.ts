import {
  MovieDisplayOptionsInterface,
  FilterTypes,
  SortTypes,
} from "./../interfaces/DisplayMovies";
import { MovieInterface } from "./../interfaces/MovieInterface";
import { useMemo } from "react";

export const useMoviesWithOptions = (
  allMovies: MovieInterface[],
  options: MovieDisplayOptionsInterface
): MovieInterface[] => {
  let movies = [...allMovies];

  const handleFilters = () => {
    const { filterOption } = options;
    if (filterOption === null) return;

    /*filterOption = {
        [FilterTypes.Keyword]: 'Joker',
        [FilterTypes.Language]: 'en'
    }*/

    const filtersNumber = Object.values(filterOption).filter((val) => val)
      .length;

    movies = movies.filter((movie: MovieInterface) => {
      let filtersPassed = 0;
      for (const key in filterOption) {
        const currentFilterValue = filterOption[key];

        if (!currentFilterValue) continue;

        if (
          key === FilterTypes.Genre &&
          movie.genre_ids.includes(Number(currentFilterValue))
        ) {
          filtersPassed++;
        }
        if (
          key === FilterTypes.Language &&
          movie.original_language === currentFilterValue
        ) {
          filtersPassed++;
        }
        if (
          key === FilterTypes.Rating &&
          movie.vote_average === Number(currentFilterValue)
        ) {
          filtersPassed++;
        }
        if (
          key === FilterTypes.Year &&
          movie.release_date.startsWith(currentFilterValue)
        ) {
          filtersPassed++;
        }

        if (
          key === FilterTypes.Keyword &&
          movie.title.toLowerCase().includes(currentFilterValue)
        ) {
          filtersPassed++;
        }
      }
      return filtersPassed === filtersNumber;
    });
  };

  const handleSorting = () => {
    const { sortOption } = options;
    console.log("sortOption", sortOption);
    if (sortOption === null) return;
    if (sortOption.sortKey === SortTypes.Year) {
      const yearDigits = 4;
      movies.sort(
        (a: MovieInterface, b: MovieInterface) =>
          (Number(a.release_date.slice(0, yearDigits)) >
          Number(b.release_date.slice(0, yearDigits))
            ? -1
            : 1) * (sortOption.asc ? 1 : -1)
      );
    } else if (sortOption.sortKey === SortTypes.Name) {
      movies.sort(
        (a: MovieInterface, b: MovieInterface) =>
          (a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1) *
          (sortOption.asc ? 1 : -1)
      );
    }
  };

  const handleOptions = () => {
    handleFilters();
    handleSorting();
    return movies;
  };

  const appliedFilters = useMemo(() => handleOptions(), [movies, options]);
  return appliedFilters;
};
