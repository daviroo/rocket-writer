import { SHOW_LOGIN_SCREEN, HIDE_LOGIN_SCREEN, LOGIN_SUCCESS, LOGOUT_SUCCESS, LOGOUT, LOGOUT_FAILED, AUTHENTICATION_FAILED, UPDATE_ACCOUNT_ID, SET_ANIMATION_FINISHED } from "../actions/AuthActions";
const initialState = {
    showLoginScreen: false,
    user: null,
    logoutInProgress: false,
    userLoggedIn: false,
    accountId: "",
    appLoaded: false,
    animationFinished: false
}

export function authReducer(state = initialState, action) {
    switch (action.type) {
        case SHOW_LOGIN_SCREEN:
            return { ...state, showLoginScreen: true };
        case HIDE_LOGIN_SCREEN:
            return { ...state, showLoginScreen: false }
        case LOGIN_SUCCESS:
            return {...state, showLoginScreen: false, user: action.payload, userLoggedIn: true}
        case LOGOUT:
            return { ...state, logoutInProgress: true }
        case LOGOUT_SUCCESS:
            return { ...state, logoutInProgress: false, user: null, userLoggedIn: false, appLoaded: true }
        case LOGOUT_FAILED:
            return { ...state, logoutInProgress: false, logoutError: action.payload }
        case AUTHENTICATION_FAILED:
            return { ...state, user: null, userLoggedIn: false, showLoginScreen: true }
        case UPDATE_ACCOUNT_ID:
            return {...state, accountId: action.payload, appLoaded: true}
        case SET_ANIMATION_FINISHED:
            return { ...state, animationFinished: true }
        default:
            return state;
    }
}