import express from 'express';
import bodyParser from 'body-parser'
import { sendToRPI_Controller } from './send_datagram.js';
import { initializeApp } from 'firebase/app'
import { getDatabase, ref, onValue, get, child} from 'firebase/database'
import { verify } from './Controllers/login_controller.js'

const path = '/home/pi/Documents/Project/SYSC-3010/public'
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
server.use(express.static(path)) //static files location
server.use(bodyParser.urlencoded({'extended':'true'}))
server.use(bodyParser.json())

server.get('/',(req,res)=>{
    res.send('A simple Node app is runing on this server')
    res.end();
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
