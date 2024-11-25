import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Result } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { ResultVo } from '../../types/result';

interface ResetPasswordForm {
    newPassword: string;
    confirmPassword: string;
}

const ForgetPassword: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [username, setUsername] = useState<string>('');
    const [code, setCode] = useState<string>('');
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const sourceParam = params.get('source');
        const keyParam = params.get('key');

        if (sourceParam && keyParam) {
            setUsername(sourceParam);
            setCode(keyParam);
        }
    }, [location]);

    const onFinish = async (values: ResetPasswordForm) => {
        if (values.newPassword !== values.confirmPassword) {
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(process.env.REACT_APP_VALIDATE_EMAIL_URL!, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password: values.newPassword,
                    code,
                }),
            });

            const data: ResultVo = await response.json();

            if (data.code === 1) {
                setStatus('success');
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        } finally {
            setLoading(false);
        }
    };

    if (status === 'success') {
        return (
            <Result
                status="success"
                title="Password Reset Successfully"
                extra={[
                    <Button type="primary" key="console" onClick={() => navigate('/')}>
                        Go Home
                    </Button>,
                ]}
            />
        );
    }

    if (status === 'error') {
        return (
            <Result
                status="error"
                title="Reset Password Failed"
                subTitle="Please contact customer service"
                extra={[
                    <Button type="primary" key="console" onClick={() => navigate('/login')}>
                        Go to Login
                    </Button>,
                ]}
            />
        );
    }

    return (
        <div style={{ maxWidth: 400, margin: '40px auto', padding: '0 20px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Reset Password</h2>
            <Form
                name="reset-password"
                onFinish={onFinish}
                layout="vertical"
                autoComplete="off"
            >
                <Form.Item
                    name="newPassword"
                    label="New Password"
                    rules={[
                        { required: true, message: 'Please input your new password!' },
                        { min: 6, message: 'Password must be at least 6 characters!' },
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="confirmPassword"
                    label="Confirm Password"
                    dependencies={['newPassword']}
                    rules={[
                        { required: true, message: 'Please confirm your password!' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('newPassword') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    new Error('The two passwords do not match!')
                                );
                            },
                        }),
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        block
                    >
                        Reset Password
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ForgetPassword;
