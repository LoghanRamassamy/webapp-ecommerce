
let urlServer = "http://localhost:18080";//"http://78.192.12.79:18080";
let urlArticle = urlServer + "/article";
let urlUser = urlServer + "/user";
let urlImg = urlServer + "/upload";

$(function(){
    let isConnected = localStorage['connected'];
    let isEmail = localStorage['email'];
    let isAdmin = localStorage['admin'];

    initArticleJson();
    initTableUserJson();
    initTableArticleJson();

    $('#userName').val(localStorage['email']);

    //

    if (isConnected) {
        $('#connexionInscription').hide(); //.show();
        $('#monCompte').show();
        $('#deconnexion').show();
        $('#favoris').show();
    } else {
        $('#connexionInscription').show();
        $('#monCompte').hide();
        $('#deconnexion').hide();
        $('#favoris').hide();
    }

    //


    $('#searchh').on('change', function () {
        recherche();
    });

    $('#connexion').on('click', function () {
        console.log("Je lance la function");
        //var loginData = $("#userSignup").serialize();
        //getToken('user@mail.com', 'password');
        let email = $("#email").val(),
            password = $("#password").val();

        console.log(">" + email);
        console.log(">" + password);

        if (email && password){
            console.log("A var is not empty");
            //alert();
            checkLoginPwd(email, password);
            //getToken(email, password);
        }else{
            console.log("A var is  empty");
        }

        console.log("J'ai terminé la function");
    });

    //

    $('#deconnexion').on('click', function () {
        console.log("Je lance la function");
        goDeconnexion();
        console.log("J'ai terminé la function");
    });

    //

    $('#btnAddUser').on('click', function () {
        console.log("Click btn add user");
        //console.log($("#articleName").val(), $("#articleDescription").val(), $("#articlePrice").val());

        let email = $('#email').val(),
            pseudo = $('#pseudo').val(),
            password = $('#password').val();

        console.log(">" + email);
        console.log(">" + pseudo);
        console.log(">" + password);

        if (email && pseudo && password){
            console.log("A var is not empty");
            addUser(email, password);
        }else{
            console.log("A var is  empty");
        }
        console.log("End click btn add user");

        document.location.href="index.html";
    });

    //

    $('#btnAddDeal').on('click', function () {
        console.log("Click btn add deal");
        //console.log($("#articleName").val(), $("#articleDescription").val(), $("#articlePrice").val());


        let libelle = $('#libelle').val(),
            description = $('#description').val(),
            price = $('#price').val();

        console.log(">" + libelle);
        console.log(">" + description);
        console.log(">" + price);

        if (libelle && description && price){
            console.log("A var is not empty");
            addArticle(libelle, description, parseFloat(price));
        }else{
            console.log("A var is  empty");
        }
        console.log("End click btn add deal");

        document.location.href="index.html";
    });

    //



    function addArticle(articleName, description, price) {
        //$.support.cors = true;
        $.ajax(
            {
                contentType: 'application/json',
                type: 'post',
                dataType: 'json',
                data: JSON.stringify ({name : articleName, img : 0, description : description, price : price}),
                url: urlArticle,
                error: (xhr, status, error) => {
                    alert("Nous somme navrez mais l'ajout de votre article a échoué... Veuillez réessayer s'il vous plaît");
                    document.location.href="addDeal.html";
                    console.log("Error request : Add Deal");/* var errorMessage = xhr.responseJSON.message */ }

            }).done((json) => {
                alert("Votre article a bien été ajouté !");
                document.location.href="addDeal.html";
                console.log("Success request : Add Deal");/*S'exécute en cas de succès de la requête*/
            });
    }

    function addUser(userEmail, userPassword) {
        $.ajax(
            {
                contentType: 'application/json',
                type: 'post',
                dataType: 'json',
                data: JSON.stringify ({email : userEmail, img : 0, isAdmin : false}),
                url: urlUser,
                error: (xhr, status, error) => {
                    alert("Nous somme navrez mais la création de votre compte a échoué... Veuillez réessayer s'il vous plaît");
                    document.location.href="inscription.html";
                    console.log("Error request : Add User");/* var errorMessage = xhr.responseJSON.message */ }

            }).done((json) => {
                alert("Votre compte a bien été créé !");
                document.location.href="connexion.html";
                console.log("Success request : Add User");/*S'exécute en cas de succès de la requête*/ });
    }

    function isValidPassword() {
        let firstInput = $('#inputPasswordSignUp');
        let secondInput = $('#inputConfirmPasswordSignUp');
        let feedback = $('#passwordFeeback');

        firstInput.removeClass('is-invalid');
        secondInput.removeClass('is-invalid');
        firstInput.removeClass('is-valid');
        secondInput.removeClass('is-valid');

        if(firstInput.val() !== '' || secondInput.val() !== ''){
            if(firstInput.val() === secondInput.val())
            {
                firstInput.addClass('is-valid');
                secondInput.addClass('is-valid');
                feedback.visibility = 'hidden';
                return true;
            }
            else
            {
                firstInput.addClass('form-control is-invalid');
                secondInput.addClass('form-control is-invalid');
                feedback.show();
            }
        }
        return false;
    }

    function initArticleJson(){
        $.ajax(
            {
                contentType: 'application/json',
                type: 'get',
                dataType: 'json',
                url: urlArticle,
                error: (xhr, status, error) => { console.log("Error request : initArticleJson");/* var errorMessage = xhr.responseJSON.message */ }
            }).done((data /*json*/) => {
                console.log("Success request : initArticleJson");/*S'exécute en cas de succès de la requête*/
                if (data.length > 0) {
                    $.each(data, function (key, val) {
                        $("<div/>", { class: "col-md-3 col-xs-6", html: articleHTML(val.id, val.name, val.created, val.updated, val.description, val.price)}).appendTo('#listDeal');
                    });
                }
            });
    }

    function initTableUserJson(){
        $.ajax(
            {
                contentType: 'application/json',
                type: 'get',
                dataType: 'json',
                url: urlUser,
                error: (xhr, status, error) => { console.log("Error request : initTableUserJson");/* var errorMessage = xhr.responseJSON.message */ }
            }).done((data /*json*/) => {
            console.log("Success request : initTableUserJson");/*S'exécute en cas de succès de la requête*/
            if (data.length > 0) {
                $.each(data, function (key, val) {
                    $( "<tr/>", { html: lineOfUserTableHTML(val.id, val.mail, val.inscription, val.img, val.admin) } ).appendTo( '#userTable' );
                });
            }
        });
    }

    function initTableArticleJson(){
        $.ajax(
            {
                contentType: 'application/json',
                type: 'get',
                dataType: 'json',
                url: urlArticle,
                error: (xhr, status, error) => {
                    console.log("Error request : initTableUserJson");/* var errorMessage = xhr.responseJSON.message */ }
            }).done((data /*json*/) => {
            console.log("Success request : initTableUserJson");/*S'exécute en cas de succès de la requête*/
            if (data.length > 0) {
                $.each(data, function (key, val) {
                    $( "<tr/>", { html: lineOfDealTableHTML(val.id, val.name, val.created, val.updated, val.description, val.price) } ).appendTo( '#dealTable' );
                });
            }
        });
    }

    function articleHTML (id, name, created, updated, description, price){
        if(name === null) name = "Item inconnu";
        if(created === null) created = "01/01/2000";
        if(updated === null) updated = "01/01/2000";
        if(description === null) description = "No description...";
        if(price === null) price = "24.99";

        let brefDescription = description.length > 70 ? cutStringBeginingToIndex(description, 80) : description;

        return(
            "<!-- product -->" +
            "<div class='product'>" +
            "<div class='product-img'>" +
            "<img src='vendor/img/product" + id + ".png'>" +
            "</div>" +
            "<div class='product-body'>" +
            "<h3 class='product-name'><a href='#' data-toggle='modal' data-target='#DealModal" + id + "'>" + name + "</a></h3>" +
            "<h4 class='product-price'>" + price + "€</h4>" +
            "<p class='product-category'>" + created + "</p>" +
            "<div class='product-rating'>" +
            "<i class='fas fa-star'></i>" +
            "<i class='fas fa-star'></i>" +
            "<i class='fas fa-star'></i>" +
            "<i class='fas fa-star-half-alt'></i>" +
            "<i class='far fa-star'></i>" +
            "</div>" +
            "<div class='product-btns'>" +
            "<button><i class='far fa-thumbs-up'></i></i><span class='tooltipp'>J'aime</span></button>" +
            "<button class='add-to-wishlist'><i class='far fa-heart'></i><span class='tooltipp'>Ajouter aux favoris</span></button>" +
            "<button class='quick-view' data-toggle='modal' data-target='#DealModal" + id + "'><i class='far fa-eye'></i><span class='tooltipp'>Aperçus</span></button>" +
            "<button><i class='far fa-thumbs-down'></i><span class='tooltipp'>J'aime pas</span></button>" +
            "</div>" +
            "</div>" +
            "<div class='add-to-cart'>" +
            "<a target='_blank' href='http://www.google.fr'><button class='add-to-cart-btn' ><i class='fa fa-shopping-cart'></i> Aller vers le deal</button></a>" +
            "</div>" +
            "</div>" +
            "<!-- /product -->" +
            articleHTMLmodal(id, name, created, updated, description, price)
        );
    }

    function articleHTMLmodal(id, name, created, updated, description, price){
        return (
            "<!-- Deal Modal -->" +
            "<div class='modal fade' id='DealModal" + id + "' tabindex='-1' role='dialog' aria-labelledby='DealModalLabel' aria-hidden='true'>" +
            "<div class='modal-dialog modal-dialog-centered modal-lg' role='document'>" +
            "<div class='modal-content'>" +
            "<div class='modal-header'>" +
            "<h5 class='modal-title textBold' id='DealModalLabel'>" + name + "</h5>" +
            "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>" +
            "</button>" +
            "</div>" +
            "<div class='modal-body'>" +
            "<div class='row'>" +
            "<div class='col-lg-4'>" +
            "<a href='#'><img src='vendor/img/product" + id + ".png'></a>" +
            "<div class='product-rating'>" +
            "<i class='fa fa-star'></i>" +
            "<i class='fa fa-star'></i>" +
            "<i class='fa fa-star'></i>" +
            "<i class='fa fa-star'></i>" +
            "<i class='fa fa-star-o'></i>" +
            "</div>" +
            "<small class='text-muted alignRight'>" + updated + "</small>" +
            "</div>" +
            "<div class='col-lg-8'>" +
            "<h5><a target='_blank' href='http://www.google.fr'>" + name + "</a></h5>" +
            "<h5>" + price + "€</h5>" +
            "<p class='card-text'>" + description + "</p>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "<div class='modal-footer'>" +
            "<button type='button' class='btn btn-secondary' data-dismiss='modal'>Cancel</button>" +
            "<a target='_blank' href='http://www.google.fr' id='goToDeal'>" +
            "<button type='button' class='btn btn-primary'>Go Deal !</button>" +
            "</a>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>");
    }

    function cutStringBeginingToIndex(myString, myIndex){
        let blankPos = myString.indexOf(' ', myIndex);
        myString = myString.substring(0, blankPos-1) + "(...)";
        return myString;
    }

    function lineOfUserTableHTML (id, mail, inscription, img, admin){
        if(mail === null) mail = "User name";
        if(inscription === null) inscription = "01/01/2000";
        if(admin === null) admin = "false";
        if(img === null) img = "./img/img01.";

        return(
            "<th scope='row'>" + id + "</th>"+
            "<td>" + mail + "</td>"+
            "<td>" + inscription + "</td>"+
            "<td>./vendor/img/user" + id + ".png</td>"+
            "<td>" + admin + "</td>"+
            "<td>" +
            " <span class='fas fa-user-minus cursorAsPointer' onclick='deleteOnTable(" + id + ", \"user\" );'> </span>" +
            " <span class='fas fa-edit cursorAsPointer' onclick='goToUpdateOnTable(" + id + ", \"user\");'> </span>" +
            "</td>");
    }

    function lineOfDealTableHTML (id, name, created, updated, description, price){
        if(name === null) name = "Item inconnu";
        if(created === null) created = "01/01/2000";
        if(updated === null) updated = "01/01/2000";
        if(description === null) description = "No description...";
        if(price === null) price = "24.99";

        let brefDescription = description.length > 70 ? cutStringBeginingToIndex(description, 80) : description;

        return(
            "<th scope='row'>" + id + "</th>"+
            "<td>" + name + "</td>"+
            "<td>" + created + "</td>"+
            "<td>" + updated + "</td>"+
            "<td>" + brefDescription + "</td>"+
            "<td>" + price + "</td>"+
            "<td>./vendor/img/product" + id + ".png</td>"+
            "<td>" +
            " <i class='fas fa-trash-alt cursorAsPointer' onclick='deleteOnTable(" + id + ", \"article\");'> </i>" +
            " <i class='fas fa-edit cursorAsPointer' onclick='goToUpdateOnTable(" + id + ", \"article\");'> </i>" +
            "</td>");
    }

    //AUTH
    /*
     * Create form to request access token from Google's OAuth 2.0 server.
     */

    function oauthSignIn() {
        // Google's OAuth 2.0 endpoint for requesting an access token
        let oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

        // Create <form> element to submit parameters to OAuth 2.0 endpoint.
        let form = document.createElement('form');
        form.setAttribute('method', 'GET'); // Send as a GET request.
        form.setAttribute('action', oauth2Endpoint);

        // Parameters to pass to OAuth 2.0 endpoint.
        let params = {'client_id': 'YOUR_CLIENT_ID',
            'redirect_uri': 'YOUR_REDIRECT_URI',
            'response_type': 'token',
            'scope': 'https://www.googleapis.com/auth/drive.metadata.readonly',
            'include_granted_scopes': 'true',
            'state': 'pass-through value'};



        // Add form parameters as hidden input values.
        for (let p in params) {
            let input = document.createElement('input');
            input.setAttribute('type', 'hidden');
            input.setAttribute('name', p);
            input.setAttribute('value', params[p]);
            form.appendChild(input);
        }

        // Add form to page and submit it to open the OAuth 2.0 endpoint.
        document.body.appendChild(form);
        form.submit();
    }

    function checkLoginPwd (mail, pwd){
        alert("Connexion en cour...");
        $.ajax({
            contentType: 'application/json',
            type: 'get',
            dataType: 'json',
            url: urlUser,
            error: (xhr, status, error) => {
                console.log("Error request : checkLoginPwd");/* var errorMessage = xhr.responseJSON.message */ }
        }).done((data /*json*/) => {
            console.log("Success request : checkLoginPwd");/*S'exécute en cas de succès de la requête*/
            if (data.length > 0) {
                $.each(data, function (key, val) {
                    console.log(">" + val.id);
                    console.log("->" + val.mail);
                    console.log("->" + mail);
                    console.log(">" + val.inscription);
                    console.log(">" + val.img);
                    console.log(">" + val.admin);
                    if(mail.toUpperCase().trim() == (val.mail).toUpperCase().trim()) {
                        if (!isConnected) {
                            localStorage['connected'] = val.id;
                            localStorage['email'] = val.mail;
                            localStorage['admin'] = val.admin;
                        }
                        alert("Connexion réussi !!");
                        document.location.href="index.html";
                        //return true;
                        //getToken(val.id, val.mail, val.password); //Ca fonctionne mais le serveur n'est pas en mesure d'ajouter le contenue dans la base de donné
                    }
                });
            }
        });
    }

    function goDeconnexion(){
        if (isConnected) localStorage.clear();
        alert("Déconnexion...");
        document.location.href="index.html";
    }

    function getToken(id, mail, pwd){
    //var signin = function() {

        let tokenUrl = urlServer + "oauth2/token";

        let params = {"grant_type":"password",
            "client_id":id,
            "username":mail,
            "password":pwd,
            "secret":"secret_",
            "scope":"nimportequoi"
        };

        $.post(tokenUrl, params).then(doneCallbacksTest, failCallbacksTest);
        //window.localStorage.setItem('theToken', $.post(tokenUrl, params).then(doneCallbacksTest, failCallbacksTest));
        //var signin = $.post(tokenUrl, params).then(doneCallbacksTest, failCallbacksTest);
        //console.log(signin);
        /*
        $.post(tokenUrl, params)
            .done(function( data ) {
                console.log( "Data Loaded: " + data );
            });
        */

        //console.log(signin);

    }
    function doneCallbacksTest(){
        console.log("Token is generate !");
        //console.log(window.localStorage);
        //console.log(window.localStorage.getItem('theToken'));

        let url = "http://localhost:8888/user/1"
        $.support.cors = true;
        $.getJSON(
            url,
            function(data){
                console.log(data.id + data.mail + data.password + data.psw_hash + data.inscription + data.admin);
                /*if (data.length > 1) {
                    $.each(data, function (key, val) {
                        console.log(val.id + val.mail + val.password + val.psw_hash + val.inscription + val.admin);
                    });
                }*/
            }
        );
    }
    function failCallbacksTest(){
        console.log("FAIL !");
        //console.log(window.localStorage.getItem('theToken'));
    }


//window.localStorage.setItem(key, value);
//window.localStorage.getItem(key);


    /*
    var params = {"grant_type":"password",
            "client_id":"acme1",
            "username":aMail,
            "password":aPassword,
            "secret":"secret_",
            "scope":"nimportequoi"};
     */

});

