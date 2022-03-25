import { getDatabase, ref, onValue, get, child, push} from 'firebase/database'
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
    apiKey: "AIzaSyAmHtdWuIyvGzFkxE_NNc7hMBMIDZ4eG7s",
    authDomain: "sysc3010-project-l1g3.firebaseapp.com",
    databaseURL: "https://sysc3010-project-l1g3-default-rtdb.firebaseio.com",
    storageBucket: "sysc3010-project-l1g3.appspot.com"
};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app)
const userRef = ref(db)

function getUserData(userid){
    get(child(userRef,userid)).then((snapshot)=>{
        if(snapshot.exists()){
            return snapshot.val
        }else{
            return null
        }
    }).catch((error) => {
        console.error(error);

      });
}
function pushUser(userid, user_email){
  
    if(getUserData(userid)==null){
        push(child(userRef, userid),{
         
        'email':user_email,
        'RPI_Controller_Address':'192.168.2.174:5050',
        'RPI_Display_Address':'192.168.2.164:5050'
    })
        return true;
    }
    return false;
   
}
export { getUserData, pushUser}