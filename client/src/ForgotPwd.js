import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import gunkanlogo from './assets/gunkan.png'


const ForgotPwd = () => {
    const [emailVal, setEmailVal] = useState('');
    const [success, SetSuccess] = useState(false);
    const navigate = useNavigate();
    const sendPwdResetMail = async () => {
        try {
            await axios.get('http://localhost:5000/gunkan/api/forgotpwd/' + emailVal);
            SetSuccess(true);
            setTimeout(() => {
                navigate('/gunkan/login');
            }, 10000)

        }
        catch (err) {
            console.log(err);
        }
    }

    return success ? (
        <>
            <Link to="/gunkan/signup">signup</Link>
            <Link to="/gunkan/login">login</Link>
            <div className="columns is-vcentered">
                        <div className="column is-1"></div>
                        <div className="column is-1"><img src={gunkanlogo} alt="gunkan"></img></div>
                        <div className="column is-2"> <h4 className="title is-4">gunkan</h4> </div>
                        <div className="column"></div>
                </div>
                <div className="columns is-vcentered">
                        <div className="column is-1"></div>
                        <div className="column is-1"></div>
                        <div className="column is-2">  <p className="content"> check your email for a reset link</p> </div>
                        <div className="column"></div>
                </div>
           
        </>
    ) :
        (

            <>
                <Link className="is-link" to="/gunkan/signup">signup</Link>\
                <Link className="is-link" to="/gunkan/login">login</Link>
                
                <div className="columns is-vcentered">
                        <div className="column is-1"></div>
                        <div className="column is-1"><img src={gunkanlogo} alt="gunkan"></img></div>
                        <div className="column is-2"> <h4 className="title is-4">gunkan</h4> </div>
                        <div className="column"></div>
                </div>
                <div className="columns">
                    <div className="column is-1"></div>
                    <div className="column is-3"><p className="content ">enter your registered email and we will send you a reset password link</p> </div>
                    <div className="column"></div>
                </div>
                
                <div className="columns">
                    <div className="column is-1"></div>
                    <div className="column is-2">  <input  className="input is-small " value={emailVal} onChange={(e) => { setEmailVal(e.target.value) }} type="text" ></input></div>
                    <div className="column is-1">  <button className="button is-small" disabled={emailVal == ''} type="button" onClick={sendPwdResetMail}> get reset link</button></div>
                    <div className="column"></div>
                </div>
                <div className="columns">
                    <div className="column is-1"></div>
                    <div className="column is-2"> 
                        <div className="content is-small">
                            <span className="is-small tag is-info" style={{marginRight:'5px'}}>i</span> 
                            <p>built using mern stack and for styling bulma is used</p>
                            <p>this project contains login with password reset and email verification</p>
                            <div>Icons made by <a href="https://www.flaticon.com/authors/icongeek26" title="Icongeek26">Icongeek26</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
                        </div>
                    </div>
                    <div className="column"></div>
                </div>

                
               
            </>


        )
}

export default ForgotPwd;