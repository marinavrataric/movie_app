const BASE_URL = "https://api.themoviedb.org";
const API_KEY = "0b0e8d104f0d6130a4fc67848f89e107";

export const constants = {
  ratingBarLocalStorageKey: "rating bar",
  BASE_URL,
  API_KEY,
  POPULAR_MOVIE_URL: `${BASE_URL}/3/movie/popular?api_key=${API_KEY}`,
};
