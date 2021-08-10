import React, { useState } from 'react';
import axios from 'axios';
const SignUp = () => {
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

const SignMeUp= async ()=>{
    var data={
        name,
        email,
        password
    };
    await axios.post('http://localhost:3001/signup',data);
}

    return ( 
    <div>
        <h1>SignUp</h1>
        <h4>Name</h4>
        <input value={name} onChange={e=>setName(e.target.value)}/>
        <h4>Email</h4>
        <input value={email} onChange={e=>setEmail(e.target.value)}/>
        <h4>Password</h4>
        <input value={password} onChange={e=>setPassword(e.target.value)}/>
        <button onClick={()=>SignMeUp()}>Sign Up</button>

    </div> );
}
 
export default SignUp;