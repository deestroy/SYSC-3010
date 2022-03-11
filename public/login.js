function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/login');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function(){
      if(xhr.responseText == 'success'){
        console.log("success");
        
      }
    }
    
    xhr.send(JSON.stringify({token: id_token}));
    }