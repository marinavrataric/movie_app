import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import Axios from "axios";
import { Link } from "react-router-dom";
import { MovieInterface } from "../interfaces/MovieInterface";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
}
interface Genre {
  id: number;
  name: string;
}

const BASE_URL = "https://api.themoviedb.org";
const API_KEY = "0b0e8d104f0d6130a4fc67848f89e107";

const MovieRoulette = (props: Props) => {
  const [genres, setGenres] = useState<Genre[]>();
  const [selectedGenre, setSelectedGenre] = useState<number>();
  const [discoverMovie, setDiscoverMovie] = useState<MovieInterface>();

  const GENRE_URL = `${BASE_URL}/3/genre/movie/list?api_key=${API_KEY}`;

  useEffect(() => {
    Axios.get(GENRE_URL).then((res) => setGenres(res.data.genres));
  }, [GENRE_URL]);

  const DISCOVER_MOVIE_URL = `${BASE_URL}/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&with_genres=${selectedGenre}`;

  useEffect(() => {
    const max = 19;
    const randomNumber = Math.floor(Math.random() * max + 1);
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
            setSelectedGenre(genre.id);
          }}
          checked={selectedGenre === genre.id}
        ></input>
        {genre.name}
      </div>
    );
  });

  const shouldDisableRollButton = typeof selectedGenre === "undefined";
  return (
    <Modal isOpen={props.isModalOpen}>
      <ModalHeader>Movie Roullette</ModalHeader>
      <ModalBody>
        <h6>Select genre</h6>
        <div>{genreList}</div>
      </ModalBody>
      <ModalFooter>
        <Button color="success" disabled={shouldDisableRollButton}>
          {discoverMovie ? (
            <Link
              style={{ color: "white", textDecoration: "none" }}
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
