import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import {nanoid} from 'nanoid';
const socket = io('http://localhost:3001');
const userId = nanoid(4);
const SocketIo = () => {
    const [msg,setMsg] = useState('');
    const [allMsg,setAllMsg] = useState([]);
    const [programmingMsg,setprogrammingMsg] = useState([]);
    const [processorMsg,setprocessorMsg] = useState([]);
    const [networkingMsg,setnetworkingMsg] = useState([]);
    const [roomname,setRoomName] = useState('');
    // const [soc,setSoc]=useState();
    useEffect(()=>{
        socket.on('mymsg',(data)=>{
            console.log(data)
            if(data.roomname==='Processor'){
                setprocessorMsg([...processorMsg,data])
                setAllMsg([...processorMsg]);
            }
            else if(data.roomname==='Networking'){
                setnetworkingMsg([...networkingMsg,data])
                setAllMsg([...networkingMsg]);

            }
            else if(data.roomname==='Programming'){
                setprogrammingMsg([...programmingMsg,data])
                setAllMsg([...programmingMsg]);
            }
        })

    })

const sended=()=>{
    socket.emit('msg',{msg , userId,roomname})
    setMsg('')
}

const setRoom=(room)=>{
    console.log('sended room==>',room)
    setRoomName(room)
    console.log(roomname)
    socket.emit('setRoom',{room})
}  


    return ( 
    <div>
        <h1>Socket</h1>
        <div className="mainroom">
            <div    onClick={()=>setRoom('Programming')} 
            style={{backgroundColor:'cyan'}}>Programming</div>
            <div    onClick={()=>setRoom('Processor')} 
            style={{backgroundColor:'lightgreen'}}>Processor</div>
            <div    onClick={()=>setRoom('Networking')} 
            style={{backgroundColor:'yellow'}}>Networking</div>

        </div>
        <input type="text" value={msg} onChange={e=>setMsg(e.target.value)}/>
        <button onClick={()=>sended()}>Send Msg</button>
        {allMsg &&
            allMsg.map((v,i)=>{
                return(
                    <div key={i}>
                        <p>{v.userId}-{v.msg}</p>
                    </div>
                )
            })
        }
    </div>
     );
}
 
export default SocketIo;