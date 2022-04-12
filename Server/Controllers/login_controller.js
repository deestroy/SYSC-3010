import {OAuth2Client} from 'google-auth-library'
import {pushUser} from '../FireBaseFunctions.js'
var CLIENT_ID ='591797426704-jgsrnsm0ejafrp8tt8rassrhacf8n976.apps.googleusercontent.com'
const client = new OAuth2Client(CLIENT_ID)
var userid
var email
//verifys token
async function verify(req, res){

    async function verify(token, clientID) {

        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: clientID,  
        });
        const payload = ticket.getPayload();
        userid = payload['sub'];
        email = payload.email
        }
        verify(req.body.token, CLIENT_ID).then(()=>{
            pushUser(userid, email)
            res.cookie('user_cookie',req.body.token,{expires:new Date(Date.now()+600000), httpOnly: true})
            
            res.sendStatus(204)
        }).catch(()=>{
            console.error()
        })
}

function checkAuthenticated(req, res, next){
    let token = req.cookies["user_cookie"]  
    let userID
    let userEmail
    console.log('ran')
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID
        });
        const payload = ticket.getPayload();
        userID = payload['sub'];
        userEmail = payload.email
      }
      verify()
      .then(()=>{
          req.body.userID=userID
          req.body.userEmail =userEmail
          next(req, res);
      }).catch(()=>{
          res.redirect('/login.html')
            return; });

}
export{verify, checkAuthenticated}