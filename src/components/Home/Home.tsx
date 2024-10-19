import React from "react";
import Banner from "../Banner/Banner";
import Navbar from "../Navbar/Navbar";
import OffcanvasMenu from "../OffcanvasMenu/OffcanvasMenu";
import SignInAndSignUp from "../SignInAndSignUp/SignInAndSignUp";
import About from "../About/About";
import Brand from "../Brand/Brand";

const Home: React.FC = () => {
  return (
    <div>
      <Navbar/>
      <SignInAndSignUp/>
      <OffcanvasMenu/>
      < Banner/>
      <About/>
      <Brand/>
    </div>
  )
};

export default Home;
