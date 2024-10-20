import React from 'react';

const ComicDetails: React.FC = () => {
  return (
    <>
      {/* Page Title Section */}
      <section id="page-title">
        <div id="backtotop">
          <a href="#page-title" id="backtotop-value">
            <i className="fa-solid fa-arrow-up"></i>
          </a>
        </div>
      </section>

      {/* Comic Details Section */}
      <section id="comic-details">
        <div className="container zindex">
          <div className="row details-pos">
            <div className="col-lg-5 comic-detail-img">
              <img
                src="/assets/images/comic1.png"
                alt="comic-img"
                className="img-fluid"
              />
            </div>
            <div className="col-lg-6 comic-detail-txt">
              <div className="stars">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star-half-stroke"></i>
                <span>4.5</span>
              </div>
              <h3>Shadow Fighter V: Comic Book.</h3>
              <span>Storyline</span>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore earum
                perferendis veritatis totam cupiditate excepturi delectus, ullam iste.
                Accusantium nobis, repellendus alias fugit excepturi iure!
              </p>
              <h4>$236.24</h4>
              {/*<a href="cart.html" className="button-primary">Add To Cart</a>*/}
              <a href="bookmark.html" className="bookmark-btn">
                <i className="fa-solid fa-bookmark"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Marquee Section */}
        {/*<div className="marquee">
                    <span className="marquee-1">
                        <span className="text">
                            Comic Book
                            <img src="images/star.png" alt="star" />
                        </span>
                        <span className="text">
                            Comic Arts
                            <img src="images/star.png" alt="star" />
                        </span>
                        <span className="text">
                            Comic Book
                            <img src="images/star.png" alt="star" />
                        </span>
                        <span className="text">
                            Comic Arts
                            <img src="images/star.png" alt="star" />
                        </span>
                        <span className="text">
                            Comic Book
                            <img src="images/star.png" alt="star" />
                        </span>
                        <span className="text">
                            Comic Arts
                            <img src="images/star.png" alt="star" />
                        </span>
                    </span>
          <span className="marquee-2">
                        <span className="text">
                            Comic Book
                            <img src="images/star.png" alt="star" />
                        </span>
                        <span className="text">
                            Comic Arts
                            <img src="images/star.png" alt="star" />
                        </span>
                        <span className="text">
                            Comic Book
                            <img src="images/star.png" alt="star" />
                        </span>
                        <span className="text">
                            Comic Arts
                            <img src="images/star.png" alt="star" />
                        </span>
                        <span className="text">
                            Comic Book
                            <img src="images/star.png" alt="star" />
                        </span>
                        <span className="text">
                            Comic Arts
                            <img src="images/star.png" alt="star" />
                        </span>
                    </span>
        </div>*/}
      </section>
    </>
  );
};

export default ComicDetails;
