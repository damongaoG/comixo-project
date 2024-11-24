import React, { useEffect } from "react";
import { OperatorVo } from "../../types/operator-vo";

declare const $: any;

interface BrandProps {
  operators: OperatorVo[];
}

const Brand: React.FC<BrandProps> = ({ operators }) => {
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
  }, [operators]);

  const sortedOperators = [...operators].sort((a, b) =>
    (a.widgetIndex || 0) - (b.widgetIndex || 0)
  );

  return (
    <section id="brand">
      <div className="container">
        <div className="brand-main">
          {sortedOperators.map((operator) => (
            <div key={operator.id} className="col-lg-3">
              <img
                src={operator.imageURL}
                alt={operator.title}
                style={{ width: '324px', height: '165px', objectFit: 'contain', background: 'black' }}
                className="img-fluid"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
};

export default Brand;
