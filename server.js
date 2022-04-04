import express from 'express';
import bodyParser from 'body-parser'
import { addGoal, getUserData, getUserGoals, getUserStats} from './FireBaseFunctions.js'
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
        const USER_DATA = await getUserData(USER_ID)
        res.setHeader('Content-Type', 'application/json')
        res.send(USER_DATA)
    })
})

server.post('/scan', (req, res)=>{
  
    res.sendStatus(200)
})

server.post('/getStats', (req, res)=>{
    checkAuthenticated(req, res, async(req, res)=>{
        const TYPE = req.body.type
        const STATS = await getUserStats(req.body.userID)
        const CURRENT_DATE = Date.now()
        let average=0
        let median=0
        let dataSet = {}  
        let xy= {}
        let startDate = null
        if(TYPE=="MONTHLY"){
             startDate = new Date(CURRENT_DATE)
             startDate.setMonth(startDate.getMonth()-1)
             Object.keys(STATS).forEach((key)=>{
                if(new Date(key).getTime()>startDate.getTime()){
                    xy[key] = STATS[key];
                }
             });
        }else if(TYPE=="YEARLY"){
            startDate = new Date(CURRENT_DATE)
            startDate.setFullYear(startDate.getFullYear()-1)
             
            Object.keys(STATS).forEach((key)=>{
                if(new Date(key).getTime()>startDate.getTime()){
                    xy[key] = STATS[key];
                }
             });
        }else{
           xy=STATS
        }
        dataSet.x = Object.keys(xy)
        dataSet.y = Object.values(xy)
        res.send(JSON.stringify(dataSet))
    })
})
server.post('/addGoal',(req, res)=>{
    checkAuthenticated(req, res, (req, res)=>{
        const GOAL = {
            "name":req.body.goalName,
            "content":req.body.goalText,
            "date":req.body.completionDate
        }
        addGoal(req.body.userID, GOAL)

    })
    res.redirect('/profile.html')
    
} )
server.post('/getGoals', (req, res)=>{
    checkAuthenticated(req, res, async(req,res)=>{
        const GOALS = await getUserGoals(req.body.userID)
        res.send(JSON.stringify(GOALS))
    })
  
})
const PORT = process.env.PORT ||7500;
server.listen(PORT, console.log(`Server started  on port ${PORT}`))
