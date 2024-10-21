import React from "react";

const Bookmark: React.FC = () => {
  return (
    <div className="inner-page">
      {/* Bookmark Section */}
      <section id="page-title">
        <div id="backtotop">
          <a href="#page-title" id="backtotop-value">
            <i className="fa-solid fa-arrow-up"></i>
          </a>
        </div>
        <div className="container">
          <div className="row">
            <div className="section-title">
              <div className="row">
                <div className="col-lg-6">
                  <span>Bookmark</span>
                  <h3>Your Favourite Comic Books.</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bookmark Items */}
      <section id="bookmark">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 bookmark-item text-center">
              <img src="/assets/images/comic1.png" alt="comic-img" className="img-fluid"/>
              <h3>Super Knight</h3>
              <a href="#">
                <i className="fa-solid fa-trash"></i>
              </a>
            </div>
            <div className="col-lg-3 col-md-6 bookmark-item text-center">
              <img src="/assets/images/popular2.png" alt="comic-img" className="img-fluid"/>
              <h3>Red Squad VI</h3>
              <a href="#">
                <i className="fa-solid fa-trash"></i>
              </a>
            </div>
            <div className="col-lg-3 col-md-6 bookmark-item text-center">
              <img src="/assets/images/comic3.png" alt="comic-img" className="img-fluid"/>
              <h3>Shadow Fighter</h3>
              <a href="#">
                <i className="fa-solid fa-trash"></i>
              </a>
            </div>
            <div className="col-lg-3 col-md-6 bookmark-item text-center">
              <img src="/assets/images/popular1.png" alt="comic-img" className="img-fluid"/>
              <h3>Nova Nexus</h3>
              <a href="#">
                <i className="fa-solid fa-trash"></i>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
};

export default Bookmark;
