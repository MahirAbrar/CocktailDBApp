import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMartiniGlass } from "@fortawesome/free-solid-svg-icons";

import DidYouKnow from "../components/DidYouKnow";
import CocktailModal from "../components/CocktailModal";
// Animation
import "../styles/Home.css";

interface HomeProps {}

const Home: React.FC<HomeProps> = (props) => {
  interface ICocktail {
    idDrink: string;
    strDrink: string;
    strDrinkThumb: string;
  }

  interface ISelectedDrink extends ICocktail {}

  const [cocktails, setCocktails] = useState<ICocktail[]>([]);
  const [popularCocktails, setPopularCocktails] = useState<ICocktail[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Add this line

  useEffect(() => {
    const fetchCocktails = async () => {
      const result = await axios.get(
        "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita"
      );

      setCocktails(result.data.drinks.slice(0, 4));
    };

    const fetchPopularDrinks = async () => {
      const result = await axios.get(
        "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=p"
      );
      setPopularCocktails(result.data.drinks.slice(0, 3));
    };
    Promise.all([fetchCocktails(), fetchPopularDrinks()]).then(() => {
      setIsLoading(false); // After both promises resolve, set loading to false
    });
  }, []);

  const [randomDrink, setRandomDrink] = useState<ICocktail | null>(null);
  const [buttonDisabled, setButtonDisabled] = useState(false); // New state for button disabled status

  const getRandomDrink = async () => {
    setButtonDisabled(true);
    const result = await axios.get(
      "https://www.thecocktaildb.com/api/json/v1/1/random.php"
    );
    setRandomDrink(result.data.drinks[0]);
  };

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

  useEffect(() => {
    if (inView1) {
      controls.start("visible");
    }
  }, [controls, inView1]);

  // Modal
  const [showModal, setShowModal] = useState(false);
  const [selectedDrink, setSelectedDrink] = useState<ISelectedDrink | null>(
    null
  );

  if (isLoading) {
    // If isLoading is true, render a loading message
    return <h2>Loading...</h2>;
  } else {
    return (
      <>
        <motion.div
          className="contentBox"
          ref={ref1}
          animate={inView1 ? "visible" : "hidden"}
          initial="hidden"
          transition={{ duration: 2 }}
          variants={{
            visible: { opacity: 1 },
            hidden: { opacity: 0 },
          }}
        >
          {/* Images at the top section */}
          <div className="imageText">
            <div className="imageCircles">
              {cocktails.map((cocktail) => (
                <img
                  src={cocktail.strDrinkThumb}
                  alt={cocktail.strDrink}
                  key={cocktail.idDrink}
                  onClick={() => {
                    setSelectedDrink(cocktail as any);
                    setShowModal(true);
                    console.log(selectedDrink);
                  }}
                />
              ))}
              {showModal && (
                <CocktailModal
                  drink={selectedDrink as any}
                  onClose={() => setShowModal(false)}
                />
              )}
            </div>

            <h3 className="bigText">
              {characters.map((char, index) => (
                // Render each character as a motion.span with a delay
                <motion.span
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="icn"
                >
                  {char}
                </motion.span>
              ))}
            </h3>
          </div>
          <Link to="/cocktails">
            <div className="divButn">
              <button className="findDrink">Find Drink</button>
            </div>
          </Link>
        </motion.div>
        <hr />

        <motion.div
          className="contentBox"
          ref={ref2}
          animate={inView2 ? "visible" : "hidden"}
          initial="hidden"
          transition={{ duration: 2 }}
          variants={{
            visible: { opacity: 1 },
            hidden: { opacity: 0 },
          }}
        >
          <h3 className="bigText">Top Alcoholic Drinks</h3>
          <div className="imageBox">
            {popularCocktails.map((popularCocktail) => (
              <div className="box" key={popularCocktail.idDrink}>
                <img
                  src={popularCocktail.strDrinkThumb}
                  alt={popularCocktail.strDrink}
                />
                <ul>
                  <li>{popularCocktail.strDrink}</li>
                  <li>By: ??</li>
                </ul>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Did you Know DIV */}
        <motion.div
          className="contentBox"
          ref={ref3}
          animate={inView3 ? "visible" : "hidden"}
          initial="hidden"
          transition={{ duration: 2 }}
          variants={{
            visible: { opacity: 1 },
            hidden: { opacity: 0 },
          }}
        >
          <DidYouKnow />
        </motion.div>

        {/* CHOOSE A DRINK FOR ME */}
        <motion.div
          className="contentBox"
          ref={ref4}
          animate={inView4 ? "visible" : "hidden"}
          initial="hidden"
          transition={{ duration: 2 }}
          variants={{
            visible: { opacity: 1 },
            hidden: { opacity: 0 },
          }}
        >
          <h3 className="bigText">Choose a drink for me</h3>
          <div className="divButn">
            <button className="didYouKnow" onClick={getRandomDrink}>
              <FontAwesomeIcon icon={faMartiniGlass} className="icn" />
            </button>
          </div>
          {randomDrink && (
            <div className="randomDrink">
              <img src={randomDrink.strDrinkThumb} alt={randomDrink.strDrink} />
              <h4>{randomDrink.strDrink}</h4>
            </div>
          )}
        </motion.div>
      </>
    );
  }
};

export default Home;
