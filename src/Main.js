import React from "react";
import Layout from "./layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import * as firebase from "firebase/app";
import {
  loginSuccess,
  logoutSuccess,
  updateAccountId,
} from "./state/actions/AuthActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100%"
  }
}));

function Main() {
  const styles = useStyles();
  const dispatch = useDispatch();
  const appLoaded = useSelector((state) => state.authState.appLoaded);
  if (!appLoaded) {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        dispatch(loginSuccess(user));
        firebase
          .firestore()
          .doc(`users/${user.uid}`)
          .get()
          .then((doc) => dispatch(updateAccountId(doc.data.account)));
      } else {
        dispatch(logoutSuccess());
      }
    });
  }
  if (!appLoaded) {
    return (
      <div className={styles.root}>
        <CircularProgress />
      </div>
    );
  }
  return <Layout />;
}

export default Main;
