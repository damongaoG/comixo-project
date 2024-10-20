import React from "react";
import Navbar from "../Navbar/Navbar";
import SignInAndSignUp from "../SignInAndSignUp/SignInAndSignUp";
import OffcanvasMenu from "../OffcanvasMenu/OffcanvasMenu";
import Footer from "../Footer/Footer";
import CopyRightSection from "../CopyRightSection/CopyRightSection";
import ComicDetails from "../ComicDetails/ComicDetails";

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
