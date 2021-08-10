const express = require('express');
const app=express();
const cors = require('cors');
const httpServer = require('http').createServer(app);
const io = require("socket.io")(httpServer,{
    cors:{
        origin:"*",
    }
});
app.use(express.json())
app.use(cors())

const name = 'Minhaj'

// start of connection function
io.on('connection',(socket)=>{
    // socket.join(name);
    console.log('login with socket '  + socket.id)


    // setting the room
    socket.on('setRoom' ,(payload)=>{
        console.log(payload)
        socket.join(payload.room);

    })


    // setting the message 
socket.on('msg',(payload)=>{
    console.log("payload on methdod==>" , payload);
    io.to(payload.roomname).emit('mymsg',payload);
    // io.to(name).emit('mymsg',payload);
})


// end of connection function
})

httpServer.listen(3001,()=>{
    console.log('serunning on 3001')
})