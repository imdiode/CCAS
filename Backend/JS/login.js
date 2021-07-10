function red() {
    username = document.getElementById('uname').value;
    password = document.getElementById('passw').value;
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then((userCredentials) => {
        //location.href = "Dashboard.html";
        return firebase.auth().signInWithEmailAndPassword(username, password)
                .then((userCredentials) => {
                  location.href = "Dashboard.html";
                });
      })
      .catch((error) => {
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
    }).catch((err)=>{
      console.log(err);
    });
}
