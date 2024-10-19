import React, {useEffect} from "react";

declare const $: any;

const Brand: React.FC = () => {
  useEffect(() => {
    const initSlick = () => {
      const $brandMain = $('.brand-main');

      if ($brandMain.length) {
        $brandMain.slick({
          slidesToShow: 4,
          slidesToScroll: 1,
          autoplay: true,
          dots: false,
          arrows: false,
          autoplaySpeed: 2500,
          responsive: [
            {
              breakpoint: 576,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              }
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              }
            },
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              }
            },

          ]
        });
      } else {
        console.error("Element '.brand-main' not found");
      }
    };

    initSlick();

    return () => {
      const $brandMain = $('.brand-main');
      if ($brandMain.length) {
        $brandMain.slick('unslick');
      }
    }
  }, []);
  return (
    <section id="brand">
      <div className="container">
        <div className="brand-main">
          <div className="col-lg-3">
            <img src='/assets/images/brand1.png' alt="brand-img" className="img-fluid"/>
          </div>
          <div className="col-lg-3">
            <img src='/assets/images/brand2.png' alt="brand-img" className="img-fluid"/>
          </div>
          <div className="col-lg-3">
            <img src='/assets/images/brand3.png' alt="brand-img" className="img-fluid"/>
          </div>
          <div className="col-lg-3">
            <img src='/assets/images/brand1.png' alt="brand-img" className="img-fluid"/>
          </div>
          <div className="col-lg-3">
            <img src='/assets/images/brand2.png' alt="brand-img" className="img-fluid"/>
          </div>
        </div>
      </div>
    </section>
  )
};

export default Brand;
