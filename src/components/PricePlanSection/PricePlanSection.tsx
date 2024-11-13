import {Form, Modal} from 'antd';
import React, {useEffect, useState} from 'react';
import {useMaskito} from "@maskito/react";
import options from './mask';
import {MaskitoOptions} from "@maskito/core";
import {listPlans, listProducts} from "./api";
import {ResultListProduct} from "../../types/result-list-product";
import {ResultListPlan} from "../../types/result-list-plan";
import {Plan} from "../../types/plan";

const PricePlanSection: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [plans, setPlans] = useState(Array<Plan>);
  const [form] = Form.useForm();

  const cardNumberMask: MaskitoOptions = {
    mask: [
      /\d/, /\d/, /\d/, /\d/, ' ',
      /\d/, /\d/, /\d/, /\d/, ' ',
      /\d/, /\d/, /\d/, /\d/, ' ',
      /\d/, /\d/, /\d/, /\d/,
    ],
  }

  const cvvMask: MaskitoOptions = {
    mask: [
      /\d/, /\d/, /\d/,
    ],
  }

  const maskedInputRef = useMaskito({options});
  const cardNumberInputRef = useMaskito({options: cardNumberMask});
  const cvvMaskInputRef = useMaskito({options: cvvMask})

  useEffect(() => {
    const listPlansArray = async () => {
      const response = await listProducts();
      const result: ResultListProduct = await response.json()
      if (result.code === 1) {
        const id = result.data[0].id;
        const responseForPlan = await listPlans(id);
        const resultForPlan: ResultListPlan = await responseForPlan.json();
        if (resultForPlan.code === 1) {
          setPlans(resultForPlan.data);
        } else {
          console.error('Error fetching plans', resultForPlan.error?.message);
        }
      } else {
        console.error('Error fetching plans', result.error?.message);
      }
    };

    listPlansArray().then();
  }, [])

  return (
    <section id="price-plan">
      <Modal
        title="Payment"
        centered
        maskClosable={false}
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
      >
        <Form
          form={form}
          layout={'vertical'}
        >
          <Form.Item
            name={'cardNumber'}
            label={'Card number'}
          >
            <input
              placeholder={'1234 5678 9012 3456'}
              ref={cardNumberInputRef}
            ></input>

          </Form.Item>
          <Form.Item
            name={'expiryDate'}
            label={'Expiry Date'}
          >
            <input
              placeholder={'MM/YY'}
              ref={maskedInputRef}
            ></input>
          </Form.Item>
          <Form.Item
            name={'cvv'}
            label={'CVV'}
          >
            <input
              placeholder={'123'}
              ref={cvvMaskInputRef}
            ></input>
          </Form.Item>
        </Form>
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
