import React, { useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const HeaderContainer = styled.div`
  margin: 0 2.5rem;
  padding: 1rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const StyledHeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  margin: 0 1rem;
  font-size: 1.3rem;
  color: white;
  cursor: pointer;

  &:hover {
    color: red;
  }

  @media (max-width: 768px) {
    margin: 0.5rem 0;
  }
`;

const StyledHeaderIcon = styled.img`
  width: 80px;
  cursor: pointer;
`;

const ToggleButton = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    cursor: pointer;
    font-size: 1.5rem;
    color: white;
    margin-bottom: 1rem;
  }
`;

const Menu = styled.div`
  @media (max-width: 768px) {
    display: ${({ isMenuOpen }) => (isMenuOpen ? "flex" : "none")};
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <HeaderContainer>
      <StyledHeaderLeft>
        <StyledNavLink to="/">
          <StyledHeaderIcon
            className="header__icon"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png"
            alt="IMDb Logo"
          />
        </StyledNavLink>
        <Menu isMenuOpen={isMenuOpen}>
          <StyledNavLink to="/movies/popular">Popular</StyledNavLink>
          <StyledNavLink to="/movies/top_rated">Top Rated</StyledNavLink>
          <StyledNavLink to="/movies/upcoming">Upcoming</StyledNavLink>
          
        </Menu>
        
      </StyledHeaderLeft>
      <ToggleButton onClick={toggleMenu}>
        {isMenuOpen ? "✖" : "☰"}
      </ToggleButton>
    </HeaderContainer>
  );
};

export default Header;
