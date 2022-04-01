import {
  getDatabase, ref, get, child, push, set,
} from 'firebase/database';
import { initializeApp } from 'firebase/app';
var data 
const firebaseConfig = {
  apiKey: 'AIzaSyAmHtdWuIyvGzFkxE_NNc7hMBMIDZ4eG7s',
  authDomain: 'sysc3010-project-l1g3.firebaseapp.com',
  databaseURL: 'https://sysc3010-project-l1g3-default-rtdb.firebaseio.com',
  storageBucket: 'sysc3010-project-l1g3.appspot.com',
};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const userRef = ref(db);
/**
 * returns the User object for a userid.
 * @param userid A user's google userid string
 */
async function getUserData(userid) {
  let userData = null
  await get(child(userRef, userid)).then((snapshot) => {
    if (snapshot.exists()) {
      userData = snapshot.val();
    }
  }).catch((error) => {
    console.error(error);
  });
  return Promise.resolve(userData)
}
/**
 * Pushes a new User object to the firebase database
 * @param {*} userid the google id string of the user
 * @param {*} user_email the email of the user
 * @returns true if the user was added false if it wasnt
 */
async function pushUser(userid, userEmail) {
  var data = await getUserData(userid)
  if ( data == null) {
    const baseRef = ref(db, userid);
    push(baseRef);
    let user = {
      email: userEmail,
      RPI_Controller_Adress: '192.168.2.174',
      RPI_Display_Adress: '192.170.2.174',
    }
    set(baseRef, user);
    return true;
  }
  return false;
}
export { getUserData, pushUser, data };
/*  Style used: airbnb. FLAKE8 can not be used for JavaScript. ESLint output:
C:\Users\Thomas\Documents\3010Project\SYSC-3010\FireBaseFunctions.js
  27:5  warning  Unexpected console statement  no-console

✖ 1 problem (0 errors, 1 warning)

The no-console warning was ignored as the console output prints out an error message if error occurs.
 */
//pushUser(1245,"test")