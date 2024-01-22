import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

const MovieContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MovieIntro = styled.div`
  width: 80%;
`;

const MovieBackdrop = styled.img`
  width: 100%;
  height: 500px;
  object-fit: cover;
  object-position: 0 35%;
`;

const MovieDetail = styled.div`
  align-items: center;
  width: 75%;
  display: flex;
  position: relative;
  bottom: 225px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const MovieDetailLeft = styled.div`
  margin-right: 30px;
`;

const MoviePoster = styled.img`
  width: 300px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.86) 0px 22px 40px 6px;
`;

const MovieDetailRight = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  height: 450px;
  justify-content: space-between;
`;

const MovieDetailTop = styled.div`
  text-shadow: 0px 0px 5px #000000;
  margin-bottom: 0.5rem;
`;

const MovieName = styled.div`
  font-weight: 600;
  font-size: 3rem;
`;

const MovieVoteCount = styled.div`
  margin-left: 1rem;
`;

const MovieGenres = styled.div`
  margin: 1.25rem 0;
  display: flex;
`;

const MovieGenre = styled.span`
  padding: 0.5rem;
  border: 2px solid white;
  border-radius: 20px;
  margin-right: 1rem;
`;

const MovieDetailBottom = styled.div`
  margin: 2rem 0;
  flex: 0.8;
`;

const SynopsisText = styled.div`
  font-size: 1.5rem;
  margin-bottom: 1.25rem;
  font-weight: 600;
  display: flex;
  position: relative;
  align-items: center;

  & > div:last-of-type {
    margin-left: auto;
  }
`;

const MovieLinks = styled.div`
  position: relative;
  bottom: 120px;
  display: flex;
  justify-content: space-between;
  width: 75%;
`;

const MovieHeading = styled.div`
  font-size: 2.2rem;
`;

const MovieButton = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.8rem 2rem;
  border-radius: 20px;
  cursor: pointer;
  width: 150px;
  color: black;
  font-weight: bold;
`;

const MovieHomeButton = styled(MovieButton)`
  background-color: rgb(255, 0, 0);
`;

const MovieImdbButton = styled(MovieButton)`
  background-color: #f3ce13;
`;

const NewTabIcon = styled.i`
  margin-left: 1.4rem;
`;

const MovieProduction = styled.div`
  width: 85%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-bottom: 4rem;
`;

const MovieProductionCompany = styled.img`
  width: 200px;
  margin: 2rem;
`;

const ProductionCompanyImage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Movie = () => {
  const [currentMovieDetail, setMovie] = useState();
  const { id } = useParams();

  useEffect(() => {
    getData();
    window.scrollTo(0, 0);
  }, []);

  const getData = () => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
      .then((res) => res.json())
      .then((data) => setMovie(data));
  };

  return (
    <MovieContainer>
      <MovieIntro>
        <MovieBackdrop src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.backdrop_path : ""}`} />
      </MovieIntro>
      <MovieDetail>
        <MovieDetailLeft>
          <MoviePoster src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.poster_path : ""}`} />
        </MovieDetailLeft>
        <MovieDetailRight>
          <MovieDetailTop>
            <MovieName>{currentMovieDetail ? currentMovieDetail.original_title : ""}</MovieName>
            <div className="movie__tagline">{currentMovieDetail ? currentMovieDetail.tagline : ""}</div>
            <div className="movie__rating">
              {currentMovieDetail ? currentMovieDetail.vote_average : ""} <i className="fas fa-star" />
              <MovieVoteCount>{currentMovieDetail ? `(${currentMovieDetail.vote_count} votes)` : ""}</MovieVoteCount>
            </div>
            <div className="movie__runtime">{currentMovieDetail ? `${currentMovieDetail.runtime} mins` : ""}</div>
            <div className="movie__releaseDate">{currentMovieDetail ? `Release date: ${currentMovieDetail.release_date}` : ""}</div>
            <MovieGenres>
              {currentMovieDetail && currentMovieDetail.genres
                ? currentMovieDetail.genres.map((genre) => (
                    <MovieGenre key={genre.id}>{genre.name}</MovieGenre>
                  ))
                : ""}
            </MovieGenres>
          </MovieDetailTop>
          <MovieDetailBottom>
            <SynopsisText>
              <div>Synopsis</div>
              <div>{currentMovieDetail ? currentMovieDetail.overview : ""}</div>
            </SynopsisText>
          </MovieDetailBottom>
        </MovieDetailRight>
      </MovieDetail>
      <MovieLinks>
        <MovieHeading>Useful Links</MovieHeading>
        {currentMovieDetail && currentMovieDetail.homepage && (
          <a href={currentMovieDetail.homepage} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
            <p>
              <MovieHomeButton>Homepage <NewTabIcon className="fas fa-external-link-alt" /></MovieHomeButton>
            </p>
          </a>
        )}
        {currentMovieDetail && currentMovieDetail.imdb_id && (
          <a href={`https://www.imdb.com/title/${currentMovieDetail.imdb_id}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
            <p>
              <MovieImdbButton>IMDb <NewTabIcon className="fas fa-external-link-alt" /></MovieImdbButton>
            </p>
          </a>
        )}
      </MovieLinks>
      <div className="movie__heading">Production companies</div>
      <MovieProduction>
        {currentMovieDetail && currentMovieDetail.production_companies
          ? currentMovieDetail.production_companies.map((company, index) => (
              <ProductionCompanyImage key={index}>
                {company.logo_path && <MovieProductionCompany src={`https://image.tmdb.org/t/p/original${company.logo_path}`} />}
                <span>{company.name}</span>
              </ProductionCompanyImage>
            ))
          : ""}
      </MovieProduction>
    </MovieContainer>
  );
};

export default Movie;
