import React from "react";
import Navbar from "../Navbar/Navbar";
import SignInAndSignUp from "../SignInAndSignUp/SignInAndSignUp";
import OffcanvasMenu from "../OffcanvasMenu/OffcanvasMenu";
import Footer from "../Footer/Footer";
import CopyRightSection from "../CopyRightSection/CopyRightSection";
import Bookmark from "../Bookmark/Bookmark";

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
