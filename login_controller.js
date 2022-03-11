import {OAuth2Client} from 'google-auth-library';
var CLIENT_ID ='363664896936-hnbv6e362m5rs4lvdeb8236go8g0agpk.apps.googleusercontent.com'
const client = new OAuth2Client(CLIENT_ID);
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