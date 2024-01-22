import React, { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Link } from "react-router-dom";
import styled from "styled-components";

const CardWrapper = styled.div`
  display: inline-block;
  transition: transform 0.2s;
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  margin: 1rem;
  cursor: pointer;
  width: 100%;  
 
  max-width: 300px; 
  height: 400px;
  z-index: 0;
  border: 1px solid rgb(99, 99, 99);

  &:hover {
    transform: scale(1.2);
    z-index: 1000;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
      rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  }
`;

const CardImage = styled.img`
  height: 400px;
  width:400px;
  
`;

const CardOverlay = styled.div`
  position: absolute;
  padding: 0 1rem 1rem 1rem;
  bottom: 0;
  height: 290px;
  display: flex;
  flex-direction: column;
 
  justify-content: flex-end;
  background-image: linear-gradient(rgb(0, 0, 0, 0), rgb(0, 0, 0, 1));
  opacity: 0;
  transition: opacity 0.2s;

  ${CardWrapper}:hover & {
    opacity: 1;
  }
`;

const CardTitle = styled.div`
  font-weight: 900;
  font-size: 1rem;
  margin-bottom: 0.4rem;
`;

const CardRuntime = styled.div`
  font-size: 0.75rem;
  margin-bottom: 0.25rem;
`;

const CardRating = styled.span`
  float: right;
`;

const CardDescription = styled.div`
  font-style: italic;
  font-size: 0.75rem;
  margin-bottom: 0.25rem;
`;

const Cards = ({ movie }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <>
      {isLoading ? (
        <CardWrapper>
          <SkeletonTheme color="#202020" highlightColor="#444">
            <Skeleton height={300} duration={2} />
          </SkeletonTheme>
        </CardWrapper>
      ) : (
        <Link to={`/movie/${movie.id}`} style={{ textDecoration: "none", color: "white" }}>
          <CardWrapper>
            <CardImage
              className="cards__img"
              src={`https://image.tmdb.org/t/p/original${movie ? movie.poster_path : ""}`}
              alt={movie ? movie.original_title : ""}
              loading="lazy"
            />
            <CardOverlay>
              <CardTitle>{movie ? movie.original_title : ""}</CardTitle>
              <CardRuntime>
                {movie ? movie.release_date : ""}
                <CardRating>{movie ? movie.vote_average : ""}<i className="fas fa-star" /></CardRating>
              </CardRuntime>
              <CardDescription>{movie ? movie.overview.slice(0, 118) + "..." : ""}</CardDescription>
            </CardOverlay>
          </CardWrapper>
        </Link>
      )}
    </>
  );
};

export default Cards;
