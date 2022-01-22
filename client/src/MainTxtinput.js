import axios from "axios";
import React, { useState } from "react";

export const MainTxtinput = () => {
    const [txtPost, setTxtPost]=useState('');

    const handlePostSubmit = async ()  => { 

        const gunkanaccesstoken= localStorage.getItem('gunkanaccesstoken');
        const res = await axios.post( 'http://localhost:5000/gunkan/api/addpost',   { txtPost } ,  
            {headers: { authorization: `Bearer ${gunkanaccesstoken}`}} );
    }

    return(
        <>
            <form onSubmit={handlePostSubmit}>
                <div>
                    <textarea value={txtPost} onChange={(e)=>{setTxtPost(e.target.value) }} rows="2" ></textarea>
                </div>
                <div>
                    <button type="submit" disabled = { txtPost == ''  } >add post</button>
                </div>
            </form>

        </>
    )
};