import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLocation } from "react-router-dom";
import { Link } from 'react-router-dom';
import "../styles/Home.css"



const Home: React.FC = (props) => {

  const location = useLocation();
  const propsData = location.state;
  console.log(propsData);


  const controls = useAnimation();
  const { ref, inView } = useInView({
    triggerOnce: true, // The animation will be triggered once
  });


  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <>
    <motion.div className='contentBox'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
    >
      <div className="imageText">
        <div className="imageCircles">
          {/* {cocktails.map((cocktail) => (
            <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} key={cocktail.idDrink}/>
          ))} */}
        </div>
        <h3 className='bigText'>Find your perfect drink...</h3>
      </div>
      <Link to="/cocktails">
        <div className="divButn">
          <button className='findDrink'>Find Drink</button>
        </div>
      </Link>
    </motion.div>
    <hr/>
    <motion.div className='contentBox'
        ref={ref}
        animate={controls}
        initial="hidden"
        transition={{ duration: 2 }}
        variants={{
          visible: { opacity: 1 },
          hidden: { opacity: 0 }
        }}
    >
      <h3 className='bigText'>Top Alcoholic Drinks</h3>
      {/* <div className="imageBox">
        {popularCocktails.map((popularCocktail) => (
          <div className='box' key={popularCocktail.idDrink}>
            <img src={popularCocktail.strDrinkThumb} alt={popularCocktail.strDrink}/>
            <ul>
              <li>{popularCocktail.strDrink}</li>
              <li>By: ??</li>
            </ul> 
          </div>
        ))}
      </div> */}
    </motion.div>
    <motion.div className='contentBox'
        ref={ref}
        animate={controls}
        initial="hidden"
        transition={{ duration: 2 }}
        variants={{
          visible: { opacity: 1 },
          hidden: { opacity: 0 }
        }}
    >
      <h3 className='bigText'>Did you know?</h3>
      <div className="divButn">

      <button className='didYouKnow'>Coffee</button>
      </div>
    </motion.div>
    </>
  );
};

export default Home;
