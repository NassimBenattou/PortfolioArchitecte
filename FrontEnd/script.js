window.onload = function(){

    localStorage.setItem('id', 0);

    var loginButton = document.getElementById('login');
    var token = sessionStorage.getItem("token");
    
    loginButton.onclick = function(){
        
        sessionStorage.clear();
    }
    
    if(sessionStorage.getItem('token')){

        var title = document.getElementById("title");
        var pp = document.getElementsByTagName("figure")[0];
        var publish = document.getElementsByClassName("publish")[0];
    
        publish.style.display = "block";
        loginButton.textContent = "logout";

        pp.innerHTML += '<div class="edit2"><i class="fa-regular fa-pen-to-square"></i><p>modifier</p></div>';    
        title.insertAdjacentHTML('afterend', '<i class="fa-regular fa-pen-to-square"></i><p id="buttonEdit">modifier</p>');
    }


    //////////// AFFICHAGE ONGLETS CATEGORIES ////////////////

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
            
            var selectValues = document.getElementsByTagName("select")[0];
            var optionValue = document.createElement("option");
                optionValue.innerText = values.name;
                optionValue.value = values.id;

            selectValues.appendChild(optionValue);            
        });

        if(sessionStorage.getItem('token')){
            
            domCategories.style.display = "none";
        }
    });
    
    /////////// GET API /////////////////

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
                    img.className = values.id;
                    figure.appendChild(img);
                
                var figcaption = document.createElement('figcaption');
                figcaption.innerText = values.title;
                figure.appendChild(figcaption);
                
                project.appendChild(figure);
            }
        });
    });    

    ///////// TOUS LES PROJETS ///////////

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

    /////////// TRI CATEGORIES /////////////////

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

    ///////////// MODAL ////////////////
            
    var modal = document.getElementById("modal");
    var modalcontent = document.getElementsByClassName("list-project")[0];
    var addProject = document.getElementsByClassName("add-project")[0];
    var addPicture = document.getElementById("add");
    var btn = document.getElementById("buttonEdit");
    var span = document.getElementsByClassName("close");
    var back = document.getElementsByClassName("back")[0];

    btn.onclick = function() {

        modal.style.display = "block";
        modalcontent.style.display = "block";
    }
    
    addPicture.onclick = function(){

        addProject.style.display = "block";
        modalcontent.style.display = "none";
    }   

    for(i = 0; i < span.length; i++){

        span[i].onclick = function() {
    
            modal.style.display = "none";
            addProject.style.display = "none";
        }
    }

    back.onclick = function(){

        addProject.style.display = "none";
        modalcontent.style.display = "block";
    }

    
    window.onclick = function(event) {

        if (event.target == modal) {
            modal.style.display = "none";
            addProject.style.display = "none";
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
                newImg.id = values.id;

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

    ///////////// DELETE /////////////////

        function clickDelete(){

            var deleted = document.getElementsByClassName("icon2");
            
            for(i = 0; i < deleted.length; i++){
                
                deleted[i].onclick = function(e){
                    
                    e.preventDefault();
    
                    var listProject = document.getElementsByClassName(e.target.id)[0];
            
                    e.target.parentElement.innerHTML = "";
                    listProject.parentElement.innerHTML = "";
    
                    fetch("http://localhost:5678/api/works/"+ e.target.id, {
                        method: 'DELETE',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type' : 'application/json',
                            'Authorization': 'Bearer '+ token
                        },
                    })
                    .then(response => response.json())
                    .catch((error) => error );
                }
            }
        }
        
        clickDelete();
    });

    /////////// APERCU UPLOAD IMAGE /////////////////
    
    const projectForm = document.getElementsByClassName("project-form")[0];
    const hideDivUpload = document.getElementsByClassName("content-pic")[0];
    const renderImg = document.createElement("img");
    var file = document.getElementById("files");
    var validForm = document.getElementById("valid");

    validForm.style.cursor = "not-allowed";
    
    file.addEventListener('change', previewFile);
    
    function previewFile(){
        
        if(this.files[0].name){
    
            for(i = 0; i < hideDivUpload.children.length; i++){

                hideDivUpload.children[i].style.display = "none";
            }
            
            renderImg.src = "assets/images/"+this.files[0].name;
            renderImg.className = "img-preview";
            hideDivUpload.appendChild(renderImg);
            validForm.style.backgroundColor = "#1D6154";
            validForm.style.cursor = "pointer";
        }
    }

    ////////// UPLOAD IMAGE /////////////////

    projectForm.onsubmit = function(e){
        
        e.preventDefault();
        
        var project =  document.getElementsByClassName("project")[0];
        var imageUrl = e.target[0].files[0];
        var title = e.target[1].value;
        var categoryId = e.target[2].value;
        var formData = new FormData();

        formData.append('title', title);
        formData.append('image', imageUrl);
        formData.append('category', categoryId);

        fetch('http://localhost:5678/api/works', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer '+ token
            },
            body: formData
        })
        .then(response => response.json())
        .then((callback) => {

            var imagesModal = document.getElementsByClassName("images")[0];

            var figure = document.createElement('figure');
                figure.id = callback.categoryId;
                figure.className = "figure";
                    
            var img = document.createElement('img');
                img.src = callback.imageUrl;
                img.id = "img";
                img.className = callback.id;
                figure.appendChild(img);
            
            var figcaption = document.createElement('figcaption');
                figcaption.innerText = callback.title;
                figure.appendChild(figcaption);
                
            var newFigure = document.createElement("figure");
                newFigure.id = callback.categoryId;
                newFigure.className = "figure-modal";
                
            var newImg = document.createElement("img");
                newImg.src = callback.imageUrl;
                newImg.className = "img-modal";
                newImg.id = callback.id;
                
            var newIcon1 = document.createElement("span");
                newIcon1.className = "icon1 fa-solid fa-arrows-up-down-left-right fa-lg";
            
            var newIcon2 = document.createElement("span");
                newIcon2.className = "icon2 fa-solid fa-trash-can fa-lg";
                newIcon2.id = callback.id;
            
            var newFigcaption = document.createElement("figcaption");
                newFigcaption.innerText = "éditer";
                
            project.appendChild(figure);
            newFigure.appendChild(newImg);
            newFigure.appendChild(newIcon1);
            newFigure.appendChild(newIcon2);
            newFigure.appendChild(newFigcaption);
            imagesModal.appendChild(newFigure);

            var deleted = document.getElementsByClassName("icon2");
            
            for(i = 0; i < deleted.length; i++){
                
                deleted[i].onclick = function(e){
                    
                    e.preventDefault();
                    
                    var listProject2 = document.getElementsByClassName(e.target.id)[0];
                    
                    fetch("http://localhost:5678/api/works/"+ e.target.id, {
                        method: 'DELETE',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type' : 'application/json',
                            'Authorization': 'Bearer '+ token
                        },
                    })
                    .then(response => response.json())
                    .catch((error) => error );
                    
                    e.target.parentElement.innerHTML = "";
                    listProject2.parentElement.innerHTML = "";
                }
            }
        });
    }
}