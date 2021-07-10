document.getElementById('passw').addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementsByClassName("login-btn").click();
  }
});

function red() {
    username = document.getElementById('uname').value;
    password = document.getElementById('passw').value;
    firebase.auth().signInWithEmailAndPassword(username, password).then((userCredentials) => {
        location.href = "Dashboard.html";
    }).catch((error) => {
        var errorCode = error.code;
        console.log(errorCode);

        if (errorCode == "auth/wrong-password") {
            document.getElementById('ErrorSin').innerHTML = "Incorrect Password!";
        } else if (errorCode == "auth/user-not-found") {
            document.getElementById('ErrorSin').innerHTML = "Incorrect Email!";
        } else if (errorCode != null) {
            document.getElementById('ErrorSin').innerHTML = "Something went wrong!";
        }

    });
}

function rec() {
    username = document.getElementById('uname').value;

    firebase.auth().sendPasswordResetEmail(username).then(function() {
        document.getElementById('ErrorSin').innerHTML = "Email sent!"
        document.getElementById('ErrorSin').style.backgroundColor = "rgb(235, 255, 234)";
        document.getElementById('ErrorSin').style.color = "#3cff35"
    });
}
