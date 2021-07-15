// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyAaW3Wr58E9MRcWWf6_w8M-V57-SxgO2GI",
  authDomain: "ccas-77c96.firebaseapp.com",
  databaseURL: "https://ccas-77c96-default-rtdb.firebaseio.com",
  projectId: "ccas-77c96",
  storageBucket: "ccas-77c96.appspot.com",
  messagingSenderId: "95714386169",
  appId: "1:95714386169:web:6893537f9b0d6cbbb9c228",
  measurementId: "G-J42PYMQWX8"
};
//Initialize Firebase
firebase.initializeApp(firebaseConfig);

var uid;
var email;
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    var uid = user.uid;
    var email = user.email;
    //console.log(uid);
    //loadProfile();
    // ...
  } else {
    // User is signed out
    // ...
    location.href = "index.html";
  }
});

const msgScreen = document.getElementById("mesages"); //the <ul> that displays all the <li> msgs
const msgForm = document.getElementById("messageForm"); //the input form
const msgInput = document.getElementById("msg-input"); //the input element to write messages
const msgBtn = document.getElementById("msg-btn"); //the Send button

const db = firebase.database();
const msgRef = db.ref("/msgs"); 

//let name="";
//function init() {
//  name = prompt("Please enter your name");
//}
//document.addEventListener('DOMContentLoaded', init);


msgForm.addEventListener('submit', sendMessage);

function sendMessage(e){
    e.preventDefault();
    const text = msgInput.value;
  
      if(!text.trim()) return alert('Please type a message'); //no msg submitted
      const msg = {
          uid: uid,
          text: text
      };
  
      msgRef.push(msg);
      msgInput.value = "";
  }



  const updateMsgs = data =>{
    const {datauid, text} = data.val(); //get name and text
    //load messages, display on left if not the user's name. Display on right if it is the user.
    var today = new Date();
    var times = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const msg = `<li class="${datauid == uid ? "msg my": "msg"}">
      <div class="${datauid == uid ? "container darker": "container"}">
      <span class = "msg-span">
      <i class = "name">${email}: </i>${text}<br>
      </span>
      </span>
      </div>
      </li>`

  
    msgScreen.innerHTML += msg; //add the <li> message to the chat window
  
    //auto scroll to bottom
    document.getElementById("chat-widow").scrollTop = document.getElementById("chat-widow").scrollHeight;


  }

  msgRef.on('child_added', updateMsgs);