function deleteOnTable(id, tableName){
    let result = confirm("Confirmez-vous la suppression ?");
    if (result) {
        $.ajax({
                type: 'delete',
                url: urlServer + "/" + tableName + "/" + id,
                error: (xhr, status, error) => { console.log("Error request : deleteOnTable"); /* var errorMessage = xhr.responseJSON.message */ }
            }).done((json) => {
            console.log("Success request : deleteOnTable");
            /*S'exécute en cas de succès de la requête*/
            location.reload();
        });
    }
}

function deleteAccount(tableName){
    let result = confirm("Attention votre compte ainsi que vos informations vont être supprimmer, êtes-vous sûr ? ");
    if (result) {
        $.ajax({
            type: 'delete',
            url: urlServer + "/" + tableName + "/" + localStorage['connected'],
            error: (xhr, status, error) => {
                console.log("Error request : deleteOnTable"); /* var errorMessage = xhr.responseJSON.message */ }
        }).done((json) => {
            console.log("Success request : deleteOnTable");
            /*S'exécute en cas de succès de la requête*/
            localStorage.clear();
            document.location.href="index.html";
        });
    }
}

function goToUpdateOnTable(id, tableName){
    let result = confirm("Confirmez-vous la modification ?");
    if (result) {
        $.ajax({
            type: 'update',
            url: urlServer + "/" + tableName + "/" + id,
            data: JSON.stringify ({name : articleName, img : 0, description : description, price : price}),
            error: (xhr, status, error) => { console.log("Error request : updateOnTable"); /* var errorMessage = xhr.responseJSON.message */ }
        }).done((json) => {
            console.log("Success request : updateOnTable");
            /*S'exécute en cas de succès de la requête*/
            location.reload();
        });
    }
}

function updateOnTable(id, tableName){
    let result = confirm("Confirmez-vous la modification ?");
    if (result) {
        $.ajax({
                type: 'update',
                url: urlServer + "/" + tableName + "/" + id,
                data: JSON.stringify ({name : articleName, img : 0, description : description, price : price}),
                error: (xhr, status, error) => { console.log("Error request : updateOnTable"); /* var errorMessage = xhr.responseJSON.message */ }
            }).done((json) => {
            console.log("Success request : updateOnTable");
            /*S'exécute en cas de succès de la requête*/
            location.reload();
        });
    }
}

function recherche(){
    let searchValue = $('#searchh').val();
    let articleName = $('.product-name > a');
    let divArticle = $('.product');
    for(let i = 0; i < divArticle.length; i++){
        if ($(articleName[i]).text().toUpperCase() != null && $(articleName[i]).text().toUpperCase() != ""  && $(articleName[i]).text().toUpperCase().indexOf(searchValue.toUpperCase()) > -1)
            $(divArticle[i]).parent().show();
        else
            $(divArticle[i]).parent().hide();
    }

}