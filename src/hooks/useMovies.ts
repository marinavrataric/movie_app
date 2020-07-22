import Axios from "axios";
import { MovieInterface } from "./../interfaces/MovieInterface";
import { useState, useEffect } from "react";
import { constants } from "../constants/GeneralConstans";

interface MovieResponse {
  data: {
    results: MovieInterface[];
  };
}

export const useMovies = (): MovieInterface[] => {
  const [movieData, setMovieData] = useState<MovieInterface[]>();

  useEffect(() => {
    const { POPULAR_MOVIE_URL } = constants;
    Axios.get(POPULAR_MOVIE_URL).then((res: MovieResponse) => {
      const loadedMovieData = res.data.results;
      setMovieData(loadedMovieData);
    });
  }, []);

  return movieData ? movieData : [];
};
