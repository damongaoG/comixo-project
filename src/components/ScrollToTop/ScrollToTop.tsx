import {useLocation} from "react-router-dom";
import React, {useEffect} from "react";

const ScrollToTop: React.FC = () => {
  const {pathname} = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
