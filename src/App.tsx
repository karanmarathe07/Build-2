import React from 'react';
import Hero from './components/Hero';
import LineStackAnimation from './components/LineStackAnimation';
import NavbarWithPanel from './components/NavbarWithPanel';
import './index.css';

function App() {
  return (
    <>
      <NavbarWithPanel />
      <Hero />
      <LineStackAnimation />
    </>
  );
}

export default App;
