export const SET_USER = 'SET_USER';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';

export function login(){
    return{
        type: LOGIN_SUCCESS
    }
}
export function setUser(userData){
    return{
        type: SET_USER,
        payload: userData
    }
}
export function logout(){
    return{
        type: LOGOUT
    }
}