import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import gunkanlogo from './assets/gunkan.png'
const Login = () => {
    const [uemail, setUemail] = useState('');
    const [upass, setUpass] = useState('');

    const [msg, setMsg] = useState('');

    const nvigate = useNavigate();

    const handleLoginFormSubmit = async (e) => {
        e.preventDefault();
        if (uemail.trim() == '' || upass.trim() == '') {
            setMsg('one or more mandatory fields are left blank. retry ');
        }
        else {
            setMsg('');
            try {
                const result = await axios.post('http://localhost:5000/gunkan/api/userlogin', { uemail, upass });
                console.log(result);
                localStorage.setItem('gunkanaccesstoken', result.data.gunkanaccesstoken);
                nvigate('/gunkan/main');
            }
            catch (err) {
                console.log(err);
            }
        }
    }

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
                <div className="column is-1"><h5 className="title is-5">login</h5> </div>
                <div className="column"></div>
            </div>

            <form onSubmit={handleLoginFormSubmit}>
            <div className="columns">
                <div className="column is-1"></div>
                <div className="column is-1">* email</div>
                <div className="column is-2"> <input className="input is-small " value={uemail} onChange={(e) => { setUemail(e.target.value) }} type="text"></input></div>
                <div className="column is-1"></div>
                <div className="column is-2"></div>
                <div className="column"></div>
            </div>
            <div className="columns">
                <div className="column is-1"></div>
                <div className="column is-1">* password</div>
                <div className="column is-2">  <input  className="input is-small "  value={upass} onChange={(e) => { setUpass(e.target.value) }} type="text"></input></div>
                <div className="column is-1"></div>
                <div className="column is-2"></div>
                <div className="column"></div>
            </div>

            <div className="columns">
                <div className="column is-1"></div>
                <div className="column is-1"></div>
                <div className="column is-2">
                    <button className="button is-small is-success" type="submit">login</button>
                    
                    <Link style={{marginLeft:'10px'}} className="is-small" to="/gunkan/forgotpwd">forgot password ?</Link>
                </div>
                <div className="column"></div>
            </div>    

                
            </form>
            <div className="columns">
                    <div className="column is-2"></div>
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
    );
}

export default Login;