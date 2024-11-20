import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Modal, Row, Col, message, Result, Radio, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import CopyRightSection from "../../components/CopyRightSection/CopyRightSection";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import OffcanvasMenu from "../../components/OffcanvasMenu/OffcanvasMenu";
import SignInAndSignUp from "../../components/SignInAndSignUp/SignInAndSignUp";
import { AuthContext } from "../../AuthContext";
import Preloader from "../../components/Preloader/Preloader";
import { CardVO } from "../../types/card-vo";
import { ResultCardVO } from "../../types/result-card";

// get bank icon
const getCardIcon = (brand: string) => {
    const brandLower = brand.toLowerCase();
    return <img src={`/images/card-brands/${brandLower}.png`} alt={brand} style={{ height: 30 }} />;
};

const Payment: React.FC = () => {
    const { isLogin, isLoading } = useContext(AuthContext);
    const navigate = useNavigate();
    const [cards, setCards] = useState<CardVO[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedCardId, setSelectedCardId] = useState<string>('');
    const [showSuccess, setShowSuccess] = useState(false);

    const fetchCards = async () => {
        try {
            setLoading(true);
            const response = await fetch(process.env.REACT_APP_CARD_URL as string, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            const result: ResultCardVO = await response.json();
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
        } else if (isLogin) {
            fetchCards();
        }
    }, [isLogin, isLoading, navigate]);

    const handleAddCard = async () => {
        setIsModalVisible(false);
        await fetchCards();
    };

    const handleConfirmPayment = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cardId: selectedCardId,
                    // 添加其他需要的支付参数
                })
            });

            const result = await response.json();
            if (result.code === 1) {
                setShowSuccess(true);
            } else {
                message.error(result.error?.message || 'Payment failed');
            }
        } catch (error) {
            message.error('Payment failed');
        } finally {
            setLoading(false);
        }
    };

    if (isLoading || loading) {
        return <Preloader />;
    }

    if (showSuccess) {
        return (
            <>
                <Navbar />
                <section style={{ padding: '50px 0' }}>
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
                </section>
                <Footer />
                <CopyRightSection />
            </>
        );
    }

    return (
        <>
            <Navbar />
            <SignInAndSignUp />
            <OffcanvasMenu />

            <section id="page-title">
                <div id="backtotop">
                    <a href="#page-title" id="backtotop-value">
                        <i className="fa-solid fa-arrow-up"></i>
                    </a>
                </div>
            </section>

            <section id="payment" style={{ padding: '50px 0' }}>
                <div className="container">
                    <h2 className="mb-4">Payment Methods</h2>
                    <Radio.Group
                        onChange={(e) => setSelectedCardId(e.target.value)}
                        value={selectedCardId}
                        style={{ width: '100%' }}
                    >
                        <Row gutter={[16, 16]}>
                            {cards.map((card) => (
                                <Col key={card.id} xs={24} sm={12} md={8} lg={6}>
                                    <Radio value={card.id}>
                                        <Card>
                                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
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
                                        style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                                        onClick={() => setIsModalVisible(true)}
                                    >
                                        <Button type="dashed" icon={<PlusOutlined />}>
                                            Add New Card
                                        </Button>
                                    </Card>
                                </Col>
                            )}
                        </Row>
                    </Radio.Group>

                    {cards.length === 0 && (
                        <div style={{ textAlign: 'center', marginTop: 20 }}>
                            <p>No payment methods found.</p>
                            <Button
                                type="primary"
                                icon={<PlusOutlined />}
                                onClick={() => setIsModalVisible(true)}
                            >
                                Add Payment Method
                            </Button>
                        </div>
                    )}

                    <div style={{ marginTop: 24, textAlign: 'right' }}>
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
                </div>
            </section>

            <Modal
                title="Add Payment Method"
                open={isModalVisible}
                onOk={handleAddCard}
                onCancel={() => setIsModalVisible(false)}
            >
                {/* 这里留空，等待后续添加表单内容 */}
            </Modal>

            <Footer />
            <CopyRightSection />
        </>
    );
};

export default Payment;