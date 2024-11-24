import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { OperatorVo } from "../../types/operator-vo";

declare const $: any;

interface NewComicsProps {
  operators: OperatorVo[];
}

const NewComics: React.FC<NewComicsProps> = ({ operators }) => {
  useEffect(() => {
    $('.venobox .veno-img').venobox({
      numeration: true,
      infinigall: true,
      share: true,
    });
  }, []);

  const sortedOperators = [...operators].sort((a, b) => 
    (a.widgetIndex ?? 0) - (b.widgetIndex ?? 0)
  );

  return (
    <section id="new-comics">
      <div className="container">
        <div className="row">
          <div className="section-title t-white">
            <div className="row">
              <div className="col-lg-6 m-auto text-center">
                <span>New Comics</span>
                <h3>Enjoy Newest Comic Books.</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="row comic-item-pos">
          {sortedOperators.map((operator) => (
            <div key={operator.id} className="col-lg-4 col-md-8 mobile-m-auto">
              <div className="comic-item">
                <img
                  style={{ width: '392px', height: '490px', objectFit: 'contain', background: 'black' }}
                  src={operator.imageURL}
                  alt={operator.title}
                  className="img-fluid"
                />
                <a
                  className="venobox veno-img"
                  data-gall="comic1"
                  href={operator.imageURL}
                >
                </a>
                <div className="comic-item-details">
                  <div className="row">
                    <div className="col-8 col-lg-8">
                      <h3>{operator.title.length > 50 ? `${operator.title.substring(0, 50)}...` : operator.title}</h3>
                    </div>
                    <div className="col-4 col-lg-4 text-end">
                      <Link to="/detail">
                        <i className="fa-solid fa-arrow-right"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
};

export default NewComics;
