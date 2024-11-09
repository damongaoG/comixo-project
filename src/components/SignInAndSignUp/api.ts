import axios from 'axios';
import { RegistryDto } from '../../types/registry-dto';
import { CustomerLoginDto } from '../../types/customer-login-dto';

export const signUp = async (data: RegistryDto) => {
    return axios.post(process.env.REACT_APP_REGISTER_URL!, data, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    });
};

export const signIn = async (data: CustomerLoginDto) => {
    return axios.post(process.env.REACT_APP_LOGIN_URL!, data, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    });
}