const xhr = new XMLHttpRequest();
xhr.onload= function(){
    if(xhr.status==204){
        window.location.href="home.html"
    }
}
function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
 
    xhr.open('POST', '/login');
    xhr.setRequestHeader('Content-Type', 'application/json');
    
    xhr.send(JSON.stringify({token: id_token}));
}


function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
    console.log('User signed out.');
    });
}