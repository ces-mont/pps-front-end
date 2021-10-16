export const ADD_TOKEN = 'ADD_TOKEN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export function login(userData){
    return{
        type: LOGIN_SUCCESS,
        payload: userData
    }
}
export function setToken(token){
    return{
        type: ADD_TOKEN,
        payload: token
    }
}