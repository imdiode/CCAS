
function disp() {
    if (document.getElementById("1exp").style.display == "block") {
        document.getElementById("1exp").style.display = "none";
    } else {
        document.getElementById("1exp").style.display = "block";
    }
}

const dataModalOpenButton = document.querySelectorAll('[data-modal-target]');
const dataCloseButton = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay');

dataModalOpenButton.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget);
        openModal(modal);
    })
})

dataCloseButton.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.change-modal');
        closeModal(modal);
    })
})

function openModal(modal) {
    if (modal == null) return
    modal.classList.add('active');
}

function closeModal(modal) {
    if (modal == null) return
    modal.classList.remove('active');
}

/* ______________________________By @Enculandus______________________________ */
/* __________________________________________________________________________ */
//user elements Initializations
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    var uid = user.uid;
    var db = firebase.firestore();
    var auth = firebase.auth();
    var profileRef = db.collection('users').doc(firebase.auth().currentUser.uid);
    //console.log(uid);
    loadProfile();
    // ...
  } else {
    // User is signed out
    // ...
    location.href = "index.html";
  }
});
//ui elements
const addrChangeBtn = document.getElementById("addr-change");
const phNumberChangeBtn = document.getElementById("phone-change");
const emailChangeBtn = document.getElementById("email-change");

var user_firestore_data;

/*----------------------------------------------------------------------------*/
//It will run on startup
try{

  //listeners
  addrChangeBtn.addEventListener("click", changeAddr );
  phNumberChangeBtn.addEventListener("click", changePhNo );
  emailChangeBtn.addEventListener("click", changeEmail );
}
catch(err){
  console.log(err.message);
  //and open error window telling user about error, Try to log error on rtdb
};
/*----------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------*/
//to initialize the page

/*----------------------------------------------------------------------------*/
//to load profile on startup or, refresh anytime in between
async function loadProfile() {
    profileRef.get().then((doc) => {
        let profileData = doc.data();
        user_firestore_data = profileData;
        document.getElementById("navFirstName").innerHTML = profileData.firstName;
        document.getElementById("fullName").innerHTML = profileData.firstName + " " + profileData.lastName;
        document.getElementById("semester").innerHTML = profileData.semester;
        document.getElementById("emailId").innerHTML = profileData.emailId;
        document.getElementById("contactEmailId").innerHTML = profileData.contactEmailId;
        document.getElementById("mobileNumber").innerHTML = profileData.mobileNumber;
        document.getElementById("address").innerHTML = "<td>" + profileData.address.line1 + "<br>" + "</td>";
        document.getElementById("studentUID").innerHTML = profileData.studentUID;
        document.getElementById("profilePictureNav").src = profileData.profilePicture;
        document.getElementById("profilePictureLarge").src = profileData.profilePicture;
    }).catch((err) => {
        console.log(err);
        //and open error window telling user about error, Try to log error on rtdb
    })
}
/*----------------------------------------------------------------------------*/


/*----------------------------------------------------------------------------*/
//change email function
async function changeEmail() {
  try{
    user_firestore_data.emailId = document.getElementById("nmail").value;
    profileRef.set(user_firestore_data).then(()=>{
      document.getElementById("emailClose").click();
    });
  }
  catch(err){
    console.log(err.message);
    //and open error window telling user about error, Try to log error on rtdb
  }
}
/*----------------------------------------------------------------------------*/


/*----------------------------------------------------------------------------*/
//change phoneNumber function
async function changePhNo() {
  try{
    user_firestore_data.mobileNumber = document.getElementById("nphone").value;
    profileRef.set(user_firestore_data).then(()=>{
      document.getElementById("phNoClose").click();
    });
  }
  catch(err){
    console.log(err.message);
    //and open error window telling user about error, Try to log error on rtdb
  }
}
/*----------------------------------------------------------------------------*/


/*----------------------------------------------------------------------------*/
async function changeAddr() {
  try{
    user_firestore_data.address.line1 = document.getElementById("naddrL1").value;
    user_firestore_data.address.line2 = document.getElementById("naddrL2").value;
    user_firestore_data.address.district = document.getElementById("naddrDistrict").value;
    user_firestore_data.address.pincode = document.getElementById("naddrPin").value;
    user_firestore_data.address.city = document.getElementById("naddrCity").value;
    profileRef.set(user_firestore_data).then(()=>{
      document.getElementById("addrClose").click();
    });
  }
  catch(err){
    console.log(err.message);
    //and open error window telling user about error, Try to log error on rtdb
  }
}
/*----------------------------------------------------------------------------*/


/* __________________________________________________________________________ */
/* __________________________________________________________________________ */
