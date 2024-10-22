import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import SignInAndSignUp from "../../components/SignInAndSignUp/SignInAndSignUp";
import OffcanvasMenu from "../../components/OffcanvasMenu/OffcanvasMenu";
import Footer from "../../components/Footer/Footer";
import CopyRightSection from "../../components/CopyRightSection/CopyRightSection";
import ComicDetails from "../../components/ComicDetails/ComicDetails";

const Detail: React.FC = () => {
  return (
    <>
      <Navbar/>
      <SignInAndSignUp/>
      <OffcanvasMenu/>
      <ComicDetails/>
      <Footer/>
      <CopyRightSection/>
    </>
  )
};

export default Detail;
