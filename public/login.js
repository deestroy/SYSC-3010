function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ran")
    
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/login');
    xhr.setRequestHeader('Content-Type', 'application/json');
    
    xhr.send(JSON.stringify({token: id_token}));
    }