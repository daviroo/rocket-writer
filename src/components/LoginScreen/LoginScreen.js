import React, {useContext} from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { StateContext } from "../../state/StateProvider";
import firebase from 'firebase/app';
import 'firebase/auth'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
// import LoginScreenStyles from './LoginScreenStyles';
const uiConfig = {
    signInFlow: 'popup',
    credentialHelper: 'none',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => false,
    },
  };


const LoginScreen = () => {
    const { showLoginScreen } = useContext(StateContext);
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