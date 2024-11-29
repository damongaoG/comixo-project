import React, {useContext, useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {Button, Card, Col, message, Modal, Popconfirm, Radio, Result, Row, Space} from "antd";
import {DeleteOutlined, PlusOutlined} from "@ant-design/icons";
import CopyRightSection from "../../components/CopyRightSection/CopyRightSection";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import OffcanvasMenu from "../../components/OffcanvasMenu/OffcanvasMenu";
import SignInAndSignUp from "../../components/SignInAndSignUp/SignInAndSignUp";
import {AuthContext} from "../../AuthContext";
import Preloader from "../../components/Preloader/Preloader";
import {CardVO} from "../../types/card-vo";
import {CardElement, Elements, useElements, useStripe} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";

// Initialize Stripe
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY!);

// get bank icon
const getCardIcon = (brand: string) => {
  const brandLower = brand.toLowerCase();
  return <img src={`assets/images/card-brands/${brandLower}.svg`} alt={brand} style={{height: 30}}/>;
};

const CardInputForm = ({userId, onSuccess, onCancel}: {
  userId: string;
  onSuccess: () => void;
  onCancel: () => void;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const createStripeToken = async () => {
    if (!stripe || !elements) {
      throw new Error('Stripe not initialized');
    }

    const {error, token} = await stripe.createToken(
      elements.getElement(CardElement)!
    );

    if (error) {
      throw new Error(error.message);
    }

    return token;
  };

  const sendTokenToBackend = async (tokenId: string) => {
    const response = await fetch(process.env.REACT_APP_CARD_URL!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        userId: userId,
        token: tokenId,
      }),
    });

    const result = await response.json();

    if (result.code !== 1) {
      throw new Error(result.message || 'Failed to add card');
    }

    return result;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setLoading(true);

    try {
      const token = await createStripeToken();

      if (token) {
        await sendTokenToBackend(token.id);
        message.success('Card added successfully');
        onSuccess();
      }
    } catch (error) {
      console.error('Add card error:', error);
      message.error(error instanceof Error ? error.message : 'Failed to add card');
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
      <div style={{padding: '10px 0'}}>
        <CardElement options={cardElementOptions}/>
      </div>
      <div style={{marginTop: 20, textAlign: 'right'}}>
        <Button onClick={onCancel} style={{marginRight: 8}}>
          Cancel
        </Button>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          disabled={!stripe}>
          Add Card
        </Button>
      </div>
    </form>
  );
};

