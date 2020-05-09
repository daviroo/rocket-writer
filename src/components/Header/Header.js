import React from 'react'
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core"
import LoginScreen from '../LoginScreen/LoginScreen'
import HeaderStyles from './HeaderStyles';
import { useSelector, useDispatch } from 'react-redux';
import { showLoginScreen } from '../../state/actions/AuthActions';
import * as firebase from 'firebase/app';

const Header = () => {
    const classes = HeaderStyles();
    const userLoggedIn = useSelector(state => state.authState.userLoggedIn);
    const dispatch = useDispatch()

    const handleClick = () => {
        if(!userLoggedIn){
          dispatch(showLoginScreen())
        }  else {
          firebase.auth().signOut()
    }
  }
    return (
        <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit">
            Rocket Writer
          </Typography>
          <Button color="inherit" className={classes.button} onClick={() => handleClick()}>{!userLoggedIn ? "Login" : "Logout"}</Button>
        </Toolbar>
        <LoginScreen />
      </AppBar>
    )
}

export default Header;
