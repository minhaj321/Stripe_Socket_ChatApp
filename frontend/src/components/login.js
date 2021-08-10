import React, { useState } from 'react';
import axios from 'axios';
const LogIn = (props) => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    const LogMeIn= async ()=>{
        var data={
            email,
            password
        };
        await axios.post('http://localhost:3001/login',data).then(res=>{
        localStorage.setItem('name',res.data.name);
        localStorage.setItem('email',res.data.email);
        localStorage.setItem('token',res.data.token);
        props.callMe();
    });
    }
    

    return ( 
    <div>
        <h1>LogIn</h1>
        <h4>Email</h4>
        <input value={email} onChange={e=>setEmail(e.target.value)}/>
        <h4>Password</h4>
        <input value={password} onChange={e=>setPassword(e.target.value)}/>
        <button onClick={()=>LogMeIn()}>Log In</button>
    </div> );
}
 
export default LogIn;