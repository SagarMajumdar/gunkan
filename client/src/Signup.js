import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import gunkanlogo from './assets/gunkan.png'
import { Link } from "react-router-dom";
const Signup = () => {

    const [uname, setUname] = useState('');
    const [ubio, setUbio] = useState('');
    const [uemail, setUemail] = useState('');
    const [upass, setUpass] = useState('');
    const [upassconf, setUpassconf] = useState('');

    const [msg, setMsg] = useState('');

    const history = useNavigate();

    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        if (uname.trim() == '' || uemail.trim() == '' || upass.trim() == '' || upassconf.trim() == '') {
            setMsg('one or more mandatory fields are left blank. retry ');
        }
        else if (upass.trim() != upassconf.trim()) {
            setMsg('password and confirm password field values do not match. retry');
        }
        else {
            setMsg('');
            try {
                const result = await axios.post('http://localhost:5000/gunkan/api/usersignup', { uname, ubio, uemail, upass });
                console.log(result);
                history('/gunkan/verify-email');
            }
            catch (err) {
                console.log(err);
            }
        }
    }

    return (
        <>
            <Link to="/gunkan/signup">signup</Link>
            <Link  to="/gunkan/login">login</Link>
            
            <div className="columns is-vcentered">
                    <div className="column is-1"></div>
                    <div className="column is-1"><img src={gunkanlogo} alt="gunkan"></img></div>
                    <div className="column is-2"> <h4 className="title is-4">gunkan</h4> </div>
                    <div className="column"></div>
            </div>
            <div className="columns">
                <div className="column is-1"></div>
                <div className="column is-1"><h5 className="title is-5">signup</h5> </div>
                <div className="column"></div>
            </div>
            
            <form onSubmit={handleSignupSubmit}>
                
            <div className="columns">
                <div className="column is-1"></div>
                <div className="column is-1">* name</div>
                <div className="column is-2"><input className="input is-small" value={uname} onChange={(e) => { setUname(e.target.value) }} type="text" ></input></div>
                <div className="column is-1"></div>
                <div className="column is-2"></div>
                <div className="column"></div>
            </div>
            <div className="columns">
                <div className="column is-1"></div>
                <div className="column is-1">bio</div>
                <div className="column is-2"> <textarea className="textarea is-small" rows="2" value={ubio} onChange={(e) => { setUbio(e.target.value) }}></textarea></div>
                <div className="column is-1"></div>
                <div className="column is-2"></div>
                <div className="column"></div>
            </div>
            <div className="columns">
                <div className="column is-1"></div>
                <div className="column is-1">* email</div>
                <div className="column is-2"> <input className="input is-small" value={uemail} onChange={(e) => { setUemail(e.target.value) }} type="text"></input></div>
                <div className="column is-1"></div>
                <div className="column is-2"></div>
                <div className="column"></div>
            </div>    
            <div className="columns">
                <div className="column is-1"></div>
                <div className="column is-1">* password</div>
                <div className="column is-2"> <input  className="input is-small" value={upass} onChange={(e) => { setUpass(e.target.value) }} type="text"></input></div>
                <div className="column is-1">* re enter password</div>
                <div className="column is-2"><input className="input is-small" value={upassconf} onChange={(e) => { setUpassconf(e.target.value) }} type="text"></input></div>
                <div className="column"></div>
            </div> 
            <div className="columns">
                <div className="column is-1"></div>
                <div className="column is-1"></div>
                <div className="column is-2">
                    <button className="button is-small is-success"
                    disabled={uname == '' || uemail == '' || upass == '' || upassconf == '' || (upass != upassconf)}
                    type="submit">signup</button>
                    
                    <button style={{marginLeft:'10px'}} className="button is-small " type="button" onClick={() => {
                    setUname('');
                    setUbio('');
                    setUemail('');
                    setUemail('');
                    setUpassconf('');
                    setMsg('');
                }}>clear</button></div>
                <div className="column"></div>
            </div>    
                    
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

                <p>{msg}</p>
            </form>


        </>
    );
}

export default Signup;