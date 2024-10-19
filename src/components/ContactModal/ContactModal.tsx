import React from 'react';

const ContactModal: React.FC = () => {
  return (
    <div
      className="modal fade"
      id="contact-modal"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Contact Us
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <form>
            <div className="modal-body">
              <div className="row">
                <div className="col-lg-7">
                  <div className="row">
                    <div className="col-lg-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Your Name"
                        required
                      />
                    </div>
                    <div className="col-lg-6">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Your Email"
                        required
                      />
                    </div>
                    <div className="col-lg-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Your Phone"
                      />
                    </div>
                    <div className="col-lg-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Subject"
                      />
                    </div>
                    <div className="col-lg-12">
                      <textarea
                        className="form-control"
                        placeholder="Write Your Comment Here..."
                        rows={3}
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="col-lg-5">
                  <div className="contact-item">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Accusamus odit aliquid consectetur, veniam.
                    </p>
                    <div className="row">
                      <div className="col-6 col-lg-6 contact-info">
                        <i className="fa-solid fa-location-dot"></i>
                        <h3>Address:</h3>
                        <p>Dhanmondi Road No. 32, Dhaka.</p>
                      </div>
                      <div className="col-6 col-lg-6 contact-info">
                        <i className="fa-solid fa-phone"></i>
                        <h3>Phone:</h3>
                        <p>+(123) 450 336 789</p>
                      </div>
                      <div className="col-6 col-lg-6 contact-info mb-0">
                        <i className="fa-solid fa-envelope"></i>
                        <h3>Email:</h3>
                        <p>comixo@mail.com</p>
                      </div>
                      <div className="col-6 col-lg-6 contact-info mb-0">
                        <i className="fa-solid fa-wifi"></i>
                        <h3>Connect:</h3>
                        <div className="social">
                          <a href="#">
                            <i className="fa-brands fa-facebook-f"></i>
                          </a>
                          <a href="#">
                            <i className="fa-brands fa-twitter"></i>
                          </a>
                          <a href="#">
                            <i className="fa-brands fa-twitch"></i>
                          </a>
                          <a href="#">
                            <i className="fa-brands fa-youtube"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="submit" className="button-primary">
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
