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

        console.log(e.target[0].value);
        console.log(e.target[1].value);

        var email = e.target[0].value;
        var password = e.target[1].value;
        
        console.log(JSON.stringify({ email, password}))

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

            if(sessionStorage.getItem('token')){

                var loginButton = document.getElementById('login');
                loginButton.textContent = "logout";

                loginButton.onclick = function(){

                    sessionStorage.clear();
                }

                window.location.href = "index.html";
            }
        })
    }
}