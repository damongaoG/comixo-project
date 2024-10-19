import React, {useEffect} from "react";
declare const $: any;

const About: React.FC = () => {
  useEffect(() => {
    $('.venobox').venobox();
    $('.slick-slider').slick();
  }, []);
  return (
    <section id="about">
      <div className="container">
        <div className="row pt-5">
          <div className="col-lg-5 col-md-9 m-md-auto about-main">
            <img src="/assets/images/about-main.png" alt="about-img" className="img-fluid"/>
            {/*<div className="active-users">
              <h3
                className="counter"
                data-counterup-time="2000"
                data-counterup-delay="30"
                data-counterup-beginat="1"
              >
                3
              </h3>
              <span>M</span>
              <p>Users</p>
            </div>*/}
            <div className="experience">
              <h3
                className="counter"
                data-counterup-time="2000"
                data-counterup-delay="30"
                data-counterup-beginat="2"
              >
                25
              </h3>
              <span>+</span>
              <p>Years of comic journey</p>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="about-txt">
              <span>About Us</span>
              <h3>Digital Books Arts Company.</h3>
              <p className="pt-2 pb-4">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore molestiae
                eius accusamus fuga a tenetur.
              </p>
              <div className="check-p">
                <p>
                  <i className="fa-solid fa-check"></i> We Offer Unique Comic Books & Arts
                </p>
                <p>
                  <i className="fa-solid fa-check"></i> Get Collection Of Creative Series
                </p>
                <p>
                  <i className="fa-solid fa-check"></i> Watch Cartoon And Kid Animation
                </p>
              </div>
              {/*<a
                className="button-circular venobox"
                data-autoplay="true"
                data-vbtype="video"
                href="https://www.youtube.com/watch?v=4S8RC5zzG5g"
              >
                <i className="fa-solid fa-play"></i> Watch Story
              </a>*/}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About;
