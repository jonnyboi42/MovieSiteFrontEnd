import React, { useEffect, useState } from 'react';
import HeaderBar from '../../components/Navbar/Navbar';
import Movies from '../../components/Movies/Movies';
import Jumbo from '../../components/Jumbo/Jumbo';

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
