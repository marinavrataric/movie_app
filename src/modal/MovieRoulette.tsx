import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import Axios from "axios";

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
const GENRE_URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=0b0e8d104f0d6130a4fc67848f89e107&language=en-US`;

const MovieRoulette = (props: Props) => {
  const [isCheck, setIsCheck] = useState(false);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState();

  useEffect(() => {
    Axios.get(GENRE_URL).then((res) => setGenres(res.data.genres));
  }, []);

  const DISCOVER_MOVIE_URL = `https://api.themoviedb.org/3/discover/movie?api_key=0b0e8d104f0d6130a4fc67848f89e107&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${selectedGenre}`;

  const rollMovie = () => {
    Axios.get(DISCOVER_MOVIE_URL).then((res) => console.log(res.data));
  };

  const genreList = genres.map((genre: { name: string; id: number }) => {
    return (
      <div>
        <input
          key={genre.id}
          type="radio"
          value={genre.name}
          name="genre"
          onChange={() => setIsCheck(!isCheck)}
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

  //console.log("genres", genres);
  //console.log("selected genre: ", selectedGenre);
  console.log(isCheck);

  return (
    <Modal isOpen={props.isModalOpen}>
      <ModalHeader>Movie Roullette</ModalHeader>
      <ModalBody>
        <h6>Select genre</h6>
        <div>{genreList}</div>
      </ModalBody>
      <ModalFooter>
        <Button color="success" onClick={rollMovie}>
          Roll
        </Button>
        <Button color="danger" onClick={() => props.setIsModalOpen(false)}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default MovieRoulette;
