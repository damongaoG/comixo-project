import React, { useState } from "react";
import { Checkbox, Form, Input, message } from 'antd';
import './SignInAndSignUp.css';
import { CustomerLoginDto } from "../../types/customer-login-dto";
import { RegistryDto } from "../../types/registry-dto";
import { signIn, signUp } from "./api";
import { ResultUserVo } from "../../types/result-user-vo";

const SignInAndSignUp: React.FC = () => {
  const [isSignUp, setIsSignUp] = React.useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };

  const handleSignUpClick = () => {
    setIsSignUp(true);
    form.resetFields();
  };

  const handleSignInClick = () => {
    setIsSignUp(false);
    form.resetFields();
  };

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      if (isSignUp) {
        const { username, password, nickName } = values;
        const data: RegistryDto = { username, password, nickName };
        const response = await signUp(data);
        console.log('sign up response:', response);
        const result: ResultUserVo = response.data;
        if (result.code === 1) {
          message.success('The email has been sent. Please activate your account. ');
          form.resetFields();
        } else {
          message.error('Failed to sign up');
        }
      } else {
        const { username, password, rememberMe } = values as CustomerLoginDto;
        const response = await signIn({ username, password, rememberMe });
        const result: ResultUserVo = response.data;
        if (result.code === 1) {
          const closeButton = document.querySelector('.modal .btn-close');
          if (closeButton) {
            (closeButton as HTMLElement).click();
          }
        } else {
          message.error('Invalid email or password, please try again!');
        }
      }
    } catch (error) {
      console.error('Failed:', error);
      message.error('Failed to sign in or sign up');
    } finally {
      setLoading(false);
    }
  }

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
              {!isSignUp ? 'Sign In' : 'Sign Up'}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <Form
            form={form}
            wrapperCol={{ span: 16 }}
            autoComplete="true"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            clearOnDestroy={true}
            validateMessages={validateMessages}
          >
            <div className="modal-body">
              {/* Sign In Form */}
              {!isSignUp && (
                <>
                  <Form.Item<CustomerLoginDto>
                    label="Email"
                    name="username"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item<CustomerLoginDto>
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item<CustomerLoginDto>
                    name="rememberMe"
                    valuePropName="checked"
                  >
                    <Checkbox>Remember me</Checkbox>
                  </Form.Item>

                  {!isSignUp && (
                    <div>
                      Are you new here? <a href="#" onClick={handleSignUpClick}>Sign Up</a>
                    </div>
                  )}
                </>
              )}

              {/* Sign Up Form */}
              {isSignUp && (
                <>
                  <Form.Item<RegistryDto>
                    label="Email"
                    name="username"
                    rules={[{ required: true, type: 'email' }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item<RegistryDto>
                    label="Name"
                    name="nickName"
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item<RegistryDto>
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: 'Please confirm your password!',
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error('The new password that you entered do not match!'));
                        },
                      }),
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>

                  {isSignUp && (
                    <div>
                      Already have an account? <a href="#" onClick={handleSignInClick}>Sign In</a>
                    </div>
                  )}
                </>
              )}
            </div>
            <div className="modal-footer">
              <button type="submit" className="button-primary"
                disabled={loading}
              >
                {isSignUp ? 'Register' : 'Login'}
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
};

export default SignInAndSignUp;
