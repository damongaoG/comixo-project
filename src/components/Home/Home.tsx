import React from "react";
import Banner from "../Banner/Banner";
import Navbar from "../Navbar/Navbar";
import OffcanvasMenu from "../OffcanvasMenu/OffcanvasMenu";
import SignInAndSignUp from "../SignInAndSignUp/SignInAndSignUp";

const Home: React.FC = () => {
  return (
    <div>
      <Navbar/>
      <SignInAndSignUp/>
      <OffcanvasMenu/>
      < Banner/>
    </div>
  )
};

export default Home;
