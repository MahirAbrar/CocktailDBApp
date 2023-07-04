import React, { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import "../styles/Home.css"

interface ICocktail {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
}

const Home: React.FC = () => {
  const [cocktails, setCocktails] = useState<ICocktail[]>([]);

  useEffect(() => {
    const fetchCocktails = async () => {
      const result = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita');

      setCocktails(result.data.drinks.slice(0, 4));
    };

    fetchCocktails();
  }, []);

  return (
    <div className='topcontent'>
      <div className="imageText">
      <div className="imageCircles">
      {cocktails.map((cocktail) => (
          <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} key={cocktail.idDrink}/>
      ))}
      </div>
      {/* Add animation to the dot here */}
      <h3 className='findPerfDrink'>Find your perfect drink...</h3>
      </div>
      
      <div className="searchSection">
        <h3>What are you in the mood for today?</h3>
        <div className="selectedAlc">
        <h3>Selected</h3>
        <button>Alcoholic</button>
        </div>
        <div className="search-container">
      <input type="text" placeholder="Search..." className="search-input" />
      <button className="search-button">
        Search
      </button>
    </div>
      </div>
    </div>
  );
};

export default Home;
