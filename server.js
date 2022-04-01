import express from 'express';
import bodyParser from 'body-parser'
import { getUserData, pushUser} from './FireBaseFunctions.js'
import cookieParser from 'cookie-parser'

import { checkAuthenticated, verify} from './Controllers/login_controller.js'
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const server = express();

server.use(bodyParser.urlencoded({'extended':'true'}))
server.use(bodyParser.json())
server.use(express.static(__dirname+'/public'))
server.use(cookieParser())

server.get('/',(req,res)=>{
    console.log('ran')
    res.redirect('/home.html')
    res.end();
})

server.post('/login',(req,res)=>{
    req.header('Content-Type','application/json')
    verify(req, res, __dirname+'/public')
    
})
server.post('/user_items', (req, res)=>{
    checkAuthenticated(req, res, async (req,res)=>{
    
        const USER_ID=req.body.userID
        console.log("GET request for: "+USER_ID)
        const USER_DATA = await getUserData(USER_ID)
        res.setHeader('Content-Type', 'application/json')
        console.log(USER_DATA)
        res.send(USER_DATA)
    })
})

server.post('/scan', (req, res)=>{
    sendToRPI_Controller("This is test",5050,'192.168.86.30')
    res.sendStatus(200)
})
server.post('/display', (req, res)=>{
    
    res.sendStatus(200)
})

const PORT = process.env.PORT ||7500;
server.listen(PORT, console.log(`Server started  on port ${PORT}`))
