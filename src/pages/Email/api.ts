import {ValidateEmailDto} from "../../types/validate-email-dto";

export const validateEmail = async (data: ValidateEmailDto) => {
  return fetch(process.env.REACT_APP_VALIDATE_EMAIL_URL!, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  })
}
