import React from 'react';
import {Link} from "react-router-dom";

const OffcanvasMenu: React.FC = () => {
  return (
    <div
      className="offcanvas offcanvas-end"
      tabIndex={-1}
      id="offcanvasRight"
      aria-labelledby="offcanvasRightLabel"
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasRightLabel">
          Quick Menu
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body side-menu">
        <form>
          <input
            type="text"
            className="form-control"
            placeholder="Search by Comic Name"
          />
          <button type="submit">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>
        <div className="row">
          <div className="col-lg-6 menu-comic">
            <Link to="/detail">
              <img
                src="/assets/images/comic1.png"
                alt="comic"
                className="img-fluid"
              />
            </Link>
          </div>
          <div className="col-lg-6 menu-comic">
            <Link to="/detail">
              <img
                src="/assets/images/popular1.png"
                alt="comic"
                className="img-fluid"
              />
            </Link>
          </div>
          <div className="col-lg-6 menu-comic">
            <Link to="/detail">
              <img
                src="/assets/images/popular2.png"
                alt="comic"
                className="img-fluid"
              />
            </Link>
          </div>
          <div className="col-lg-6 menu-comic">
            <Link to="/detail">
              <img
                src="/assets/images/comic3.png"
                alt="comic"
                className="img-fluid"
              />
            </Link>
          </div>
        </div>
        <div className="row pt-5">
          <div className="col-lg-12 text-center">
            <Link to="/list" className="button-primary">
              Browse All
            </Link>
          </div>
        </div>
        {/*<div className="social-media mobile-v-hide text-center">
          <p>Follow Us</p>
          <a href="#">
            <i className="fa-brands fa-facebook-f"></i>
          </a>
          <a href="#">
            <i className="fa-brands fa-twitter"></i>
          </a>
          <a href="#">
            <i className="fa-brands fa-twitch"></i>
          </a>
          <a href="#">
            <i className="fa-brands fa-youtube"></i>
          </a>
        </div>*/}
      </div>
    </div>
  );
};

export default OffcanvasMenu;
