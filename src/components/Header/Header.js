import React from 'react'
import LoginScreen from '../LoginScreen/LoginScreen';
import { useSelector, useDispatch } from 'react-redux';
import { showLoginScreen } from '../../state/actions/AuthActions';
import firebase from '../../firebase';
import {saveDocument, setTitle} from "../../state/actions/EditorActions";
import logo from './logo.svg';
import plusIcon from './plusIcon.svg';


const Header = () => {
    const userLoggedIn = useSelector(state => state.authState.userLoggedIn);
    const title = useSelector(state => state.documentState.content.title);
    const dispatch = useDispatch()

    const handleClick = () => {
        if(!userLoggedIn){
          dispatch(showLoginScreen())
        }  else {
          firebase.auth().signOut()
    }
  }
    return (
        <nav className="navbar">

          <div className="logo-container">
            <img src={logo} alt="Rocket Writer Logo" />
          </div>

          <div className="actions-container">

            <div className="actions-wrapper">
              <button className="add-button">
                <img src={plusIcon} alt="Add Document Icon" />
              </button>

              <button
                className="save-button"
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
              </button>
              
              <button className="delete-button">Delete</button>

              <input className="document-title-input" type="text" placeholder="Give it a title..." value={title} onChange={e => dispatch(setTitle(e.target.value))}></input>
              </div>
            
          </div>

          <div className="menu-container">
            <ul>
              <li className="mr-20">
                <a href="#">Help</a>
              </li>
              <li className="mr-20">
                <a href="#">Contact</a>
              </li>
              <li onClick={() => 
              handleClick()}>{!userLoggedIn ? "Login" : "Logout"}
              </li >
            </ul>
          </div>



          <LoginScreen />

        </nav>
        
 
    )
}

export default Header;
