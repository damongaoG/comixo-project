import React, {useEffect, useState} from "react";
import {Button, Empty, Result, Typography} from "antd";
import {validateEmail} from "./api";
import {ValidateEmailDto} from "../../types/validate-email-dto";
import {ResultValidateEmail} from "../../types/result-validate-email";
import {useNavigate} from "react-router-dom";

const Email: React.FC = () => {
  const [isSuccess, setSuccess] = useState(true);
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();

  const queryString = window.location.search;

  const queryParams = new URLSearchParams(queryString);

  const source = queryParams.get('source');
  const key = queryParams.get('key');
  console.log('source, key', source, key)

  useEffect(() => {
    const verifyEmail = async () => {
      const data: ValidateEmailDto = {
        username: source!,
        code: key!
      }
      const response = await validateEmail(data);
      const result: ResultValidateEmail = await response.json();
      if (result.code === 1) {
        setSuccess(true);
      } else {
        setSuccess(false);
      }
      setLoading(false)
    };

    verifyEmail().then();
  }, [])

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <>
      {isLoading && (
        <Empty
          description={
            <Typography.Text>
              Loading...
            </Typography.Text>
          }
        />
      )}

      {isSuccess && !isLoading && (
        <Result
          status="success"
          title="Successfully Activated"
          subTitle="Now you can click the button to go home."
          extra={[
            <Button
              type="primary"
              key="console"
              onClick={handleGoHome}
            >
              Go Home
            </Button>
          ]}
        />
      )}
      {!isSuccess && !isLoading && (
        <Result
          status="error"
          title="Activated Failed"
          subTitle="Please contact our customer service."
        >
        </Result>
      )}
    </>
  )
}

export default Email;
