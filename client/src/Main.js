import React, { useEffect } from 'react';
import {MainTxtinput} from './MainTxtinput';
import Comments from './Comments';
import Posts from './Posts';
const Main = ()=>{

  useEffect(()=>{
  });

  return(
      <>
        <MainTxtinput></MainTxtinput>
        <Posts></Posts>
      </>
  )
}

export default Main;