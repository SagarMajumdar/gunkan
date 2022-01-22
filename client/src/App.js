import React  from 'react';
import { BrowserRouter,Routes, Route } from "react-router-dom";

import Login from './Login';
import Signup from './Signup';
import One from './One';
import { VerifyEmail } from './VerifyEmail';
import EmailVerificationLanding from './EmailVerificationLanding';
import ResetPwdLanding from './ResetPwdLanging';
import ForgotPwd from './ForgotPwd';
import Main from './Main';
import './App.css';
import 'bulma/css/bulma.css';

function App() {
  return (
    <>  
      <BrowserRouter>
        <Routes>
          
          <Route path="/gunkan/one" element={<One />} /> 

          <Route path="/gunkan/login" element={<Login />} />
          <Route path="/gunkan/signup" element={<Signup />} />
          <Route path="/gunkan/verify-email" element={<VerifyEmail />} />          
          <Route path="/gunkan/verify-email-route/:verificationstr" element={<EmailVerificationLanding />} />
          <Route path="/gunkan/forgotpwd" element={ <ForgotPwd/> } />
          <Route path ="/gunkan/resetpwdlanding/:verificationstr" element={ <ResetPwdLanding/>} />
          <Route path="/gunkan/main" element={ <Main/> } />
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
