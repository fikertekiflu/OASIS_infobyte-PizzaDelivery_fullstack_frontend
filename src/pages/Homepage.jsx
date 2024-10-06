import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import Homemenu from '../components/Homemenu';
import Aboutus from '../components/Aboutus';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Homepage = () => {
    return (
      <div >
        <Header />
        <HeroSection />
        <Homemenu />
        <div id="about">
          <Aboutus/>
        </div>
        <div id="contact">
          <Contact />
        </div>
        <Footer />
        
      </div>
    );
  };
  export default Homepage;
  