import React, { useEffect } from 'react';

declare const $: any;

const Banner: React.FC = () => {
  useEffect(() => {
    if ($('.venobox').venobox) {
      $('.venobox').venobox({
        //
      });
    }

    // if ($('.your-slick-class').slick) {
    //   $('.your-slick-class').slick({
    //   });
    // }

  }, []);

  return (
    <section id="banner">
      <div id="backtotop">
        <a href="#banner" id="backtotop-value"><i className="fa-solid fa-arrow-up"></i></a>
      </div>
      <div className="container zindex">
        <div className="row">
          <div className="col-lg-6 banner-txt">
            <span>The Ultimate</span>
            <h3>Comic</h3>
            <h3 className="txt-pos">Book.</h3>
            <a href="#" className="button-primary">Read Now</a>
            {/* <a
              className="venobox button-circular"
              data-autoplay="true"
              data-vbtype="video"
              href="https://www.youtube.com/watch?v=kmh1cr3b4Js"
            >
              <i className="fa-solid fa-play"></i>
            </a> */}
            <div className="row banner-review">
              <div className="col-lg-3">
                <img src="/assets/images/user5.png" alt="user" className="one" />
                <img src="/assets/images/user1.png" alt="user" />
                <img src="/assets/images/user2.png" alt="user" />
              </div>
              <div className="col-lg-4">
                <div className="stars">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star-half-stroke"></i>
                </div>
                <p>(409.6K Reviews)</p>
              </div>
            </div>
          </div>
          <div className="col-10 col-sm-11 col-md-7 col-lg-6 banner-images">
            <img src="/assets/images/banner-icon.png" alt="banner-icon" className="banner-icon" />
            <img src="/assets/images/banner2.png" alt="banner-img" className="banner-img one img-fluid" />
            <img src="/assets/images/banner1.png" alt="banner-img" className="banner-img two img-fluid" />
          </div>
        </div>
      </div>
     {/* <div className="marquee">
        <span className="marquee-1">
          <span className="text">Comic Book<img src="/assets/images/star.png" alt="star" /></span>
          <span className="text">Comic Arts<img src="/assets/images/star.png" alt="star" /></span>
          <span className="text">Comic Book<img src="/assets/images/star.png" alt="star" /></span>
          <span className="text">Comic Arts<img src="/assets/images/star.png" alt="star" /></span>
          <span className="text">Comic Book<img src="/assets/images/star.png" alt="star" /></span>
          <span className="text">Comic Arts<img src="/assets/images/star.png" alt="star" /></span>
          <span className="marquee-2">
            <span className="text">Comic Book<img src="/assets/images/star.png" alt="star" /></span>
            <span className="text">Comic Arts<img src="/assets/images/star.png" alt="star" /></span>
            <span className="text">Comic Book<img src="/assets/images/star.png" alt="star" /></span>
            <span className="text">Comic Arts<img src="/assets/images/star.png" alt="star" /></span>
            <span className="text">Comic Book<img src="/assets/images/star.png" alt="star" /></span>
            <span className="text">Comic Arts<img src="/assets/images/star.png" alt="star" /></span>
          </span>
        </span>
      </div>*/}
    </section>
  );
};

export default Banner;
