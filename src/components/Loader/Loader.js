import React, { useEffect } from 'react';
import {useDispatch} from 'react-redux';
import { setAnimationFinished } from '../../state/actions/AuthActions'
import logo from '../../components/Header/logo.svg'
function Loader() {
    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(() => dispatch(setAnimationFinished()), 0);
    }, [])

    return (
       
<div id="center">
  <img src={logo} width="150" alt="" />
  <div class="rocket-loader">
    <div class="dot">
      <div class="first"></div>
    </div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
  </div>
  Loading...
</div>
    );
  }

  export default Loader;