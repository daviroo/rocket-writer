import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import firebase from '../../firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
// import LoginScreenStyles from './LoginScreenStyles';
import { useSelector, useDispatch } from 'react-redux';
import { hideLoginScreen } from '../../state/actions/AuthActions';


const LoginScreen = () => {
  const showLoginScreen = useSelector(state => state.authState.showLoginScreen)
  const dispatch = useDispatch();
  const uiConfig = {
    signInFlow: 'popup',
    credentialHelper: 'none',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccessWithAuthResult: function(authResult, redirectUrl) {
        // User successfully signed in.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        dispatch(hideLoginScreen())
        return false;
      }
    },
  };   
   
    // placeholder
    // const classes = LoginScreenStyles();
    return (
        <Dialog
        fullScreen
        open={showLoginScreen}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Login"}</DialogTitle>
        <DialogContent>
          <StyledFirebaseAuth uiConfig={uiConfig}
                                firebaseAuth={firebase.auth()}/>
        </DialogContent>
      </Dialog>
    )
}

export default LoginScreen;