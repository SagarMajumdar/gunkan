import React, { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import gunkanlogo from './assets/gunkan.png'


const ResetPwdLanding = () => {
    const [newPassword, setNewPassword] = useState('');
    const [isVerificationOK, setIsVerificationOK] = useState(false);
    const [isVerificationFail, setIsVerificationFail] = useState(false);
    const { verificationstr } = useParams();

    const navigate = useNavigate();

    const submitNewPwd = async () => {
        try {
            const result = await axios.post('http://localhost:5000/gunkan/api/verifyresetpwd', { verificationstr, newPassword });
            console.log(result);
            setIsVerificationOK(true);
            setTimeout(() => {
                navigate('/gunkan/login');
            }, 10000)
        }
        catch (err) {
            console.log(err);
            setIsVerificationFail(true);
            setTimeout(() => {
                navigate('/gunkan/login');
            }, 10000)
        }
    }

    return (

        <>
            <Link  to="/gunkan/signup">signup</Link>
            <Link to="/gunkan/login">login</Link>
            
            <div className="columns is-vcentered">
                    <div className="column is-1"></div>
                    <div className="column is-1"><img src={gunkanlogo} alt="gunkan"></img></div>
                    <div className="column is-2"> <h4 className="title is-4">gunkan</h4> </div>
                    <div className="column"></div>
            </div>
            <div className="columns">
                <div className="column is-1"></div>
                <div className="column is-1">* enter new password</div>
                <div className="column is-2">   <input className="input is-small" value={newPassword} onChange={(e) => { setNewPassword(e.target.value) }} type="text" ></input></div>
                <div className="column is-1"></div>
                <div className="column is-2"></div>
                <div className="column"></div>
            </div>
            <div className="columns">
                <div className="column is-1"></div>
                <div className="column is-1"></div>
                <div className="column is-2">
                    <button className="button is-small is-success" disabled={newPassword == ''} type="button" onClick={submitNewPwd}>set password</button>
                </div>
                <div className="column"></div>
            </div>    
          
            

            {
                isVerificationOK &&
                <div className="columns is-vcentered">
                    <div className="column is-1"></div>
                    <div className="column is-1"></div>
                    <div className="column is-2">  <p  className="content">password reset was successful.
                    you will be taken to the login page.</p> </div>
                    <div className="column"></div>
                </div>
               
            }
            {
                isVerificationFail &&
                <div className="columns is-vcentered">
                <div className="column is-1"></div>
                <div className="column is-1"></div>
                <div className="column is-2">  <p  className="content">password reset was not successful. retry.</p> </div>
                <div className="column"></div>
            </div>
           
            }


        </>

    )
}

export default ResetPwdLanding;