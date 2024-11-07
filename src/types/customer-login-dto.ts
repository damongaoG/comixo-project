export interface CustomerLoginDto {
    username: string;
    password: string;
    verifyCode?: string;
    rememberMe?: boolean;
}