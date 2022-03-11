import {OAuth2Client} from 'google-auth-library';
var CLIENT_ID ='591797426704-jgsrnsm0ejafrp8tt8rassrhacf8n976.apps.googleusercontent.com'
var CLIENT_SECRET = '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'
const client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET);
var userid;
async function verify(req, res, next){

    async function verify() {

    const ticket = await client.verifyIdToken({
        idToken: req.body.token,
        audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    userid = payload['sub'];
    console.log(userid)
    // If request specified a G Suite domain:
    // const domain = payload['hd'];
    }
    verify().then(()=>{
        next()
    })
}
export{verify}