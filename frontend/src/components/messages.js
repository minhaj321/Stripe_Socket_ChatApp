import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Messages = ({data}) => {

const [msg,setMsg]=useState('')
let [allMsgs,setAllMsgs] = useState([]);


useEffect(()=>{
    const merged = EmailMerging();
    const msgGetting = async ()=>{
     var Msgs = await axios.get(`http://localhost:3001/messages/${merged}`);
        allMsgs=Msgs.data;
        setAllMsgs(allMsgs)
    }
msgGetting();
},[data.selectedemail])

// Email Merging Function
const EmailMerging =()=>{
    var email1 =  data.selectedemail.split('.');
    email1=email1[0]+email1[1];    
    var email2 =  data.logedemail.split('.');
    email2=email2[0]+email2[1];

    if(email1>email2){
        var merged = email1+email2;
    }
    else { 
        var merged = email2+email1;
    }
    return merged;
}


// Message Send funtion
const send =async ()=>{
    const merged = EmailMerging();
    setMsg('')
    var mydata={
        merged,
        msg,
        senderemail : data.logedemail,
        sendername : data.logedname,
    }
    await axios.post('http://localhost:3001/messages',mydata);
};


// Message Delete Function
const deleteMsg = async (id) =>{
    var merged = EmailMerging();
    var obj={
        id,
        merged
    }
await axios.post('http://localhost:3001/deletemsg',obj);
}

// Start of main return
    return ( 
        <div>
            <input value={msg} onChange={e=>setMsg(e.target.value)} placeholder="Enter message here"/>
            <button onClick={()=>send()}>Send</button>

            {
                    allMsgs &&
                allMsgs.map((v,i)=>{
                    return(
                <div key={i}>
                    <h4>
                        {/* check for delete button */}
                        {   
                        v.senderemail===data.logedemail &&
                        <button onClick={()=>deleteMsg(v._id)}>x</button>
                        }
                        {/* end of delete code */}
                    
                    {v.sendername}-{v.msg}
                    </h4>
                </div>
                )
                })
            }
        </div>
     );
}
 
export default Messages;