const Payment: React.FC = () => {
  const {isLogin, isLoading, userId} = useContext(AuthContext);
  const navigate = useNavigate();
  const [cards, setCards] = useState<CardVO[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState<string>('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [searchParams] = useSearchParams();
  const planId = searchParams.get('planId');

  const fetchCards = async () => {
    try {
      setLoading(true);
      const response = await fetch(process.env.REACT_APP_CARD_URL as string, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      const result = await response.json();
      if (result.code === 1) {
        setCards(result.data);
      } else {
        message.error(result.error?.message || 'Failed to fetch cards');
      }
    } catch (error) {
      message.error('Failed to fetch cards');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoading && !isLogin) {
      navigate('/');
    } else if (!planId) {
      message.error('Invalid plan selected');
      navigate('/');
    } else if (isLogin) {
      fetchCards().then();
    }
  }, [isLogin, isLoading, navigate, planId]);

  const handleConfirmPayment = async () => {
    try {
      setLoading(true);
      const response = await fetch(process.env.REACT_APP_PLAN_ORDER_URL as string, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          paymentMethodId: selectedCardId,
          planId: planId,
          userId: userId
        })
      });

      const result = await response.json();
      if (result.code === 1) {
        setShowSuccess(true);
        setLoading(false);
      } else {
        setLoading(false);
        message.error(result.error?.message || 'Payment failed');
      }
    } catch (error) {
      setLoading(false);
      message.error('Payment failed');
    }
  };

  const handleDeleteCard = async (cardId: string) => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_CARD_URL}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          userId: userId,
          cardId: cardId
        })
      });

      const result = await response.json();
      if (result.code === 1) {
        message.success('Card deleted successfully');
        if (selectedCardId === cardId) {
          setSelectedCardId('');
        }
        await fetchCards();
      } else {
        message.error(result.message || 'Failed to delete card');
      }
    } catch (error) {
      console.error('Delete card error:', error);
      message.error('Failed to delete card');
    } finally {
      setLoading(false);
    }
  };

  if (isLoading || loading) {
    return <Preloader/>;
  }

  return (
    <>
      <Navbar/>
      <SignInAndSignUp/>
      <OffcanvasMenu/>

      <section id="page-title">
        <div id="backtotop">
          <a href="#page-title" id="backtotop-value">
            <i className="fa-solid fa-arrow-up"></i>
          </a>
        </div>
      </section>

      <section id="payment" style={{padding: '50px 0'}}>
        <div className="container">
          {showSuccess ? (
            <Result
              status="success"
              title="Payment Successful!"
              subTitle="Your payment has been processed successfully."
              extra={[
                <Button type="primary" key="home" onClick={() => navigate('/')}>
                  Back to Home
                </Button>
              ]}
            />
          ) : (
            <>
              <h2 className="mb-4">Payment Methods</h2>
              <Radio.Group
                onChange={(e) => setSelectedCardId(e.target.value)}
                value={selectedCardId}
                style={{width: '100%'}}
              >
                <Row gutter={[16, 16]}>
                  {cards.map((card) => (
                    <Col key={card.id} xs={24} sm={12} md={8} lg={6}>
                      <Radio value={card.id}>
                        <Card style={{position: 'relative'}}>
                          <Popconfirm
                            title="Delete card"
                            description="Are you sure you want to delete this card?"
                            onConfirm={(e) => {
                              e?.stopPropagation();
                              handleDeleteCard(card.id).then();
                            }}
                            onCancel={(e) => e?.stopPropagation()}
                            okText="Yes"
                            cancelText="No"
                          >
                            <DeleteOutlined
                              onClick={(e) => e.stopPropagation()}
                              style={{
                                position: 'absolute',
                                top: '12px',
                                right: '12px',
                                fontSize: '16px',
                                color: '#ff4d4f',
                                cursor: 'pointer',
                                zIndex: 1
                              }}
                            />
                          </Popconfirm>
                          <div style={{display: 'flex', alignItems: 'center', marginBottom: 16}}>
                            {getCardIcon(card.card.brand)}
                          </div>
                          <p>Card Number: **** **** **** {card.card.last4}</p>
                          <p>Expires: {card.card.exp_month}/{card.card.exp_year}</p>
                        </Card>
                      </Radio>
                    </Col>
                  ))}

                  {cards.length < 5 && (
                    <Col xs={24} sm={12} md={8} lg={6}>
                      <Card
                        style={{
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer'
                        }}
                        onClick={() => setIsModalVisible(true)}
                      >
                        <Button type="dashed" icon={<PlusOutlined/>}
                                onClick={() => setIsModalVisible(true)}
                        >
                          Add New Card
                        </Button>
                      </Card>
                    </Col>
                  )}
                </Row>
              </Radio.Group>

              <div style={{marginTop: 24, textAlign: 'right'}}>
                <Space>
                  <Button onClick={() => navigate('/')}>
                    Cancel
                  </Button>
                  <Button
                    type="primary"
                    disabled={!selectedCardId}
                    onClick={handleConfirmPayment}
                  >
                    Confirm Payment
                  </Button>
                </Space>
              </div>
            </>
          )}
        </div>
      </section>

      <Modal
        title="Add New Card"
        maskClosable={false}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        centered
        destroyOnClose={true}
      >
        <Elements stripe={stripePromise}>
          <CardInputForm
            userId={userId || ''}
            onSuccess={() => {
              setIsModalVisible(false);
              fetchCards().then();
            }}
            onCancel={() => setIsModalVisible(false)}
          />
        </Elements>
      </Modal>

      <Footer/>
      <CopyRightSection/>
    </>
  );
};

export default Payment;
