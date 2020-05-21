import React from 'react'
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core"
import LoginScreen from '../LoginScreen/LoginScreen'
import HeaderStyles from './HeaderStyles';
import { useSelector, useDispatch } from 'react-redux';
import { showLoginScreen } from '../../state/actions/AuthActions';
import * as firebase from 'firebase/app';
import {saveDocument} from "../../state/actions/EditorActions";
import {Save} from '@material-ui/icons';
import logo from './logo.svg';


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
        <Toolbar className="navbar" variant="dense">
          <img src={logo} alt="Rocket Writer Logo" />
          <Button
        startIcon={<Save />}
        className="saveButton"
        onClick={() => {
          if(!userLoggedIn){
            // not logged in
            dispatch(showLoginScreen())
            return;
          }
          dispatch(saveDocument())
          }}
      >
        Save
      </Button>
          <Button color="inherit" className={classes.button} onClick={() => handleClick()}>{!userLoggedIn ? "Login" : "Logout"}</Button>
        </Toolbar>
        <LoginScreen />
      </AppBar>
    )
}

export default Header;
