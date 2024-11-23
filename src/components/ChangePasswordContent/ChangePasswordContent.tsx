import React, { useContext } from 'react';
import { Form, Input, Button, message } from 'antd';
import { ResultUserVo } from '../../types/result-user-vo';
import { AuthContext } from '../../AuthContext';

const ChangePasswordContent: React.FC = () => {
    const { userId } = useContext(AuthContext);

    const onFinish = async (values: any) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_USER_URL}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    id: userId,
                    password: values.password
                })
            });

            const result: ResultUserVo = await response.json();

            if (result.code === 1) {
                message.success('Password changed successfully');
                form.resetFields();
            } else {
                message.error(result.error?.message || 'Failed to change password');
            }
        } catch (error) {
            message.error('Failed to change password');
        }
    };

    const [form] = Form.useForm();

    return (
        <div>
            <h2>Change Password</h2>
            <Form
                form={form}
                name="changePassword"
                layout="vertical"
                onFinish={onFinish}
                style={{ maxWidth: 600 }}
            >
                <Form.Item
                    label="New Password"
                    name="password"
                    rules={[
                        { required: true, message: 'Please input your new password!' },
                        { min: 6, message: 'Password must be at least 6 characters!' }
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="Confirm Password"
                    name="confirmPassword"
                    dependencies={['password']}
                    rules={[
                        { required: true, message: 'Please confirm your password!' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The two passwords do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Change Password
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ChangePasswordContent; 