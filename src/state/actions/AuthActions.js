export const SHOW_LOGIN_SCREEN = "SHOW_LOGIN_SCREEN";
export function showLoginScreen(){
    return {
        type: SHOW_LOGIN_SCREEN
    }
}

export const HIDE_LOGIN_SCREEN = "HIDE_LOGIN_SCREEN";
export function hideLoginScreen(){
    return {
        type: HIDE_LOGIN_SCREEN
    }
}

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export function loginSuccess(payload){
    return {
        type: LOGIN_SUCCESS,
        payload: payload
    }
}

export const LOGOUT = "LOGOUT";
export function logout(){
    return {
        type: LOGOUT
    }
}

export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export function logoutSuccess(){
    return {
        type: LOGOUT_SUCCESS
    }
}

export const LOGOUT_FAILED = "LOGOUT_FAILED";
export function logoutFailed(payload){
    return {
        type: LOGOUT_FAILED,
        payload: payload
    }
}

export const AUTHENTICATION_FAILED = "AUTHENTICATION_FAILED";
export function authenticationFailed(){
    return {
        type: AUTHENTICATION_FAILED
    }
}

export const UPDATE_ACCOUNT_ID = "UPDATE_ACCOUNT_ID";
export function updateAccountId(payload){
    return {
        type: UPDATE_ACCOUNT_ID,
        payload: payload
    }
}

export const LISTEN_FOR_FIREBASE_AUTH_EVENTS = "LISTEN_FOR_FIREBASE_AUTH_EVENTS";
export function listenForFirebaseAuthEvents(){
    return {
        type: LISTEN_FOR_FIREBASE_AUTH_EVENTS
    }
}

export const LISTEN_FOR_ACCOUNT_ID = "LISTEN_FOR_ACCOUNT_ID";
export function listenForAccountId(){
    return {
        type: LISTEN_FOR_ACCOUNT_ID
    }
}

export const SET_ANIMATION_FINISHED = "SET_ANIMATION_FINISHED";
export function setAnimationFinished(){
    return {
        type: SET_ANIMATION_FINISHED
    }
}

export const RESET_AUTH_STATE = "RESET_AUTH_STATE";
export function resetAuthState(){
    return {
        type: RESET_AUTH_STATE
    }
}