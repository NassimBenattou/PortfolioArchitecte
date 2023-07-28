window.onload = function(){

    var logs = document.getElementsByTagName("form")[0];

    if(sessionStorage.getItem('token')){

        var loginButton = document.getElementById('login');
        loginButton.textContent = "logout";

        loginButton.onclick = function(){

            sessionStorage.clear();
        }

        window.location.href = "index.html";
    }

    logs.onsubmit = function(e){

        e.preventDefault();

        var email = e.target[0].value;
        var password = e.target[1].value;

        fetch('http://localhost:5678/api/users/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({ email, password})
        })
        .then(response => response.json())
        .then((access) => {
            
            sessionStorage.setItem('token', access.token);

            if(sessionStorage.getItem('token') == access.token){

                var loginButton = document.getElementById('login');
                loginButton.textContent = "logout";

                loginButton.onclick = function(){

                    sessionStorage.clear();
                }

                window.location.href = "index.html";
            }
            else{
                alert("Mail ou mot de passe incorrect !");
                sessionStorage.clear();
            }
        })
        .catch((error) => console.log(error) );
    }
}