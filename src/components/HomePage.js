// src/components/HomePage.js

import React from 'react';
import Header from './Header';
import HeroSection from './HeroSection';
import Features from './Features';
import AntiRaggingPolicy from './AntiRaggingPolicy';
import ImmediateHelp from './ImmediateHelp';

const HomePage = () => {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <Features />
        <AntiRaggingPolicy />
        <ImmediateHelp />
      </main>
    </>
  );
};

export default HomePage;