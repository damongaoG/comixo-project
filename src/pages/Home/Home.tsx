import React from "react";
import Banner from "../../components/Banner/Banner";
import Navbar from "../../components/Navbar/Navbar";
import OffcanvasMenu from "../../components/OffcanvasMenu/OffcanvasMenu";
import SignInAndSignUp from "../../components/SignInAndSignUp/SignInAndSignUp";
import About from "../../components/About/About";
import Brand from "../../components/Brand/Brand";
import NewComics from "../../components/NewComics/NewComics";
import PopularSection from "../../components/PopularSection/PopularSection";
import PricePlanSection from "../../components/PricePlanSection/PricePlanSection";
import Footer from "../../components/Footer/Footer";
import CopyRightSection from "../../components/CopyRightSection/CopyRightSection";

const Home: React.FC = () => {
  return (
    <div>
      <Navbar/>
      <SignInAndSignUp/>
      <OffcanvasMenu/>
      <Banner/>
      <About/>
      <Brand/>
      <NewComics/>
      <PopularSection/>
      <div id="price-plan-section">
        <PricePlanSection/>
      </div>
      <Footer/>
      <CopyRightSection/>
    </div>
  )
};

export default Home;
