import React from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import OffcanvasMenu from "./components/OffcanvasMenu/OffcanvasMenu";
import ContactModal from "./components/ContactModal/ContactModal";
import Preloader from "./components/Preloader/Preloader";
import Banner from "./components/Banner/Banner";

function App() {
  return (
    <>
      <Preloader />
      <Navbar />
      <OffcanvasMenu />
      <ContactModal />
      <Banner />
    </>
  );
}

export default App;
