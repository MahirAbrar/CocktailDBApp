import React, { useState } from "react";
import { motion } from "framer-motion";

// TODO
// const factSets = {
//   'Coffee': coffeeFacts,
//   'Wine': wineFacts,
//   'Cocktail': cocktailFacts,
//   'Tea': teaFacts
// };

interface DidYouKnowProps {}

const DidYouKnow: React.FC<DidYouKnowProps> = () => {
  // states
  const buttonTexts = ["Coffee", "Wine", "Cocktail", "Tea"];
  const [anotherIndex, setAnotherIndex] = useState(0);
  const [buttonTextIndex, setButtonTextIndex] = useState(0); // New state for button text index
  const [factIndex, setFactIndex] = useState(0);

  // functions

  const handleButtonClick = () => {
    setButtonTextIndex((prevIndex) => (prevIndex + 1) % buttonTexts.length);
  };

  const handleAnotherClick = () => {
    if (buttonTexts[buttonTextIndex] === "Coffee") {
      const randomFact = Math.floor(Math.random() * coffeeFacts.length);
      setAnotherIndex(randomFact);
    }
    if (buttonTexts[buttonTextIndex] === "Wine") {
      const randomFact = Math.floor(Math.random() * wineFacts.length);
      setAnotherIndex(randomFact);
    }
    if (buttonTexts[buttonTextIndex] === "Cocktail") {
      const randomFact = Math.floor(Math.random() * cocktailFacts.length);
      setAnotherIndex(randomFact);
    }
    if (buttonTexts[buttonTextIndex] === "Tea") {
      const randomFact = Math.floor(Math.random() * teaFacts.length);
      setAnotherIndex(randomFact);
    }
  };

  const [coffeeFacts, setCoffeeFacts] = useState([
    {
      fact:
        "Coffee is the second most consumed beverage in the world, after water.",
    },
    {
      fact:
        "The origin of coffee can be traced back to Ethiopia, where legend has it that a goat herder discovered the energizing effects of coffee beans after his goats consumed them.",
    },
    {
      fact:
        "The world's most expensive coffee is called Kopi Luwak, which is made from coffee beans that have been eaten and excreted by a civet cat before being harvested and processed.",
    },
    {
      fact:
        "Espresso, a concentrated coffee beverage, was invented in Italy in the early 20th century and is the foundation for many popular coffee drinks such as cappuccinos and lattes.",
    },
  ]);

  const [wineFacts, setWineFacts] = useState([
    {
      fact:
        "Wine has been produced for thousands of years and is believed to have originated in the region that is now modern-day Iran and Georgia.",
    },
    {
      fact:
        "Red wine gets its color from the grape skins, while white wine is made by fermenting the juice without the skins.",
    },
    {
      fact:
        "Champagne, a sparkling wine, can only be called Champagne if it comes from the Champagne region in France.",
    },
    {
      fact:
        "The oldest bottle of wine in the world is believed to be over 1,600 years old and was discovered in Germany.",
    },
  ]);

  const [cocktailFacts, setCocktailFacts] = useState([
    {
      fact:
        'The term "cocktail" was first defined in 1806 as a mixture of spirits, sugar, water, and bitters.',
    },
    {
      fact:
        "The Margarita is one of the most popular cocktails globally and is believed to have been invented in Mexico in the 1930s.",
    },
    {
      fact:
        "The Martini, a classic cocktail, is typically made with gin and vermouth and is traditionally garnished with an olive or a lemon twist.",
    },
    {
      fact:
        "The iconic Mojito cocktail originated in Cuba and features rum, lime juice, sugar, mint leaves, and soda water.",
    },
  ]);

  const [teaFacts, setTeaFacts] = useState([
    {
      fact:
        "Tea is the most widely consumed beverage in the world after water.",
    },
    {
      fact:
        "All types of tea (green, black, white, oolong) come from the leaves of the Camellia sinensis plant, but they undergo different processing methods.",
    },
    {
      fact:
        "Matcha, a type of powdered green tea, is an integral part of the Japanese tea ceremony and is known for its vibrant green color and health benefits.",
    },
    {
      fact:
        "In the United Kingdom, afternoon tea is a cherished tradition that typically includes tea served with scones, clotted cream, and various pastries.",
    },
  ]);
  return (
    <>
      <h3 className="bigText">Did you know?</h3>
      <div className="divButn">
        <button className="didYouKnow" onClick={handleButtonClick}>
          {buttonTexts[buttonTextIndex]}
        </button>
      </div>
      {buttonTexts[buttonTextIndex] === "Coffee" && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {coffeeFacts[anotherIndex].fact}
        </motion.p>
      )}

      {buttonTexts[buttonTextIndex] === "Wine" && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {wineFacts[anotherIndex].fact}
        </motion.p>
      )}

      {buttonTexts[buttonTextIndex] === "Cocktail" && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {cocktailFacts[anotherIndex].fact}
        </motion.p>
      )}

      {buttonTexts[buttonTextIndex] === "Tea" && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {teaFacts[anotherIndex].fact}
        </motion.p>
      )}

      <div className="divButn">
        <button className="didYouKnow" onClick={handleAnotherClick}>
          Another
        </button>
      </div>
    </>
  );
};

export default DidYouKnow;
