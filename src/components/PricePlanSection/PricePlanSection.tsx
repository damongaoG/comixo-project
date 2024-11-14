import { Button, Form, message, Modal } from 'antd';
import React, { useState } from 'react';
import { useMaskito } from "@maskito/react";
import options from './mask';
import { MaskitoOptions } from "@maskito/core";
import { Plan } from "../../types/plan";
import usePlan from "./usePlan";
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';

const PricePlanSection: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [form] = Form.useForm();

  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY!);

  const CardInputForm = ({ onSuccess, onCancel }: {
    onSuccess: () => void;
    onCancel: () => void;
  }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault();

      if (!stripe || !elements) {
        return;
      }

      setLoading(true);

      try {
        const { error, paymentMethod } = await stripe.createPaymentMethod({
          type: 'card',
          card: elements.getElement(CardElement)!,
        });

        if (error) {
          message.error(error.message);
          return;
        }

        if (paymentMethod) {
          // Send the payment method ID to your backend
          const response = await fetch(process.env.REACT_APP_CARD_URL!, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
              token: paymentMethod.id,
            }),
          });

          const result = await response.json();

          if (result.code === 1) {
            message.success('Card added successfully');
            onSuccess();
          } else {
            message.error('Failed to add card');
          }
        }
      } catch (error) {
        console.error('Add card error:', error);
        message.error('Failed to add card');
      } finally {
        setLoading(false);
      }
    };

    const cardElementOptions = {
      style: {
        base: {
          fontSize: '16px',
          color: '#424770',
          '::placeholder': {
            color: '#aab7c4',
          },
        },
        invalid: {
          color: '#9e2146',
        },
      },
      hidePostalCode: true
    };

    return (
      <form onSubmit={handleSubmit}>
        <div style={{ padding: '10px 0' }}>
          <CardElement options={cardElementOptions} />
        </div>
        <div style={{ marginTop: 20, textAlign: 'right' }}>
          <Button onClick={onCancel} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" loading={loading} disabled={!stripe}>
            Add Card
          </Button>
        </div>
      </form>
    );
  };

  usePlan(setPlans);

  return (
    <section id="price-plan">
      <Modal
        title="Add New Card"
        maskClosable={false}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
        centered
        destroyOnClose={true}
      >
        <Elements stripe={stripePromise}>
          <CardInputForm
            onSuccess={() => {
              setModalOpen(false)
            }}
            onCancel={() => setModalOpen(false)}
          />
        </Elements>
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
