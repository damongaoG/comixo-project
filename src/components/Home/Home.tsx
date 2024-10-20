import React from "react";
import Banner from "../Banner/Banner";
import Navbar from "../Navbar/Navbar";
import OffcanvasMenu from "../OffcanvasMenu/OffcanvasMenu";
import SignInAndSignUp from "../SignInAndSignUp/SignInAndSignUp";
import About from "../About/About";
import Brand from "../Brand/Brand";
import NewComics from "../NewComics/NewComics";
import PopularSection from "../PopularSection/PopularSection";
import PricePlanSection from "../PricePlanSection/PricePlanSection";

const Home: React.FC = () => {
  return (
    <div>
      <Navbar/>
      <SignInAndSignUp/>
      <OffcanvasMenu/>
      < Banner/>
      <About/>
      <Brand/>
      <NewComics/>
      <PopularSection/>
      <PricePlanSection/>
    </div>
  )
};

export default Home;
