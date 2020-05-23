import React, {useEffect} from "react";
import Layout from "./layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import {
  listenForFirebaseAuthEvents,
} from "./state/actions/AuthActions";
import Loader from "./components/Loader/Loader"




function Main() {
  const appLoaded = useSelector((state) => state.authState.appLoaded);
  const animationFinished = useSelector((state) => state.authState.animationFinished);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listenForFirebaseAuthEvents());
  }, [dispatch])


  if (!appLoaded || !animationFinished) {
    return (
      <div >
        <Loader />
      </div>
    );
  }
  return <Layout />;
}

export default Main;
