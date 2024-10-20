import React from 'react';

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
                <a href="comic_details.html">Shadow Fighter II</a>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-9 mobile-m-auto">
            <div className="popular-item right">
              <p>2018</p>
              <div className="col-lg-10 me-auto">
                <img src="/assets/images/popular2.png" alt="comic-book" className="img-fluid"/>
                <a href="comic_details.html">Super Hero V</a>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-9 ms-auto mobile-m-auto">
            <div className="popular-item">
              <p>2017</p>
              <div className="col-lg-10 ms-auto">
                <img src="/assets/images/popular4.png" alt="comic-book" className="img-fluid"/>
                <a href="comic_details.html">Power Ranger X</a>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-9 mobile-m-auto">
            <div className="popular-item right mb-0">
              <p>2016</p>
              <div className="col-lg-10 me-auto">
                <img src="/assets/mages/popular3.png" alt="comic-book" className="img-fluid"/>
                <a href="comic_details.html">Dr. Stranger</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularSection;
