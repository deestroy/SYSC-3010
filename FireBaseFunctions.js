import { getDatabase, ref, onValue, get, child, push, set} from 'firebase/database'
import { initializeApp } from 'firebase/app'
var data
const firebaseConfig = {
    apiKey: "AIzaSyAmHtdWuIyvGzFkxE_NNc7hMBMIDZ4eG7s",
    authDomain: "sysc3010-project-l1g3.firebaseapp.com",
    databaseURL: "https://sysc3010-project-l1g3-default-rtdb.firebaseio.com",
    storageBucket: "sysc3010-project-l1g3.appspot.com"
};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app)
const userRef = ref(db)

async function getUserData(userid){
    
   await get(child(userRef,userid)).then((snapshot)=>{
        if(snapshot.exists()){
            var val=snapshot.val()
            data=val
            console.log(data)
            return val
        }else{
            return null
        }
    }).catch((error) => {
        console.error(error);

      });
}
function pushUser(userid, user_email){
  
    if(getUserData(userid)==null){
        console.log('ran')
        var baseRef = ref(db,userid)
        var writeRef = push(baseRef)
        set(writeRef, {
            email: user_email,
            RPI_Controller_Adress:'192.168.2.174',
            RPI_Display_Adress:'192.170.2.174'
        })
        
    }
    return false;
   
}
export { getUserData, pushUser, data}