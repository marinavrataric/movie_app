import { constants } from "../constants/GeneralConstans";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

interface RatingBarValue {
  [key: string]: number;
}

interface Movie {
  id: string;
  original_language: string;
  overview: string;
  poster_path: string;
  title: string;
  vote_average: number | null;
  popularity: number | null;
  release_date: string;
}

export function useMovieRating(): [number | null, (value: number) => void] {
  const getStorage = () => {
    const parsed = JSON.parse(
      localStorage.getItem(constants.ratingBarLocalStorageKey) || ""
    );
    return parsed || {};
  };

  const location = useLocation<Movie>();

  const [movieData, setMovieData] = useState<Movie>(location.state);

  const [ratingValues, setRatingValues] = useState<RatingBarValue>(
    getStorage()
  );

  const handleRating = (ratingNumber: number) => {
    setRatingValues({ ...ratingValues, [movieData.id]: ratingNumber });
    localStorage.setItem(
      constants.ratingBarLocalStorageKey,
      JSON.stringify({ ...ratingValues, [movieData.id]: ratingNumber })
    );
  };

  useEffect(() => {
    setMovieData(location.state);
  }, [location.state]);

  const movieRating = ratingValues && ratingValues[movieData.id];
  const movieRatingNulled =
    typeof movieRating === "undefined" ? null : movieRating;

  return [movieRatingNulled, handleRating];
}
