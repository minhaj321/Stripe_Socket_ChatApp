const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const PORT = 3001;
const app = express();
app.use(cors());
app.use(express.json());
var con = mongoose.connect('mongodb://localhost:27017/dymanicCollections',{
    useCreateIndex:true, useNewUrlParser:true , useUnifiedTopology:true
})


const mySchema = new mongoose.Schema({
    sendername : String,
    senderemail : String,
    msg : String,
});

const myusers = new mongoose.Schema({

    email : {
        type : String,
        required:true,
        unique:true
    },
    name : {
        type:String,
        required : true
    },
    encryptedpassword:{
        type:String,
        required : true
    }

});

mongoose.connection.once('open',()=>{
    console.log('connected with database')
})

const Users = mongoose.model('users',myusers);

app.post('/signup',(req,res)=>{
    var {name , email , password} = req.body;
    const salt = bcrypt.genSaltSync(12);
    const encryptedpassword = bcrypt.hashSync(password,salt);
    var obj={
        name,
        email,
        encryptedpassword
    };
    const newItem = new Users(obj);
    newItem.save();
})

app.post('/login',(req,res)=>{
    var {email,password}=req.body;
    Users.findOne({email}).then(response=>{
        
        var verify = bcrypt.compareSync(password,response.encryptedpassword);
        
        if(verify){
            console.log('verified==>')
            var token = jwt.sign({
                name : response.name,
                email : response.email
            },
            process.env.secret
            );
            res.json({token , name : response.name ,email :  response.email})
            
        }
    })
})

app.get('/userslist',(req,res)=>{
    Users.find().then(response=>{
        res.json(response);
    })
})

app.post('/messages',(req,res)=>{
    var data = req.body;
    const Msg = mongoose.model(data.merged,mySchema);
    
    const changeStream = Msg.watch();
    changeStream.on('change',chnge=>console.log(chnge))
    changeStream.on('error',chnge=>console.log(chnge))
    
    const message =new Msg({
        senderemail:data.senderemail,
        sendername:data.sendername,
        msg:data.msg
    });
    message.save();
})

app.post('/deletemsg',(req,res)=>{
    const data=req.body;
    const Msg = mongoose.model(data.merged,mySchema);
    Msg.findOneAndDelete({_id:data.id},(result,err)=>{
        if(err){

            console.log(err.message)
        }
        else{
            console.log(result)
        }
    })
})

app.get('/messages/:merged',(req,res)=>{
    const Msg = mongoose.model(req.params.merged,mySchema);
    Msg.find().then(response=>{
        res.json(response)
    })
})


app.listen(PORT , ()=>{
    console.log(`app is running on ${PORT}`)
})