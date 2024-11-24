import React, { useEffect, useState } from "react";
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
import { OperatorVo } from "../../types/operator-vo";
import { ResultPageOperator } from "../../types/result-page-operator";

const Home: React.FC = () => {
  const location = useLocation();
  const [brandData, setBrandData] = useState<OperatorVo[]>([]);
  const [bannerData, setBannerData] = useState<OperatorVo[]>([]);
  const [newComicsData, setNewComicsData] = useState<OperatorVo[]>([]);
  const [popularData, setPopularData] = useState<OperatorVo[]>([]);

  useEffect(() => {
    const fetchOperators = async () => {
      try {
        const params = {
          page: 0,
          pageSize: 50
        }
        const response = await fetch(`${process.env.REACT_APP_OPERATOR_URL}?list=${btoa(JSON.stringify(params))}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        const data: ResultPageOperator = await response.json();

        // Distribute data based on componentIndex
        const banner: OperatorVo[] = [];
        const newComics: OperatorVo[] = [];
        const popular: OperatorVo[] = [];
        const brand: OperatorVo[] = [];

        data.data.content.forEach(operator => {
          if (operator.componentIndex === 1) {
            brand.push(operator);
          } else if (operator.componentIndex === 2) {
            newComics.push(operator);
          } else if (operator.componentIndex === 3) {
            popular.push(operator);
          } else if (operator.componentIndex === 0) {
            banner.push(operator);
          }
        });

        setBannerData(banner);
        setNewComicsData(newComics);
        setPopularData(popular);
        setBrandData(brand);
      } catch (error) {
        console.error('Error fetching operators:', error);
      }
    };

    fetchOperators();
  }, []);

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
      <Navbar />
      <SignInAndSignUp />
      <OffcanvasMenu />
      <Banner operators={bannerData} />
      <About />
      <Brand operators={brandData} />
      <NewComics operators={newComicsData} />
      <PopularSection operators={popularData} />
      <div id="price-plan-section">
        <PricePlanSection />
      </div>
      <Footer />
      <CopyRightSection />
    </div>
  )
};

export default Home;
