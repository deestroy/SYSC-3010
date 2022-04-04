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
 * Gets the users Goals
 * @param {String} userid the userid of the user
 * @returns a Goals object
 */
async function getUserGoals(userid){
  let userGoals = null
  await get(child(userRef, userid+"/Goals")).then((snapshot)=>{
    if(snapshot.exists()){
      userGoals = snapshot.val()
    }
  }).catch((error)=>{
    console.error(error)
  })
  return Promise.resolve(userGoals)
}
/**
 * Gets Goals for a specific date
 * @param {Date} date 
 * @returns a JSON object containing goals
 */
async function getGoalsByDate(date){
  let dateGoals = null
  const DATE_STRING = date.toISOString().split('T')[0]
  console.log(DATE_STRING)
  await get(child(userRef,DATE_STRING)).then((snapshot)=>{
    if(snapshot.exists()){
      dateGoals = snapshot.val()
    }
  }).catch((error)=>{
    console.error(error)
  })
  return Promise.resolve(dateGoals)
}
/**
 * Gets the users Daily Intake
 * @param {String} userid the google userid of the user
 * @returns the Daily Intake object
 */
async function getUserStats(userid){
  let userStats= null
  await get(child(userRef, userid+"/Daily_Intake")).then((snapshot)=>{
    if(snapshot.exists()){
      userStats = snapshot.val();
    }
  }).catch((error)=>{
    console.error(error);
  })
 return Promise.resolve(userStats)
  
}
async function updateIntake(userid, calories){
  let intake
  const dateString = new Date().toISOString().split('T')[0]
  await get(child(userRef, userid+"/Daily_Intake/"+dateString)).then((snapshot)=>{
    if(snapshot.exists()){
      intake = snapshot.val()+calories
    }
    else{
      intake= calories
    }
  }).catch((error)=>{
    console.error(error);
  })
  const baseRef = ref(db, userid+"/Daily_Intake/"+dateString)
  push(baseRef)
  set(baseRef, intake)
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
/**
 * Stores goal in firebase
 * @param {String, Number} userid the id of the user
 * @param {Object} goal the goal object
 */
async function addGoal(userid, goal){
  let baseRef = ref(db, userid+'/Goals/'+goal.date+"/"+goal.name)
  push(baseRef)
  set(baseRef, goal)
  baseRef = ref(db, goal.date+"/"+goal.name)
  push(baseRef)
  set(baseRef,goal)
}
async function updateScanFlag(userid){
  const baseRef = ref(db, userid+'/Scan_Items')
  push(baseRef)
  set(baseRef, true)
}
async function updateRescanTable(userid, items){
  const baseRef =ref(db, userid+"/weigh_items")
  push(baseRef)
  set(baseref, items)
}

export { getUserData, pushUser, getUserStats, addGoal, getUserGoals, updateRescanTable, updateScanFlag, getGoalsByDate, updateIntake};
/*  Style used: airbnb. FLAKE8 can not be used for JavaScript. ESLint output:
C:\Users\Thomas\Documents\3010Project\SYSC-3010\FireBaseFunctions.js
  27:5  warning  Unexpected console statement  no-console

✖ 1 problem (0 errors, 1 warning)

The no-console warning was ignored as the console output prints out an error message if error occurs.
 */
//pushUser(1245,"test")