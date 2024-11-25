import React, { useContext, useState } from "react";
import { Checkbox, Flex, Form, Input, message } from 'antd';
import './SignInAndSignUp.css';
import { CustomerLoginDto } from "../../types/customer-login-dto";
import { RegistryDto } from "../../types/registry-dto";
import { signIn, signUp } from "./api";
import { ResultUserVo } from "../../types/result-user-vo";
import { AuthContext } from "../../AuthContext";

const SignInAndSignUp: React.FC = () => {
  const [isSignUp, setIsSignUp] = React.useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { setLogin, setUserId } = useContext(AuthContext);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [captchaTimestamp, setCaptchaTimestamp] = useState(Date.now());

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
          setLogin(true);
          if (result.data) {
            setUserId(result.data.id);
          }
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

  const refreshCaptcha = () => {
    setCaptchaTimestamp(Date.now());
  };

  const handleForgotPassword = async (values: { username: string; verifyCode: string }) => {
    try {
      const response = await fetch(process.env.REACT_APP_FORGOT_PASSWORD_URL!, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        message.success('Password reset email has been sent to your email address.');
        setIsForgotPassword(false);
        form.resetFields();
      } else {
        message.error('Failed to process password reset request.');
      }
    } catch (error) {
      console.error('Failed:', error);
      message.error('Failed to process password reset request');
    }
  };

  React.useEffect(() => {
    const modal = document.getElementById('contact-modal');
    if (modal) {
      modal.addEventListener('show.bs.modal', () => {
        setIsSignUp(false);
        setIsForgotPassword(false);
        form.resetFields();
      });
    }
  }, [form]);

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
              {isForgotPassword ? 'Forgot Password' : (!isSignUp ? 'Sign In' : 'Sign Up')}
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
            onFinish={isForgotPassword ? handleForgotPassword : onFinish}
            clearOnDestroy={true}
            validateMessages={validateMessages}
          >
            <div className="modal-body">
              {/* Forgot Password Form */}
              {isForgotPassword && (
                <>
                  <Form.Item
                    label="Email"
                    name="username"
                    rules={[{ required: true, type: 'email', message: 'Please input your email!' }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Verification Code"
                    name="verifyCode"
                    rules={[{ required: true, message: 'Please input verification code!' }]}
                  >
                    <Flex gap="small">
                      <Input />
                      <img
                        src={`${process.env.REACT_APP_KAPTCHA_URL}/forget-password-code?t=${captchaTimestamp}`}
                        alt="captcha"
                        style={{ cursor: 'pointer', height: '32px' }}
                        onClick={refreshCaptcha}
                      />
                    </Flex>
                  </Form.Item>

                  <div>
                    <a href="#" onClick={() => {
                      setIsForgotPassword(false);
                      form.resetFields();
                    }}>Back to Sign In</a>
                  </div>
                </>
              )}

              {/* Sign In Form */}
              {!isSignUp && !isForgotPassword && (
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

                  <Form.Item>
                    <Flex justify="space-between" align="center">
                      <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                      </Form.Item>
                      <a href="#" onClick={() => {
                        setIsForgotPassword(true);
                        form.resetFields();
                        refreshCaptcha();
                      }}>Forgot password</a>
                    </Flex>
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
              {isForgotPassword ? (
                <>
                  <button type="submit" className="button-primary">
                    Confirm
                  </button>
                </>
              ) : (
                <button type="submit" className="button-primary" disabled={loading}>
                  {isSignUp ? 'Register' : 'Login'}
                </button>
              )}
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
};

export default SignInAndSignUp;
