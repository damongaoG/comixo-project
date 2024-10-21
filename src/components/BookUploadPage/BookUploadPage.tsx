import Navbar from "../Navbar/Navbar";
import SignInAndSignUp from "../SignInAndSignUp/SignInAndSignUp";
import OffcanvasMenu from "../OffcanvasMenu/OffcanvasMenu";
import Footer from "../Footer/Footer";
import CopyRightSection from "../CopyRightSection/CopyRightSection";
import React from "react";
import UploadBook from "../UploadBook/UploadBook";

const BookUploadPage: React.FC = () => {
  return (
    <div>
      <Navbar/>
      <SignInAndSignUp/>
      <OffcanvasMenu/>
      <UploadBook/>
      <Footer/>
      <CopyRightSection/>
    </div>
  )
};

export default BookUploadPage;
