import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import SignInAndSignUp from "../../components/SignInAndSignUp/SignInAndSignUp";
import OffcanvasMenu from "../../components/OffcanvasMenu/OffcanvasMenu";
import Footer from "../../components/Footer/Footer";
import CopyRightSection from "../../components/CopyRightSection/CopyRightSection";
import Bookmark from "../../components/Bookmark/Bookmark";

const List: React.FC = () => {
  return (
    <div>
      <Navbar/>
      <SignInAndSignUp/>
      <OffcanvasMenu/>
      <Bookmark/>
      <Footer/>
      <CopyRightSection/>
    </div>
  )
};

export default List;
