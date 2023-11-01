/* eslint-disable no-undef */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import React from 'react'
import { useLottie } from "lottie-react";
//import animation from "../Loading/login.json"

const Loading = ({animation}) => {
    const options = {
      animationData: animation.default,
      loop: true,
      autoplay: true,
    };
    const style = {
        height: 300,
    };
    const { View } = useLottie(options, style);
  
    return View;
  };



export default Loading;

