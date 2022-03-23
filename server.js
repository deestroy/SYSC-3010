import express from 'express';
import bodyParser from 'body-parser'
import { sendToRPI_Controller } from './send_datagram.js';
import { initializeApp } from 'firebase/app'
import { getDatabase, ref, onValue, get, child} from 'firebase/database'
import { verify } from './Controllers/login_controller.js'
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);

// 👇️ "/home/john/Desktop/javascript"
const __dirname = path.dirname(__filename);

const server = express();
const firebaseConfig = {
    apiKey: "AIzaSyAmHtdWuIyvGzFkxE_NNc7hMBMIDZ4eG7s",
    authDomain: "sysc3010-project-l1g3.firebaseapp.com",
    databaseURL: "https://sysc3010-project-l1g3-default-rtdb.firebaseio.com",
    storageBucket: "sysc3010-project-l1g3.appspot.com"
};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app)
const userRef = ref(db)

onValue(userRef,(snapshot)=>{   //Listen for update
    const data = snapshot.val();
    console.log(data)
})
server.use(express.static(__dirname+'/public')) //static files location
server.use(bodyParser.urlencoded({'extended':'true'}))
server.use(bodyParser.json())

server.get('/',(req,res)=>{
    res.redirect('/home.html')
    res.end();
})
server.get('/home.html', (req,res)=>{
    res.sendFile('/public/home.html')
})

server.post('/login',(req,res)=>{
    req.header('Content-Type','application/json')
    verify(req, res)
})
server.get('/user/:user_id',async (req,res)=>{
    console.log(req.params)
    var userid=req.params.user
    console.log("GET request for: "+userid)
    get(child(userRef,userid)).then((snapshot)=>{
        if(snapshot.exists()){
            console.log(snapshot.val())
            res.send(snapshot.val())
        }else{
            res.sendStatus(404)
        }
    }).catch((error) => {
        console.error(error);

      });
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
