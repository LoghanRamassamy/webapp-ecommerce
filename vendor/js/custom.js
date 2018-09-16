
let divArray = ['#deconnexion', '#connexionInscription', '#monCompte', '#favoris', '#favoris']; //Don't forget add DIV in custom.css
let urlServer = "http://localhost:18080";//"http://78.192.12.79:18080";
let urlArticle = urlServer + "/article";
let urlUser = urlServer + "/user";

$(function(){

    /*$('#inputConfirmPasswordSignUp').change(function() {
        var aBool = isValidatePassword();
    });*/

    initArticleJson();
    initTableUserJson();
    initTableArticleJson();


    $('#connexion').on('click', function () {
        showDiv(divArray, '#moncompte');
    });

    //getToken('user@mail.com', 'password');
    $('#loginButton').on('click', function () {
        console.log("Je lance la function");
        //var loginData = $("#userSignup").serialize();
        //getToken('user@mail.com', 'password');
        let theMail = $("#inputMail").val();
        let thePassword = $("#inputPassword").val();
        console.log(theMail + "    " + thePassword);
        checkLoginPwd(theMail, thePassword);
        //getToken(theMail, thePassword);
        console.log("J'ai terminé la function");
    });

    $('#btnAddDeal').on('click', function () {
        console.log("Click btn add deal");
        //console.log($("#articleName").val(), $("#articleDescription").val(), $("#articlePrice").val());


        let libelle = $("#libelle").val(),
            description = $("#description").val(),
            price = $("#price").val();

        console.log(">" + libelle);
        console.log(">" + description);
        console.log(">" + price);

        if (libelle || description || price){
            console.log("A var is not empty");
            addArticle(libelle, description, parseFloat(price));
        }else{
            console.log("A var is  empty");
        }
        console.log("End click btn add deal");
    });

    function addArticle(articleName, description, price) {
        //$.support.cors = true;
        $.ajax(
            {
                contentType: 'application/json',
                type: 'post',
                dataType: 'json',
                data: JSON.stringify ({name : articleName, img : 0, description : description, price : price}),
                url: urlArticle,
                error: (xhr, status, error) => { console.log("Error request : Add Deal");/* var errorMessage = xhr.responseJSON.message */ }

            }).done((json) => { console.log("Success request : Add Deal");/*S'exécute en cas de succès de la requête*/ });
    }
    //application/json
    //contentType: 'application/json',
    function showDiv(arrayOfDiv, idDiv) {
        for (let id in arrayOfDiv) {
            if (arrayOfDiv[id] === idDiv) { $(arrayOfDiv[id]).show(); }
            else { $(arrayOfDiv[id]).hide(); }
        }
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
        //$.support.cors = true;
        $.getJSON(
            urlArticle,
            function(data){
                if (data.length > 1) {
                    $.each(data, function (key, val) {
                        $( "<div/>", { class: "col-md-3 col-xs-6", html: articleHTML(val.id, val.name, val.created, val.updated, val.description, val.price) } ).appendTo( '#listDeal' );
                    });
                }
            }
        );
    }

    function initTableUserJson(){
        //$.support.cors = true;
        console.log("Initialiation users json table");
        $.getJSON(
            urlUser,
            function(data){
                if (data.length > 1) {
                    //console.log(data.length);
                    $.each(data, function (key, val) {
                        //console.log(val.mail);
                        $( "<tr/>", { html: lineOfUserTableHTML(val.id, val.mail, val.password, val.psw_hash, val.inscription, val.admin) } ).appendTo( '#userTable' );
                    });
                }
            }
        );
    }

    function initTableArticleJson(){
        //$.support.cors = true;
        console.log("Initialiation articles json table");
        $.getJSON(
            urlArticle,
            function(data){
                if (data.length > 1) {
                    $.each(data, function (key, val) {
                        $( "<tr/>", { html: lineOfDealTableHTML(val.id, val.name, val.created, val.updated, val.description, val.price) } ).appendTo( '#dealTable' );
                    });
                }
            }
        );
    }


    //{"id":1,"name":"LaveTout","created":null,"updated":null,"description":null,"price":null}

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
            "<img src='vendor/img/product01.png'>" +
            "</div>" +
            "<div class='product-body'>" +
            "<h3 class='product-name'><a href='www.google.fr'>product name goes here</a></h3>" +
            "<h4 class='product-price'>980.00€</h4>" +
            "<p class='product-category'>01/07/2018</p>" +
            "<div class='product-rating'>" +
            "<i class='fa fa-star'></i>" +
            "<i class='fa fa-star'></i>" +
            "<i class='fa fa-star'></i>" +
            "<i class='fa fa-star'></i>" +
            "<i class='fa fa-star-o'></i>" +
            "</div>" +
            "<div class='product-btns'>" +
            "<button><i class='fa fa-heart'></i><span class='tooltipp'>J'aime</span></button>" +
            "<button class='add-to-wishlist'><i class='fa fa-plus-square-o'></i><span class='tooltipp'>Ajouter aux favoris</span></button>" +
            "<button class='quick-view' data-toggle='modal' data-target='#offerModal'><i class='fa fa-eye'></i><span class='tooltipp'>Aperçus</span></button>" +
            "</div>" +
            "</div>" +
            "<div class='add-to-cart'>" +
            "<a target='_blank' href='http://www.google.fr'><button class='add-to-cart-btn' ><i class='fa fa-shopping-cart'></i> Aller vers le deal</button></a>" +
            "</div>" +
            "</div>" +
            "<!-- /product -->"



        );
            //articleHTMLmodal(id, name, created, updated, description, price));
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
            "<span aria-hidden='true'>&times;</span>" +
            "</button>" +
            "</div>" +
            "<div class='modal-body'>" +
            "<div class='row'>" +
            "<div class='col-lg-4'>" +
            "<a href='#'><img src='http://placehold.it/700x400' alt=''></a>" +
            "<small class='text-muted alignLeft'>&#9733; &#9733; &#9733; &#9733; &#9734;</small>" +
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



    function lineOfUserTableHTML (id, username, password, password_hash, inscription, admin){
        if(username === null) username = "User name";
        if(password === null) password = "010203";
        if(password_hash === null) password_hash = "false";
        if(inscription === null) inscription = "01/01/2000";
        if(admin === null) admin = "false";

        return(
            "<th scope='row'>" + id + "</th>"+
            "<td>" + username + "</td>"+
            "<td>" + password + "</td>"+
            "<td>" + password_hash + "</td>"+
            "<td>" + inscription + "</td>"+
            "<td>the/picture/url</td>"+
            "<td>" + admin + "</td>"+
            "<td><span class='cursorAsPointer fa fa-trash-o' onclick='deleteOnTable(" + id + ", \"user\" );'></span></td>");
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
            "<td>the/picture/url</td>"+
            "<td>" +
            "   <span class='cursorAsPointer fa fa-trash-o' onclick='deleteOnTable(" + id + ", \"article\");'> </span>" +
            "   <span class='cursorAsPointer fa fa-edit' onclick='updateOnTable(" + id + ", \"article\");'> </span>" +
            "</td>");
    }

});

function deleteOnTable(id, tableName){
    //$.support.cors = true;
    let result = confirm("Confirmez-vous la suppression ?");
    if (result) {
        $.ajax(
            {
                type: 'delete',
                url: urlServer + "/" + tableName + "/" + id,
                error: (xhr, status, error) => {
                    console.log("Error request : Delete Deal");
                    /* var errorMessage = xhr.responseJSON.message */
                }

            }).done((json) => {
            console.log("Success request : Delete Deal");
            /*S'exécute en cas de succès de la requête*/
            location.reload();
        });
    }
}
