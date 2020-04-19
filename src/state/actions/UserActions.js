export function userLoggedIn() {
    return {
        type: 'USER_LOGGED_IN'
    }
}

export function userLoggedOut() {
    return {
        type: 'USER_LOGGED_OUT'
    }
}

export function showLoginScreen() {
    return {
        type: "SHOW_LOGIN_SCREEN"
    }
}

export function hideLoginScreen() {
    return {
        type: "HIDE_LOGIN_SCREEN"
    }
}