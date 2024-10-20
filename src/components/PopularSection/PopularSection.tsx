import React from 'react';
import {Link} from "react-router-dom";

const PopularSection: React.FC = () => {
  return (
    <section id="popular">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 section-title">
            <span>Popular</span>
            <h3>Explore Our Creativity.</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae blanditi.</p>
            <a href="#" className="button-primary">Browse All</a>
          </div>
          <div className="col-lg-6 col-md-9 mobile-m-auto">
            <div className="popular-item">
              <p>2024</p>
              <div className="col-lg-10 ms-auto">
                <img src="/assets/images/popular1.png" alt="comic-book" className="img-fluid"/>
                <Link to="/detail">Shadow Fighter II</Link>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-9 mobile-m-auto">
            <div className="popular-item right">
              <p>2018</p>
              <div className="col-lg-10 me-auto">
                <img src="/assets/images/popular2.png" alt="comic-book" className="img-fluid"/>
                <Link to="/detail">Super Hero V</Link>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-9 ms-auto mobile-m-auto">
            <div className="popular-item">
              <p>2017</p>
              <div className="col-lg-10 ms-auto">
                <img src="/assets/images/popular4.png" alt="comic-book" className="img-fluid"/>
                <Link to="/detail">Power Ranger X</Link>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-9 mobile-m-auto">
            <div className="popular-item right mb-0">
              <p>2016</p>
              <div className="col-lg-10 me-auto">
                <img src="/assets/images/popular3.png" alt="comic-book" className="img-fluid"/>
                <Link to="/detail">Dr. Stranger</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularSection;
