import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import Cards from "../cards/card";

const MovieListContainer = styled.div`
  padding: 0 1rem 3rem 1rem;

  @media (min-width: 768px) {
    padding: 0 3rem 3rem 3rem;
  }
`;

const ListTitle = styled.h2`
  font-size: 1.75rem;
  margin: 2.5rem;
`;

const ListCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const MovieList = () => {
  const [movieList, setMovieList] = useState([]);
  const { type } = useParams();

  useEffect(() => {
    getData();
  }, [type]);

  const getData = () => {
    fetch(`https://api.themoviedb.org/3/movie/${type ? type : "popular"}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
      .then((res) => res.json())
      .then((data) => setMovieList(data.results));
  };

  return (
    <MovieListContainer>
      <ListTitle>{(type ? type : "POPULAR").toUpperCase()}</ListTitle>
      <ListCards>
        {movieList.map((movie) => (
          <Cards key={movie.id} movie={movie} />
        ))}
      </ListCards>
    </MovieListContainer>
  );
};

export default MovieList;
