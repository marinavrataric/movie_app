import React, { useState, FormEvent, useEffect, ChangeEvent } from "react";
import Dropdown from "../../components/dropdown/Dropdown";
import { MovieGenresInterface } from "../../interfaces/MovieGenreInterface";
import { MovieInterface } from "../../interfaces/MovieInterface";
import { Input } from "reactstrap";
import { MovieGenres } from "../../constants/MovieGenres";
import { FilterTypes, SortTypes } from "../../interfaces/DisplayMovies";

interface Props {
  movieData: MovieInterface[];
  setFilterMovie: (filterType: FilterTypes, value: number | string) => void;
  setSortMovie: (sortType: SortTypes, asc: boolean) => void;
}

const SearchBar = (props: Props) => {
  const [inputSearchText, setInputSearchText] = useState("");
  const [selectedYear, setSelectedYear] = useState();

  // filter search movie
  const inputSearchTextLowerCase = inputSearchText.toLowerCase();

  const handleSumbitSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.setFilterMovie(FilterTypes.Keyword, inputSearchTextLowerCase);
    setInputSearchText("");
  };

  // select year
  const mapSlicedYears = props.movieData?.map((movie: MovieInterface) =>
    movie.release_date.slice(0, 4)
  );
  const distinctYearAlternative = [...new Set(mapSlicedYears)];

  const dropdownBarYear = distinctYearAlternative
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
    props.setFilterMovie(FilterTypes.Year, selectedYear);
  }, [selectedYear]);

  // select rating
  const [selectedRating, setSlectedRating] = useState();

  const handleSelectRating = (e: ChangeEvent<HTMLSelectElement>) => {
    setSlectedRating(e.target.value);
  };

  const movieRating = props.movieData?.map(
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
    props.setFilterMovie(FilterTypes.Rating, selectedRating);
  }, [selectedRating]);

  // select genre
  const [selectedGenre, setSelectedGenre] = useState();

  const handleSelectGenre = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedGenre(e.target.value);
  };

  const dropdownBarGenres = MovieGenres.map((genre: MovieGenresInterface) => {
    return (
      <option key={genre.id} value={genre.id}>
        {genre.name}
      </option>
    );
  });

  useEffect(() => {
    if (!selectedGenre) return;
    props.setFilterMovie(FilterTypes.Genre, selectedGenre);
  }, [selectedGenre]);

  // select language
  const [selectedLanguage, setSelectedLanguage] = useState();

  const handleSelectLanguage = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(e.target.value);
  };

  const movieLanguages = props.movieData?.map((movie: MovieInterface) => {
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
    props.setFilterMovie(FilterTypes.Language, selectedLanguage);
  }, [selectedLanguage]);

  // sort by name
  const [selectedSorting, setSelectedSorting] = useState("");

  const handleSelectSorting = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedSorting(e.target.value);
  };

  useEffect(() => {
    if (!selectedSorting) return;

    switch (selectedSorting) {
      case "Name":
        return props.setSortMovie(SortTypes.Name, true);
      case "Year":
        return props.setSortMovie(SortTypes.Year, true);
      case "Name des":
        return props.setSortMovie(SortTypes.Name, false);
      case "Year des":
        return props.setSortMovie(SortTypes.Year, false);
    }
  }, [selectedSorting]);

  const sortingNameArray = ["Name", "Year", "Name des", "Year des"];

  const dropdownBarSort = sortingNameArray.map((sortName: string, index) => {
    {
      return (
        <option key={index} value={sortName}>
          {sortName}
        </option>
      );
    }
  });

  return (
    <div className="search-bar">
      <Dropdown
        selectedValue={selectedGenre}
        dropdownName="Select genre"
        dropdownBarList={dropdownBarGenres}
        handleSelectValue={handleSelectGenre}
      />
      <Dropdown
        selectedValue={selectedRating}
        dropdownName="Select rating"
        dropdownBarList={dropdownBarRating}
        handleSelectValue={handleSelectRating}
      />
      <Dropdown
        selectedValue={selectedYear}
        dropdownName="Select year"
        dropdownBarList={dropdownBarYear}
        handleSelectValue={handleSelectYear}
      />
      <Dropdown
        selectedValue={selectedLanguage}
        dropdownName="Select language"
        dropdownBarList={dropdownBarLanguage}
        handleSelectValue={handleSelectLanguage}
      />
      <Dropdown
        selectedValue={selectedSorting}
        dropdownName="Sort by"
        dropdownBarList={dropdownBarSort}
        handleSelectValue={handleSelectSorting}
      />
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
  );
};

export default SearchBar;
