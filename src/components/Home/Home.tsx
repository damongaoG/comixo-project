import React from "react";
import Banner from "../Banner/Banner";
import Navbar from "../Navbar/Navbar";
import OffcanvasMenu from "../OffcanvasMenu/OffcanvasMenu";

const Home: React.FC = () => {
  return (
    <div>
      <Navbar/>
      <OffcanvasMenu/>
      < Banner/>
    </div>
  )
};

export default Home;
