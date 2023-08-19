import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMartiniGlass } from '@fortawesome/free-solid-svg-icons';

// Animation
import "../styles/Home.css"

interface ICocktail {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
}

interface HomeProps {
  cocktail: string;
}


const Home: React.FC<HomeProps> = ( props ) => {

  const [cocktails, setCocktails] = useState<ICocktail[]>([]);
  const [popularCocktails,setPopularCocktails] = useState<ICocktail[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Add this line
  
  useEffect(() => {
    const fetchCocktails = async () => {
      const result = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita');

      setCocktails(result.data.drinks.slice(0, 4));
    };

    const fetchPopularDrinks = async () => {
      const result = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=p")
      setPopularCocktails(result.data.drinks.slice(0, 3));
    }
    Promise.all([fetchCocktails(), fetchPopularDrinks()]).then(() => {
      setIsLoading(false); // After both promises resolve, set loading to false
    });
  }, []);

  const [randomDrink, setRandomDrink] = useState<ICocktail | null>(null);
  const [buttonDisabled, setButtonDisabled] = useState(false); // New state for button disabled status

  const getRandomDrink = async () => {
    setButtonDisabled(true);
    const result = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    setRandomDrink(result.data.drinks[0]);
  }

  useEffect(() => {
    if (buttonDisabled) {
      const timer = setTimeout(() => {
        setButtonDisabled(false); // Enable the button after 3 seconds
      }, 3000);

      return () => {
        clearTimeout(timer); // Clear the timeout if the component unmounts before the 3 seconds are up
      };
    }
  }, [buttonDisabled]);
  
  
  // Animations

  const controls = useAnimation();
  const [ref1, inView1] = useInView({
    triggerOnce: true, 
  });
  
  const [ref2, inView2] = useInView({
    triggerOnce: true, 
  });
  
  const [ref3, inView3] = useInView({
    triggerOnce: true, 
  });
  
  const [ref4, inView4] = useInView({
    triggerOnce: true, 
  });
  

  // Find your perfect drink
    // This is your text
    const text = "Find your perfect drink...";

    // Split the text into an array of characters
    const characters = Array.from(text);

    // Button for coffee, wine
    const buttonTexts = ["Coffee", "Wine", "Cocktail", "Tea"];
    const [buttonTextIndex, setButtonTextIndex] = useState(0); // New state for button text index
    const [anotherIndex, setAnotherIndex] = useState(0)

    const handleButtonClick = () => {
      setButtonTextIndex(prevIndex => (prevIndex + 1) % buttonTexts.length);
    }
    const handleAnotherClick = () => {
      if (buttonTexts[buttonTextIndex] === 'Coffee') {
        const randomFact = Math.floor(Math.random() * coffeeFacts.length);
        setAnotherIndex(randomFact);
      }
      if (buttonTexts[buttonTextIndex] === 'Wine') {
        const randomFact = Math.floor(Math.random() * wineFacts.length);
        setAnotherIndex(randomFact);
      }
      if (buttonTexts[buttonTextIndex] === 'Cocktail') {
        const randomFact = Math.floor(Math.random() * cocktailFacts.length);
        setAnotherIndex(randomFact);
      }
      if (buttonTexts[buttonTextIndex] === 'Tea') {
        const randomFact = Math.floor(Math.random() * teaFacts.length);
        setAnotherIndex(randomFact);
      }
    }
// Facts

      const [coffeeFacts, setCoffeeFacts] = useState([
        { fact: "Coffee is the second most consumed beverage in the world, after water." },
        { fact: "The origin of coffee can be traced back to Ethiopia, where legend has it that a goat herder discovered the energizing effects of coffee beans after his goats consumed them." },
        { fact: "The world's most expensive coffee is called Kopi Luwak, which is made from coffee beans that have been eaten and excreted by a civet cat before being harvested and processed." },
        { fact: "Espresso, a concentrated coffee beverage, was invented in Italy in the early 20th century and is the foundation for many popular coffee drinks such as cappuccinos and lattes." },
      ]);
    
      const [wineFacts, setWineFacts] = useState([
        { fact: "Wine has been produced for thousands of years and is believed to have originated in the region that is now modern-day Iran and Georgia." },
        { fact: "Red wine gets its color from the grape skins, while white wine is made by fermenting the juice without the skins." },
        { fact: "Champagne, a sparkling wine, can only be called Champagne if it comes from the Champagne region in France." },
        { fact: "The oldest bottle of wine in the world is believed to be over 1,600 years old and was discovered in Germany." },
      ]);
    
      const [cocktailFacts, setCocktailFacts] = useState([
        { fact: "The term \"cocktail\" was first defined in 1806 as a mixture of spirits, sugar, water, and bitters." },
        { fact: "The Margarita is one of the most popular cocktails globally and is believed to have been invented in Mexico in the 1930s." },
        { fact: "The Martini, a classic cocktail, is typically made with gin and vermouth and is traditionally garnished with an olive or a lemon twist." },
        { fact: "The iconic Mojito cocktail originated in Cuba and features rum, lime juice, sugar, mint leaves, and soda water." },
      ]);
    
      const [teaFacts, setTeaFacts] = useState([
        { fact: "Tea is the most widely consumed beverage in the world after water." },
        { fact: "All types of tea (green, black, white, oolong) come from the leaves of the Camellia sinensis plant, but they undergo different processing methods." },
        { fact: "Matcha, a type of powdered green tea, is an integral part of the Japanese tea ceremony and is known for its vibrant green color and health benefits." },
        { fact: "In the United Kingdom, afternoon tea is a cherished tradition that typically includes tea served with scones, clotted cream, and various pastries." },
      ]);

      // TODO
      const factSets = {
        'Coffee': coffeeFacts,
        'Wine': wineFacts,
        'Cocktail': cocktailFacts,
        'Tea': teaFacts
    };

  useEffect(() => {
    if (inView1) {
      controls.start("visible");
    }
  }, [controls, inView1]);



  
  if(isLoading) { // If isLoading is true, render a loading message
    return <h2>Loading...</h2>
  } else {
    return (
      <>
      <motion.div className='contentBox'
  ref={ref1}
  animate={inView1 ? "visible" : "hidden"}
  initial="hidden"
  transition={{ duration: 2 }}
  variants={{
    visible: { opacity: 1 },
    hidden: { opacity: 0 }
  }}
>
        <div className="imageText">
          <div className="imageCircles">
            {cocktails.map((cocktail) => (
              <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} key={cocktail.idDrink}/>
            ))}
          </div>
        
          <h3 className='bigText'>
            {characters.map((char, index) => (
              // Render each character as a motion.span with a delay
              <motion.span
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className='icn'
              >
                {char}
              </motion.span>
            ))}
          </h3>


        </div>
        <Link to="/cocktails">
          <div className="divButn">
            <button className='findDrink'>Find Drink</button>
          </div>
        </Link>
      </motion.div>
      <hr/>

      <motion.div className='contentBox'
  ref={ref2}
  animate={inView2 ? "visible" : "hidden"}
  initial="hidden"
  transition={{ duration: 2 }}
  variants={{
    visible: { opacity: 1 },
    hidden: { opacity: 0 }
  }}
>
        <h3 className='bigText'>Top Alcoholic Drinks</h3>
        <div className="imageBox">
          {popularCocktails.map((popularCocktail) => (
            <div className='box' key={popularCocktail.idDrink}>
              <img src={popularCocktail.strDrinkThumb} alt={popularCocktail.strDrink}/>
              <ul>
                <li>{popularCocktail.strDrink}</li>
                <li>By: ??</li>
              </ul> 
            </div>
          ))}
        </div>
      </motion.div>
      <motion.div className='contentBox'
  ref={ref3}
  animate={inView3 ? "visible" : "hidden"}
  initial="hidden"
  transition={{ duration: 2 }}
  variants={{
    visible: { opacity: 1 },
    hidden: { opacity: 0 }
  }}
>
        <h3 className='bigText'>Did you know?</h3>
        <div className="divButn">
        <button className='didYouKnow' onClick={handleButtonClick}>{buttonTexts[buttonTextIndex]}</button>
      </div>
      {buttonTexts[buttonTextIndex] === 'Coffee' && 
  <motion.p 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
  >
    {coffeeFacts[anotherIndex].fact}
  </motion.p>
}

{buttonTexts[buttonTextIndex] === 'Wine' && 
  <motion.p 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
  >
    {wineFacts[anotherIndex].fact}
  </motion.p>
}

{buttonTexts[buttonTextIndex] === 'Cocktail' && 
  <motion.p 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
  >
    {cocktailFacts[anotherIndex].fact}
  </motion.p>
}

{buttonTexts[buttonTextIndex] === 'Tea' && 
  <motion.p 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
  >
    {teaFacts[anotherIndex].fact}
  </motion.p>
}

      <div className="divButn">
        <button className='didYouKnow' onClick={handleAnotherClick}>Another</button>
        </div>
      </motion.div>

{/* CHOOSE A DRINK FOR ME */}
<motion.div className='contentBox'
  ref={ref4}
  animate={inView4 ? "visible" : "hidden"}
  initial="hidden"
  transition={{ duration: 2 }}
  variants={{
    visible: { opacity: 1 },
    hidden: { opacity: 0 }
  }}
>
      <h3 className='bigText'>Choose a drink for me</h3>
      <div className="divButn">
        <button className='didYouKnow' onClick={getRandomDrink}>
          <FontAwesomeIcon icon={faMartiniGlass} className='icn' />
        </button>
        </div>
        {randomDrink && (
          <div className='randomDrink'>
            <img src={randomDrink.strDrinkThumb} alt={randomDrink.strDrink}/>
            <h4>{randomDrink.strDrink}</h4>
          </div>
        )}
    </motion.div>
      </>
    );

  }
};

export default Home;
