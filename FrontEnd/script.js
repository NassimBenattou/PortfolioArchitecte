window.onload = function(){

    localStorage.setItem('id', 0);

    var loginButton = document.getElementById('login');
    var token = sessionStorage.getItem("token");
    
    loginButton.onclick = function(){

        sessionStorage.clear();
    }

    if(sessionStorage.getItem('token')){

        loginButton.textContent = "logout";

        var filterCategories = document.getElementsByClassName("gallery")[0];
        var title = document.getElementById("title");
        var pp = document.getElementsByTagName("figure")[0];

        pp.innerHTML += '<div class="edit2"><i class="fa-regular fa-pen-to-square"></i><p>modifier</p></div>';    
        title.insertAdjacentHTML('afterend', '<i class="fa-regular fa-pen-to-square"></i><p id="buttonEdit">modifier</p>');
    }

    fetch("http://localhost:5678/api/categories")
    .then(response => response.json())
    .then((categories) => {

        var gallery =  document.getElementsByClassName("gallery")[0];
        var dataApi = document.createElement("div");
        dataApi.className = "categories";
        gallery.appendChild(dataApi);
        
        var category = document.createElement('div');
        category.innerText = "Tous";
        category.id = 0;
        category.className = "category";
        category.setAttribute("onclick","AllContent()");
        category.onclick = function() {AllContent();};
        
        var domCategories =  document.getElementsByClassName("categories")[0];
        domCategories.appendChild(category);
        
        categories.map((values) => {
            
            var categoryValues = document.createElement('div');
            categoryValues.innerText = values.name;
            categoryValues.id = values.id;
            categoryValues.className = "category";
            categoryValues.setAttribute("onclick","sortById(event)");
            categoryValues.onclick = function() {sortById(event);};
            domCategories.appendChild(categoryValues);
        });
    });
    
    fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then((work) => {
        
        var gallery =  document.getElementsByClassName("gallery")[0];
        var project = document.createElement('div');
        project.className = "project";
        gallery.appendChild(project);

        work.map((values) => {

            if(localStorage.getItem('id') == 0){

                var figure = document.createElement('figure');
                    figure.id = values.categoryId;
                    figure.className = "figure";
                
                var img = document.createElement('img');
                img.src = values.imageUrl;
                img.id = "img";
                figure.appendChild(img);
                
                var figcaption = document.createElement('figcaption');
                figcaption.innerText = values.title;
                figure.appendChild(figcaption);
                
                project.appendChild(figure);
            }
        });
    });    

    
    function AllContent(){

        var project = document.getElementsByClassName("project")[0];
        localStorage.setItem('id', 0);
        project.innerHTML = '';

        fetch("http://localhost:5678/api/works")
        .then(response => response.json())
        .then((work) => {

            work.map((values) => {

                var newFigure = document.createElement("figure");
                    newFigure.id = values.categoryId;

                var newImg = document.createElement("img");
                    newImg.src = values.imageUrl;
                    newImg.id = "img";

                var newFigcaption = document.createElement("figcaption");
                    newFigcaption.innerText = values.title;

                newFigure.appendChild(newImg);
                newFigure.appendChild(newFigcaption);
                project.appendChild(newFigure);
            });
        });    
    }

    function sortById(event){

        var project = document.getElementsByClassName("project")[0];
        var id = event.target.id;
        
        project.innerHTML = '';

        localStorage.setItem('id', id);

        fetch("http://localhost:5678/api/works")
        .then(response => response.json())
        .then((work) => {
    
            var find = work.filter(element => element.categoryId == localStorage.getItem("id"));

            find.map((values) => {
                
                var newFigure = document.createElement("figure");
                    newFigure.id = values.categoryId;

                var newImg = document.createElement("img");
                    newImg.src = values.imageUrl;
                    newImg.id = "img";

                var newFigcaption = document.createElement("figcaption");
                    newFigcaption.innerText = values.title;

                newFigure.appendChild(newImg);
                newFigure.appendChild(newFigcaption);
                project.appendChild(newFigure);
            });
        });  
    }

    //////////////////////////
            /*MODAL*/ 
    /////////////////////////
            
    var modal = document.getElementById("modal");
    var btn = document.getElementById("buttonEdit");
    var span = document.getElementsByClassName("close")[0];

    btn.onclick = function() {
        modal.style.display = "block";
    }

    span.onclick = function() {
        modal.style.display = "none";
    }
    
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    var imagesEdit = document.getElementsByClassName("images")[0];
    
    fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then((work) => {
        
        work.map((values) => {

            var newFigure = document.createElement("figure");
                newFigure.id = values.categoryId;
                newFigure.className = "figure-modal";
                
            var newImg = document.createElement("img");
                newImg.src = values.imageUrl;
                newImg.className = "img-modal";

                var newIcon1 = document.createElement("span");
                newIcon1.className = "icon1 fa-solid fa-arrows-up-down-left-right fa-lg";

            var newIcon2 = document.createElement("span");
                newIcon2.className = "icon2 fa-solid fa-trash-can fa-lg";
                newIcon2.id = values.id;
            
            var newFigcaption = document.createElement("figcaption");
            newFigcaption.innerText = "éditer";
            
            newFigure.appendChild(newImg);
            newFigure.appendChild(newIcon1);
            newFigure.appendChild(newIcon2);
            newFigure.appendChild(newFigcaption);
            imagesEdit.appendChild(newFigure);
        });

        var deleted = document.getElementsByClassName("icon2");
        
        for(i = 0; i < deleted.length; i++){

            deleted[i].onclick = function(e){
        
                e.preventDefault();
        
                console.log(token);

                e.target.parentElement.innerHTML = "";

                fetch("http://localhost:5678/api/works/"+ e.target.id, {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type' : 'application/json',
                        'Authorization': 'Bearer '+ token
                    },
                })
                .then(response => console.log(response.json()))
            }
        }

    });     
}