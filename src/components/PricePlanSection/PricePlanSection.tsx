import { Modal } from 'antd';
import React, { useState } from 'react';

const PricePlanSection: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section id="price-plan">
      <Modal
        title="Payment"
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
      >
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>
      <div className="container">
        <div className="row">
          <div className="section-title">
            <div className="col-lg-6">
              <span>Price Plan</span>
              <h3>Read Comics Everyday.</h3>
            </div>
          </div>
        </div>
        <div className="row pt-55">
          <div className="col-lg-12">
            <div className="price-main">
              <div className="row">
                {/* Price Item 1 */}
                <div className="col-lg-3 col-md-6 price-item text-center">
                  <span>Starter</span>
                  <p>Per Month</p>
                  <img src="/assets/images/price1.png" alt="price-icon" />
                  <h3>Free</h3>
                  <p><i className="fa-solid fa-check"></i> Free Home Delivery</p>
                  <p><i className="fa-solid fa-check"></i> Monthly Five Comic Books</p>
                  <p><i className="fa-solid fa-check"></i> Download Limited Assets</p>
                  <p><i className="fa-solid fa-check"></i> Free Comic Arts</p>
                  <div className="price-btn">
                    <a href="#" className="button-secondary">Free Account</a>
                  </div>
                </div>

                {/* Price Item 2 */}
                <div className="col-lg-3 col-md-6 price-item text-center">
                  <span>Basic</span>
                  <p>Per Month</p>
                  <img src="/assets/images/price2.png" alt="price-icon" />
                  <h3>$5.99</h3>
                  <p><i className="fa-solid fa-check"></i> Free Home Delivery</p>
                  <p><i className="fa-solid fa-check"></i> Monthly Five Comic Books</p>
                  <p><i className="fa-solid fa-check"></i> Download Limited Assets</p>
                  <p><i className="fa-solid fa-check"></i> Free Comic Arts</p>
                  <div className="price-btn">
                    <a href="#" className="button-secondary"
                      onClick={(e) => {
                        e.preventDefault();
                        setModalOpen(true)
                      }}
                    >Choose Plan</a>
                  </div>
                </div>

                {/* Price Item 3 */}
                <div className="col-lg-3 col-md-6 price-item text-center active">
                  <div className="mobile-v-bg">
                    <span>Recommended</span>
                    <p>Per Month</p>
                    <img src="/assets/images/price3.png" alt="price-icon" />
                    <h3>$19.9</h3>
                    <p><i className="fa-solid fa-check"></i> Free Home Delivery</p>
                    <p><i className="fa-solid fa-check"></i> Monthly Five Comic Books</p>
                    <p><i className="fa-solid fa-check"></i> Download Limited Assets</p>
                    <p><i className="fa-solid fa-check"></i> Free Comic Arts</p>
                    <div className="price-btn">
                      <a href="#" className="button-secondary">Choose Plan</a>
                    </div>
                  </div>
                </div>

                {/* Price Item 4 */}
                <div className="col-lg-3 col-md-6 price-item text-center">
                  <span>Superstars</span>
                  <p>Per Year</p>
                  <img src="/assets/images/price4.png" alt="price-icon" />
                  <h3>$29.9</h3>
                  <p><i className="fa-solid fa-check"></i> Free Home Delivery</p>
                  <p><i className="fa-solid fa-check"></i> Monthly Five Comic Books</p>
                  <p><i className="fa-solid fa-check"></i> Download Limited Assets</p>
                  <p><i className="fa-solid fa-check"></i> Free Comic Arts</p>
                  <div className="price-btn">
                    <a href="#" className="button-secondary">Choose Plan</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="row pt-3 price-footer">
          <div className="col-lg-6 col-sm-4">
            <a href="#">Ask Any Question</a>
          </div>
          <div className="col-lg-6 col-sm-8 text-end">
            <p><i className="fa-solid fa-lock"></i> All Payments Are Highly Secured.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricePlanSection;
