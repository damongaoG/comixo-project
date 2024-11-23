import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
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
  const location = useLocation();

  useEffect(() => {
    if (location.state && (location.state as any).scrollTo === 'price-plan-section') {
      setTimeout(() => {
        const element = document.getElementById('price-plan-section');
        if (element) {
          const headerOffset = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
          
          window.history.replaceState({}, document.title);
        }
      }, 100);
    }
  }, [location]);

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
