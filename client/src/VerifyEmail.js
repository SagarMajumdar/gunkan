import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import gunkanlogo from './assets/gunkan.png'
import { Link } from "react-router-dom";
export const VerifyEmail = () => {
    const history = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            history('/gunkan/login');
        }, 10000);
    }, []);

    return (
        <>
            <Link to="/gunkan/signup">signup</Link>
            <Link to="/gunkan/login">login</Link>
            <div className="columns is-vcentered">
                        <div className="column is-1"></div>
                        <div className="column is-1"><img src={gunkanlogo} alt="gunkan"></img></div>
                        <div className="column is-2"> <h4 className="title is-4">gunkan</h4> </div>
                        <div className="column"></div>
                </div>
                <div className="columns">
                    <div className="column is-1"></div>
                    <div className="column is-3"><h6 className="title is-6">  thanks for signing up</h6></div>
                    <div className="column"></div>
                </div>
                <div className="columns">
                    <div className="column is-1"></div>
                    <div className="column is-3"><p className="content">a verification email has been sent to the provided email address.
                Verification is needed to access the features of this
                web application. Please verify the email and then log in.
            </p> </div>
                    <div className="column"></div>
                </div>
                
          
            


        </>
    )
}