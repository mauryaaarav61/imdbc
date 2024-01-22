import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Link } from "react-router-dom";
import MovieList from "../../components/movieList/movieList";

const PosterContainer = styled.div`
  position: relative;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

const PosterImage = styled.div`
  height: 600px;
  overflow: hidden;
  position: relative;

  @media (max-width: 768px) {
    height: 400px;
  }
`;

const PosterOverlay = styled.div`
  position: absolute;
  padding: 5rem;
  bottom: 0;
  height: 70%;
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: flex-end;
  align-items: flex-start;
  background-image: linear-gradient(rgb(0, 0, 0, 0), rgb(0, 0, 0, 1));
  opacity: 1;
  transition: opacity 0.3s;

  ${PosterContainer}:hover & {
    opacity: 1;
  }

  @media (max-width: 768px) {
    padding: 2rem;
    height: 50%;
  }
`;

const PosterTitle = styled.div`
  font-weight: 900;
  font-size: 4rem;
  margin-bottom: 0.4rem;
  text-align: left;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const PosterRuntime = styled.div`
  font-size: 2rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const PosterRating = styled.div`
  margin-left: 3rem;

  @media (max-width: 768px) {
    margin-left: 1rem;
  }
`;

const PosterDescription = styled.div`
  font-style: italic;
  font-size: 1rem;
  margin-bottom: 0.25rem;
  display: flex;
  text-align: left;
  width: 50%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Home = () => {
    const [ popularMovies, setPopularMovies ] = useState([])

    useEffect(() => {
        fetch("https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US")
        .then(res => res.json())
        .then(data => setPopularMovies(data.results))
    }, [])

    return (
        <PosterContainer>
            <Carousel
                showThumbs={false}
                autoPlay={true}
                transitionTime={3}
                infiniteLoop={true}
                showStatus={false}
            >
                {
                    popularMovies.map(movie => (
                        <Link key={movie.id} style={{textDecoration:"none",color:"white"}} to={`/movie/${movie.id}`} >
                            <PosterImage>
                                <img src={`https://image.tmdb.org/t/p/original${movie && movie.backdrop_path}`} alt={movie ? movie.original_title : ""} loading="lazy" />
                            </PosterImage>
                            <PosterOverlay>
                                <PosterTitle>{movie ? movie.original_title: ""}</PosterTitle>
                                <PosterRuntime>
                                    {movie ? movie.release_date : ""}
                                    <PosterRating>
                                        {movie ? movie.vote_average :""}
                                        <i className="fas fa-star" />{" "}
                                    </PosterRating>
                                </PosterRuntime>
                                <PosterDescription>{movie ? movie.overview : ""}</PosterDescription>
                            </PosterOverlay>
                        </Link>
                    ))
                }
            </Carousel>
            <MovieList />
        </PosterContainer>
    );
}

export default Home;
