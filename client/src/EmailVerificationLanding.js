import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";


import gunkanlogo from './assets/gunkan.png';

const EmailVerificationLanding = () => {

    const [isVerificationOK, setIsVerificationOK] = useState(false);

    const { verificationstr } = useParams();

    useEffect(async () => {
        try {
            const result = await axios.post('http://localhost:5000/gunkan/api/verifyemailr', { verificationstr });
            console.log(result);
            setIsVerificationOK(true);
        }
        catch (err) {
            console.log(err);
            setIsVerificationOK(false);
        }

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
            <div>
                {isVerificationOK &&
                <div className="columns is-vcentered">
                    <div className="column is-1"></div>
                    <div className="column is-1"></div>
                    <div className="column is-2"> <p className="content"> email verification was successful. Click <Link className="is-link" to='/gunkan/login'>here</Link> to go to the login page</p> </div>
                    <div className="column"></div>
                 </div>
                    
                }
                {
                    !isVerificationOK &&
                    <div className="columns is-vcentered">
                        <div className="column is-1"></div>
                        <div className="column is-1"></div>
                        <div className="column is-2"> <p className="content"> email verification was not successful. Re verify from the email sent.</p> </div>
                        <div className="column"></div>
                    </div>
               
                }
            </div>
        </>
    )
}

export default EmailVerificationLanding;