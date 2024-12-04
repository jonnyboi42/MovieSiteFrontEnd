import React, { useEffect, useState } from 'react';
import HeaderBar from '../Navbar/Navbar';
import Movies from '../Movies/Movies';
import Jumbo from '../Jumbo/Jumbo';

const HomePage = () => {
    return (
        <>
        <HeaderBar/>
        <Jumbo/>
        <Movies/>
    
      </>
    )
    
};

export default HomePage;
