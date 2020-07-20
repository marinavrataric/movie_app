import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import Axios from "axios";
import { Link } from "react-router-dom";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
}
interface Genre {
  id: number;
  name: string;
}
interface Movie {
  id: string;
  original_language: string;
  title: string;
  release_date: string;
  vote_average: number;
  poster_path: string;
}

const BASE_URL = "https://api.themoviedb.org";
const API_KEY = "0b0e8d104f0d6130a4fc67848f89e107";

const MovieRoulette = (props: Props) => {
  const [isCheck, setIsCheck] = useState(false);
  const [genres, setGenres] = useState<[Genre]>();
  const [selectedGenre, setSelectedGenre] = useState<number>();
  const [discoverMovie, setDiscoverMovie] = useState<Movie>();

  const GENRE_URL = `${BASE_URL}/3/genre/movie/list?api_key=${API_KEY}`;

  useEffect(() => {
    Axios.get(GENRE_URL).then((res) => setGenres(res.data.genres));
  }, [GENRE_URL]);

  const DISCOVER_MOVIE_URL = `${BASE_URL}/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&with_genres=${selectedGenre}`;

  useEffect(() => {
    const min = 0;
    const max = 19;
    const randomNumber = Math.floor(Math.random() * (max - min + 1));
    Axios.get(DISCOVER_MOVIE_URL).then((res) =>
      setDiscoverMovie(res.data.results[randomNumber])
    );
  }, [selectedGenre, DISCOVER_MOVIE_URL]);

  const genreList = genres?.map((genre: Genre) => {
    return (
      <div key={genre.id}>
        <input
          key={genre.id}
          type="radio"
          value={genre.name}
          name="genre"
          onChange={() => {
            setIsCheck(!isCheck);
          }}
          onClick={() => {
            setIsCheck(!isCheck);
            setSelectedGenre(genre.id);
            console.log(genre.name);
          }}
          checked={isCheck}
        ></input>
        {genre.name}
      </div>
    );
  });

  return (
    <Modal isOpen={props.isModalOpen}>
      <ModalHeader>Movie Roullette</ModalHeader>
      <ModalBody>
        <h6>Select genre</h6>
        <div>{genreList}</div>
      </ModalBody>
      <ModalFooter>
        <Button color="success">
          {discoverMovie ? (
            <Link
              to={{
                pathname: `/${discoverMovie.id}`,
                state: discoverMovie,
              }}
            >
              Roll
            </Link>
          ) : (
            "Roll"
          )}
        </Button>
        <Button color="danger" onClick={() => props.setIsModalOpen(false)}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default MovieRoulette;
