import React, { useEffect, useState } from 'react';
import HeaderBar from '../Navbar/Navbar';
import MovCarousel from '../MovieCarousel/MovCarousel';
import Jumbo from '../Jumbo/Jumbo';

const Home = () => {
    return (
        <>
        <HeaderBar/>
        <Jumbo/>
        <MovCarousel/>
    
      </>
    )
    
};

export default Home;
