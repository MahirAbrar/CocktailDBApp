import { Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import Home from './components/Home';
import AboutUs from './components/AboutUs'
import Cocktails from './components/Cocktails';
import LoginPage from './components/LoginPage';

interface ICocktail {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
}

const Main = () => {



return (         
    <Routes>
      <Route path="/" element={<Home />} />
    <Route path='/cocktails' element={<Cocktails/>} />
    <Route path='/aboutus' element={<AboutUs/>} />
    <Route path='/login' element={<LoginPage />} />
  </Routes>
);
}
export default Main;