import React, { useState, FormEvent, useEffect, ChangeEvent } from "react";
import Dropdown from "../../components/dropdown/Dropdown";
import { MovieGenresInterface } from "../../interfaces/MovieGenreInterface";
import { MovieInterface } from "../../interfaces/MovieInterface";
import { Input } from "reactstrap";
import { MovieGenres } from "../../constants/MovieGenres";

interface Props {
  movieData: MovieInterface[] | undefined;
  setFilterMovie: (filterMovie: MovieInterface[]) => void;
}

const SearchBar = (props: Props) => {
  const [inputSearchText, setInputSearchText] = useState("");
  const [selectedYear, setSelectedYear] = useState();

  // filter search movie
  const inputSearchTextLowerCase = inputSearchText.toLocaleLowerCase();

  const handleSumbitSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const filterMovieSearch = props.movieData?.filter((movie: MovieInterface) =>
      movie.title.toLocaleLowerCase().includes(inputSearchTextLowerCase)
    );
    filterMovieSearch && props.setFilterMovie(filterMovieSearch);
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
    const filterMovieYear = props.movieData?.filter((movie: MovieInterface) =>
      movie.release_date.startsWith(selectedYear)
    );
    filterMovieYear && props.setFilterMovie(filterMovieYear);
  }, [selectedYear, props.movieData]);

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
    const filterMovieRating = props.movieData?.filter(
      (movie: MovieInterface) => {
        if (movie.vote_average.toString() === selectedRating) return movie;
      }
    );
    filterMovieRating && props.setFilterMovie(filterMovieRating);
  }, [selectedRating, props.movieData]);

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
    const filterMovieGenre = props.movieData?.filter(
      (movie: MovieInterface) => {
        if (movie.genre_ids.includes(Number(selectedGenre))) return movie;
      }
    );
    filterMovieGenre && props.setFilterMovie(filterMovieGenre);
  }, [selectedGenre, props.movieData]);

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
    const filterMovieLanguage = props.movieData?.filter(
      (movie: MovieInterface) => {
        if (movie.original_language === selectedLanguage) return movie;
      }
    );
    filterMovieLanguage && props.setFilterMovie(filterMovieLanguage);
  }, [selectedLanguage, props.movieData]);

  return (
    <div className="search-bar">
      <Dropdown
        selectedValue={selectedGenre}
        dropdownName="genre"
        dropdownBarList={dropdownBarGenres}
        handleSelectValue={handleSelectGenre}
      />
      <Dropdown
        selectedValue={selectedRating}
        dropdownName="rating"
        dropdownBarList={dropdownBarRating}
        handleSelectValue={handleSelectRating}
      />
      <Dropdown
        selectedValue={selectedYear}
        dropdownName="year"
        dropdownBarList={dropdownBarYear}
        handleSelectValue={handleSelectYear}
      />
      <Dropdown
        selectedValue={selectedLanguage}
        dropdownName="language"
        dropdownBarList={dropdownBarLanguage}
        handleSelectValue={handleSelectLanguage}
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
