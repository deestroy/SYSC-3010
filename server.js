import express from 'express';
import bodyParser from 'body-parser'
import { addGoal, getGoalsByDate, getItemsToRescan, getUserData, getUserGoals, getUserStats, removeRescanItems, updateIntake, updateRescanTable, updateScanFlag} from './FireBaseFunctions.js'
import cookieParser from 'cookie-parser'
import path from 'path';
import {fileURLToPath} from 'url';

import { checkAuthenticated, verify} from './Controllers/login_controller.js'
import { sendEmail } from './emailFunctions.js';
import { time } from 'console';

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
server.post('/user_items', async(req, res)=>{
    await checkAuthenticated(req, res, async (req,res)=>{
    
        const USER_ID=req.body.userID
        const USER_DATA = await getUserData(USER_ID)
    
        res.setHeader('Content-Type', 'application/json')
        res.send(USER_DATA)
    })
})

server.post('/scan', async(req, res)=>{
    await checkAuthenticated(req,res, (req, res)=>{
        updateScanFlag(req.body.userID, req.body.userEmail)
        res.sendStatus(200)
    })
   
})
server.post('/rescan',async (req,res)=>{
    await checkAuthenticated(req,res, (req, res)=>{
       updateRescanTable(req.body.userID, req.body.items)
        updateScanFlag(req.body.userID, req.body.userEmail)
        res.sendStatus(200)
    })
    

})
server.post('/intake', async (req, res)=>{
    await checkAuthenticated(req,res, (req, res)=>{
        updateIntake(req.body.userID,req.body.calories)
        res.sendStatus(200)
    })
})
server.post('/getStats', async (req, res)=>{
    await checkAuthenticated(req, res, async(req, res)=>{
        const TYPE = req.body.type
        const STATS = await getUserStats(req.body.userID)
        const CURRENT_DATE = Date.now()
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
server.post('/addGoal',async(req, res)=>{
    await checkAuthenticated(req, res, (req, res)=>{
        const GOAL = {
            "name":req.body.goalName,
            "content":req.body.goalText,
            "date":req.body.completionDate,
            "email": req.body.userEmail
        }
        addGoal(req.body.userID, GOAL)

    })
    res.redirect('/profile.html')
    
} )
server.post('/getGoals', async(req, res)=>{
    await checkAuthenticated(req, res, async(req,res)=>{
        const GOALS = await getUserGoals(req.body.userID)
        res.send(JSON.stringify(GOALS))
    })
  
})
server.delete('/items_updated', async(req, res)=>{
    await checkAuthenticated(req, res, async (req, res)=>{
        removeRescanItems(req.body.userID)
    })
})
let endDate = new Date()
endDate.setHours(13)
endDate.setMinutes(5)
let startTime = Date.now()
/**
 * Every day check if emails need to be sent
 */
setInterval(async()=>{
    console.log('Sent emails for today')
    const GOALS = await getGoalsByDate(new Date())
    if(GOALS !=undefined){
        Object.keys(GOALS).forEach((goal)=>{
            sendEmail(GOALS[goal].email,GOALS[goal])
        })
    }
    
    endDate.setDate(endDate.getDate+1)
    startTime=Date.now()
}, endDate.getTime()-startTime)
const PORT = process.env.PORT ||7500;
server.listen(PORT, console.log(`Server started  on port ${PORT}`))
