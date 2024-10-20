import React from "react";
import {Checkbox, Form, Input} from 'antd';
import './SignInAndSignUp.css';

type FieldType = {
  username?: string;
  password?: string;
  confirmPassword?: string;
  remember?: string;
}

const SignInAndSignUp: React.FC = () => {
  const [isSignUp, setIsSignUp] = React.useState(false);

  const handleSignUpClick = () => {
    setIsSignUp(true);
  };

  const handleSignInClick = () => {
    setIsSignUp(false);
  };

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
            wrapperCol={{span: 16}}
            autoComplete="true"
            initialValues={{remember: true}}
          >
            <div className="modal-body">
              {/* Sign In Form */}
              {!isSignUp && (
                <>
                  <Form.Item<FieldType>
                    label="Username"
                    name="username"
                    rules={[{required: true, message: 'Please input your username!'}]}
                  >
                    <Input/>
                  </Form.Item>

                  <Form.Item<FieldType>
                    label="Password"
                    name="password"
                    rules={[{required: true, message: 'Please input your password!'}]}
                  >
                    <Input.Password/>
                  </Form.Item>

                  <Form.Item<FieldType>
                    name="remember"
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
                  <Form.Item<FieldType>
                    label="Username"
                    name="username"
                    rules={[{required: true, message: 'Please input your username!'}]}
                  >
                    <Input/>
                  </Form.Item>

                  <Form.Item<FieldType>
                    label="Password"
                    name="password"
                    rules={[{required: true, message: 'Please input your password!'}]}
                  >
                    <Input.Password/>
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
                      ({getFieldValue}) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error('The new password that you entered do not match!'));
                        },
                      }),
                    ]}
                  >
                    <Input.Password/>
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
              <button type="submit" className="button-primary">
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
