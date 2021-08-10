import React , {useState, useEffect } from 'react';
import axios from 'axios';
import Messages from './messages.js'



const UsersList = () => {
    const [users,setUsers]=useState([]);
    const [status,setStatus]=useState(false);
    const [msgstatus,setMsgStatus]=useState(false);
    const [logedname,setLogedName]=useState('');
    const [logedemail,setLogedEmail]=useState('');
    const [selectedname,setSelectedName]=useState('');
    const [selectedemail,setSelectedEmail]=useState('');
    useEffect(()=>{
        const getting = async () =>{
         var users = await axios.get('http://localhost:3001/userslist');
         setUsers(users.data);
         setStatus(true)
        }
        getting();
    },[])

const startConversation=(name,email)=>{
    var locName = localStorage.getItem('name');
    var locEmail = localStorage.getItem('email');
    setLogedEmail(locEmail);
    setLogedName(locName);
    setSelectedEmail(email);
    setSelectedName(name);
if(logedemail){
    setMsgStatus(true)
}
}

    return ( 
        <div>
            {
                status &&
                users.map((v,i)=>{
                    return(
                    <div key={i} style={{border:"2px solid black",marginTop:5 ,
                     cursor:'pointer'}}>
                        <h2 style={{display:'inline'}}>{v.name}</h2>
                        <sub>{v.email}</sub>
                        <button onClick={()=>startConversation(v.name,v.email)}>Click Me</button>
                    </div>
                    )
                })
}
{
msgstatus && 
<Messages data={{logedemail,logedname,selectedemail,selectedname}}/>
}

        </div>
     );
}
 

export default UsersList;



