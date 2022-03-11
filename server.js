import express from 'express';
import bodyParser from 'body-parser'
const server = express();

import { initializeApp } from 'firebase/app'
import { getDatabase} from 'firebase/database'
const firebaseConfig = {
    apiKey: "AIzaSyAmHtdWuIyvGzFkxE_NNc7hMBMIDZ4eG7s",
    authDomain: "sysc3010-project-l1g3.firebaseapp.com",
    databaseURL: "https://sysc3010-project-l1g3-default-rtdb.firebaseio.com",
    storageBucket: "sysc3010-project-l1g3.appspot.com"
};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app)

//server.use(express.static(__dirname+'/public')) //static files location
server.use(bodyParser.urlencoded({'extended':'true'}))
server.use(bodyParser.json())

server.get('/',(req,res)=>{
    res.send('A simple Node app is runing on this server')
    res.end();
})
const PORT = process.env.PORT ||5000;
server.listen(PORT, console.log(`Server started  on port ${PORT}`))
