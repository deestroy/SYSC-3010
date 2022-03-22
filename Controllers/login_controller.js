import {OAuth2Client} from 'google-auth-library'
var CLIENT_ID ='591797426704-jgsrnsm0ejafrp8tt8rassrhacf8n976.apps.googleusercontent.com'
const client = new OAuth2Client(CLIENT_ID)
var userid;
//verifys token
async function verify(req, res){

    async function verify(token, clientID) {

    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: clientID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    userid = payload['sub'];
    console.log(userid)
    // If request specified a G Suite domain:
    // const domain = payload['hd'];
    }
    verify(req.body.token, CLIENT_ID).then(()=>{
        res.redirect('/home.html')
    }).catch(()=>{
        console.error()
    })
}
export{verify}