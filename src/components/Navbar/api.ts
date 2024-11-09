export const reLogin = async () => {
    return fetch(process.env.REACT_APP_RE_LOGIN_URL!, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    });
}

export const logOut = async () => {
    return fetch(process.env.REACT_APP_LOGOUT_URL!, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    });
}