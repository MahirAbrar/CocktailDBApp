import React, { useState, useEffect } from 'react';
import { Link} from 'react-router-dom';

import "../styles/Header.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChampagneGlasses } from '@fortawesome/free-solid-svg-icons';

export default function Header() {
  return (
    <>  
      <div className='navBar'>
        <Link to="/" >
        <div className='logo'>
        <FontAwesomeIcon icon={faChampagneGlasses} size="3x" />
          <h2 id='logoName'>Drink<br/>S4U</h2>
        </div>
        </Link>

        <ul>
          <li><Link to='/'>Home</Link> </li>
          <li><Link to='/cocktails'>Cocktails</Link></li>
          <li><Link to='/aboutUs'>About Us</Link></li>
        </ul>
        <Link to='/login'>
        <button className='btn'> Login</button>
        </Link>
      </div>  
    </>
  )
}