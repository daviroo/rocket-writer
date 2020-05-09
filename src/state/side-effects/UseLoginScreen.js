import {useState} from 'react';

export const useLoginScreen = () => {
    const [showLogin, setShowLogin] = useState(false);

    function showLoginScreen(){
        setShowLogin(true)
    }

    function hideLoginScreen(){
        setShowLogin(false)
    }

    return [showLogin, {showLoginScreen, hideLoginScreen}]
}