import express from 'express';
import bodyParser from 'body-parser'
import { sendToRPI_Controller } from './send_datagram.js';
import { getUserData, pushUser,data} from './FireBaseFunctions.js'


import { verify} from './Controllers/login_controller.js'
import path, { parse } from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);

// 👇️ "/home/john/Desktop/javascript"
const __dirname = path.dirname(__filename);

const server = express();

server.use(bodyParser.urlencoded({'extended':'true'}))
server.use(bodyParser.json())
server.use(express.static(__dirname+'/public'))
server.get('/',(req,res)=>{
    res.redirect('/home.html')
    res.end();
})
server.get('/home.html', (req,res)=>{
    res.sendFile('/home.html')
})

server.post('/login',(req,res)=>{
    req.header('Content-Type','application/json')
    verify(req, res, __dirname+'/public')
    
})
server.get('/user/:user_id',async (req,res)=>{
    console.log(req.params)
    var userid=req.params.user_id
    console.log("GET request for: "+userid)
    await getUserData(userid)
    res.setHeader('Content-Type', 'application/json')
    console.log(data)
    res.send(data)
})

server.post('/scan', (req, res)=>{
    sendToRPI_Controller("This is test",5050,'192.168.86.30')
    res.sendStatus(200)
})
server.post('/display', (req, res)=>{
    sendToRPI_Controller("This is test",8080,'192.168.2.31')
    res.sendStatus(200)
})

const PORT = process.env.PORT ||7500;
server.listen(PORT, console.log(`Server started  on port ${PORT}`))
