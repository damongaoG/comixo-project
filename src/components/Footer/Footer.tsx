import React from 'react';
import {Link} from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <section id="footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 footer-logo">
            <Link to="/">Comicloud
            </Link>
            <img src="/assets/images/footer-icon.png" alt="bat-img"/>
          </div>
          <div className="col-lg-3 col-md-4 footer-menu">
            <h3>Quick Link</h3>
            <a href="#">Home Page</a>
            <a href="#about">About</a>
          </div>
          <div className="col-lg-3 col-md-4 footer-menu">
            <h3>Community</h3>
            <a href="#">Career Page</a>
            <a href="#">FAQ</a>
            <a href="#">Supports</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Affiliate Marketing</a>
            <a href="#">Partnership</a>
            <a href="#">Terms & Condition</a>
          </div>
          <div className="col-lg-3 col-md-4 footer-menu">
            <h3>Action Link</h3>
            <a href="#">Payments</a>
            <a href="#">Comic Books</a>
            <a href="#">Community</a>
          </div>
          {/*<div className="col-lg-3 footer-action">
            <h3>Connect Us</h3>
            <div className="footer-social">
              <a href="#"><i className="fa-brands fa-facebook-f"></i></a>
              <a href="#"><i className="fa-brands fa-instagram"></i></a>
              <a href="#"><i className="fa-brands fa-twitter"></i></a>
              <a href="#"><i className="fa-brands fa-youtube"></i></a>
              <a href="#"><i className="fa-brands fa-tiktok"></i></a>
            </div>
            <h3>Get The App</h3>
            <div className="footer-download">
              <a href="#" className="button-primary android"><i className="fa-brands fa-google-play"></i> Play Store</a>
              <a href="#" className="button-primary ios"><i className="fa-brands fa-apple"></i> App Store</a>
            </div>
          </div>*/}
        </div>
      </div>
    </section>
  );
};

export default Footer;
