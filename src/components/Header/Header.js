import React, {useContext} from 'react'
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core"
import { StateContext, DispatchContext } from "../../state/StateProvider";
import * as firebase from 'firebase/app';
import LoginScreen from '../LoginScreen/LoginScreen'
import { showLoginScreen} from '../../state/actions/UserActions'
import HeaderStyles from './HeaderStyles';

const Header = () => {
    const classes = HeaderStyles();
    const { authenticated } = useContext(StateContext);
    const dispatch = useContext(DispatchContext);
    const handleClick = () => {
        if(!authenticated){
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
          <Button color="inherit" className={classes.button} onClick={() => handleClick()}>{!authenticated ? "Login" : "Logout"}</Button>
        </Toolbar>
        <LoginScreen />
      </AppBar>
    )
}

export default Header
