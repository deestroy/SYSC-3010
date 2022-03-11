import express from 'express';
import bodyParser from 'body-parser'
import url from "url"
import { sendToRPI_Controller } from './send_datagram.js';
import { initializeApp } from 'firebase/app'
import { getDatabase, ref, onValue, get, child} from 'firebase/database'
import { verify } from './login_controller.js';

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
server.use(express.static('/home/pi/Documents/Project/SYSC-3010/public/public')) //static files location
server.use(bodyParser.urlencoded({'extended':'true'}))
server.use(bodyParser.json())

server.get('/',(req,res)=>{
    res.send('A simple Node app is runing on this server')
    res.end();
})
server.get('/login.html', (req,res)=>{
    res.sendFile(path+'/login.html')
})
server.post('/login',(req,res)=>{
    console.log('ran')
    verify(req,res, ()=>{
        res.sendFile('/public/home.html')
    })
})
server.get('/:user',async (req,res)=>{
    console.log(req.params)
    var userid=req.params.user
    console.log(userid)
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

server.post('/display', (req, res)=>{
    sendToRPI_Controller("This is test",8080,'localhost')
    res.statusCode(200)
})

const PORT = process.env.PORT ||7500;
server.listen(PORT, console.log(`Server started  on port ${PORT}`))
