import React from "react";
import Layout from "./layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import firebase from './firebase';
import {
  loginSuccess,
  logoutSuccess,
  updateAccountId,
} from "./state/actions/AuthActions";
import Loader from "./components/Loader/Loader"
import { makeStyles } from "@material-ui/core/styles";
import { subscribeToDocumentList } from "./state/actions/DocumentListActions";
const useStyles = makeStyles((theme) => ({
  
}));

function Main() {
  const styles = useStyles();
  const dispatch = useDispatch();
  const appLoaded = useSelector((state) => state.authState.appLoaded);
  const animationFinished = useSelector((state) => state.authState.animationFinished);
  if (!appLoaded) {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        firebase
        .firestore()
        .doc(`users/${user.uid}`)
        .get()
        .then((doc) => {
            dispatch(updateAccountId(doc.data().account))
            dispatch(subscribeToDocumentList());
            dispatch(loginSuccess(user));
        });
      } else {
        dispatch(logoutSuccess());
      }
    });
  }
  if (!appLoaded || !animationFinished) {
    return (
      <div className={styles.root}>
        <Loader />
      </div>
    );
  }
  return <Layout />;
}

export default Main;
