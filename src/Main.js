import React, {useEffect} from "react";
import Layout from "./layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import firebase from './firebase';
import {
  loginSuccess,
  logoutSuccess,
  updateAccountId,
  listenForFirebaseAuthEvents,
} from "./state/actions/AuthActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import { subscribeToDocumentList } from "./state/actions/DocumentListActions";
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
  const appLoaded = useSelector((state) => state.authState.appLoaded);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listenForFirebaseAuthEvents());
  }, [dispatch])

  
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
