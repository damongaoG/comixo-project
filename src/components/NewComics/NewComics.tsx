import React, {useEffect} from "react";
import {Link} from "react-router-dom";

declare const $: any;

const NewComics: React.FC = () => {
  useEffect(() => {
    $('.venobox .veno-img').venobox({
      numeration: true,
      infinigall: true,
      share: true,
    });
  }, []);

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
          <div className="col-lg-4 col-md-8 mobile-m-auto">
            <div className="comic-item">
              <img
                src="/assets/images/comic1.png"
                alt="comic"
                className="img-fluid"
              />
              <a
                className="venobox veno-img"
                data-gall="comic1"
                href="/assets/images/comic1.png"
              >
                <i className="fa-solid fa-plus"></i>
              </a>
              <div className="comic-item-details">
                <div className="row">
                  <div className="col-8 col-lg-8">
                    <h3>Super Knight</h3>
                    <p>
                      <i className="fa-solid fa-eye"></i> 250.6K Reviews
                    </p>
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
          <div className="col-lg-4 col-md-8 mobile-m-auto">
            <div className="comic-item active">
              <img
                src="/assets/images/comic2.png"
                alt="comic"
                className="img-fluid"
              />
              <a
                className="venobox veno-img"
                data-gall="comic1"
                href="/assets/images/comic2.png"
              >
                <i className="fa-solid fa-plus"></i>
              </a>
              <div className="comic-item-details">
                <div className="row">
                  <div className="col-8 col-lg-8">
                    <h3>Red Squad IV</h3>
                    <p>
                      <i className="fa-solid fa-eye"></i> 168.2K Reviews
                    </p>
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
          <div className="col-lg-4 col-md-8 mobile-m-auto">
            <div className="comic-item">
              <img
                src="/assets/images/comic3.png"
                alt="comic"
                className="img-fluid"
              />
              <a
                className="venobox veno-img"
                data-gall="comic1"
                href="/assets/images/comic3.png"
              >
                <i className="fa-solid fa-plus"></i>
              </a>
              <div className="comic-item-details">
                <div className="row">
                  <div className="col-8 col-lg-8">
                    <h3>Nova Nexus</h3>
                    <p>
                      <i className="fa-solid fa-eye"></i> 124.7K Reviews
                    </p>
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
        </div>
      </div>
    </section>
  )
};

export default NewComics;
