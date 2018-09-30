$(function(){
    var userLang;
    //userLang = navigator.language || navigator.userLanguage; //Detect language browser

    localStorage['trad'] = "fr-FR";
    changeLng(localStorage['trad']);

    $('#selectLanguage').click(function() {
        if(localStorage['trad'] === "en-US"){
            $('#selectLanguage').text("English");
            localStorage['trad'] = "fr-FR";
            changeLng(localStorage['trad']);
        } else {
            $('#selectLanguage').text("Français");
            localStorage['trad'] = "en-US";
            changeLng(localStorage['trad']);
        }
    });
});

i18next.on('languageChanged', () => { updateContent(); }); //L'IDE mettra surement une erreur à cette ligne mais c'est bien la syntaxe de la lib.

i18next.init({
        debug: true,
        resources: //Json format
            {
                "en-US": {
                    "translation": {
                        "tradConnect": "Login",
                        "tradCancel": "Cancel",
                        "tradUserSetting": "Account setting",
                        "tradLogout": "Logout",
                        "tradAbout": "About",
                        "tradUsername": "Username",
                        "tradName": "Name",
                        "tradPassword": "Password",
                        "tradConfirmPassword": "Confirm password",
                        "tradConfirmPasswordError": "Password is not same.",
                        "tradBirth": "Date of birth",
                        "tradLogin": "Login to your account",
                        "tradCreateAccount": "Create to your account",
                        "tradRemember": "Remember me",
                        "tradRegister": "Register",
                        "tradFilter": "Filter",
                        "tradAvailable": "Available in store",
                        "tradFavorite": "Favorite",
                        "tradMoneyLogo": "$",
                        "tradPrice": "Price",
                        "tradAdditionDate": "Addition date",
                        "tradLike": "Like",
                        "tradDislike": "Dislike",
                        "tradAsc": "Ascending",
                        "tradDesc": "Descending",
                        "tradPartner": "Our partners",
                        "tradContact": "Contact us",
                        "tradOrder" : "Order by",
                        "tradSort" : "Sort by",
                        "tradAddOffer" : "Add offer",
                        "tradAdministration" : "Administration",
                        "tradAdd" : "Add",
                        "tradUpdate" : "Update",
                        "tradArticleName" : "Article name",
                        "tradTermsOfUse" : "By checking this box you accept the",
                        "tradGetPersoData" : "Get my personal data",
                        "tradDeletePersoData" : "Delete my account and my personal data",
                        "tradConnexionInscription" : "Sign-in/Sign-up",
                        "tradSearch" : "Enter your search here",
                        "tradAddFavorite" : "Add to my favorites",
                        "tradGoDeal" : "Go to Deal",
                        "tradPopularity" : "Popularity",
                        "tradNewsletter" : "Sign-up to NEWSLETTER",
                        "tradPolitique" : "Confidentiality policies",
                        "tradTerms" : "Terms of use",
                        "tradMoreDetail" : "See more details",
                        "tradEnterEmail" : "Enter your Email",
                        "tradMyAccount" : "My account",
                    }
                },
                "fr-FR": {
                    "translation": {
                        "tradConnect": "Connexion",
                        "tradCancel": "Annuler",
                        "tradUserSetting": "Paramètre de compte",
                        "tradLogout": "Déconnexion",
                        "tradAbout": "à propos de nous",
                        "tradUsername": "Nom d'utilisateur",
                        "tradName": "Nom",
                        "tradPassword": "Mot de passe",
                        "tradConfirmPassword": "Confirmer le mot de passe",
                        "tradConfirmPasswordError": "Les mots de passe ne sont pas identiques.",
                        "tradBirth": "Date de naissance",
                        "tradLogin": "Connexion à ton compte",
                        "tradCreateAccount": "Création de ton compte",
                        "tradRemember": "Se souvenir de moi",
                        "tradRegister": "S'inscrire",
                        "tradFilter": "Filtre",
                        "tradAvailable": "Disponible en magasin",
                        "tradFavorite": "Favoris",
                        "tradMoneyLogo": "€",
                        "tradPrice": "Prix",
                        "tradAdditionDate": "Date d'ajout",
                        "tradLike": "J'aime",
                        "tradDislike": "Je n'aime pas",
                        "tradAsc": "Croissant",
                        "tradDesc": "Décroisant",
                        "tradPartner": "Nos partenaires",
                        "tradContact": "Nous contacter",
                        "tradOrder" : "Trier par",
                        "tradSort" : "Sens du tri",
                        "tradAddOffer" : "Ajouter une offre",
                        "tradAdministration" : "Administration",
                        "tradAdd" : "Ajouter",
                        "tradUpdate" : "Mise à jour",
                        "tradArticleName" : "Nom de l'article",
                        "tradTermsOfUse" : "En cochant cette case vous acceptez le",
                        "tradGetPersoData" : "Récupérer mes données personnels",
                        "tradDeletePersoData" : "Supprimer mon compte ainsi que mes données personnels",
                        "tradConnexionInscription" : "Connexion/Inscription",
                        "tradSearch" : "Tapez ici votre recherche",
                        "tradAddFavorite" : "Ajouter à mes favoris",
                        "tradGoDeal" : "Aller vers le Deal",
                        "tradPopularity" : "Popularité",
                        "tradNewsletter" : "S'incrire pour la NEWSLETTER",
                        "tradPolitique" : "Politique de confidentialité",
                        "tradTerms" : "Termes & Conditions",
                        "tradMoreDetail" : "Voir plus de détails",
                        "tradEnterEmail" : "Entrer votre Email",
                        "tradMyAccount" : "Mon compte"
                    }
                }
            }
    }, function(err, t) { updateContent(); }
);

function updateContent() {
    $('.tradConnect').text(i18next.t('tradConnect'));
    $('.tradCancel').text(i18next.t('tradCancel'));
    $('.tradUserSetting').text(i18next.t('tradUserSetting'));
    $('.tradLogout').text(i18next.t('tradLogout'));
    $('.tradAbout').text(i18next.t('tradAbout'));
    $('.tradUsername').text(i18next.t('tradUsername'));
    $('.tradName').text(i18next.t('tradName'));
    $('.tradPassword').text(i18next.t('tradPassword'));
    $('.tradConfirmPassword').text(i18next.t('tradConfirmPassword'));
    $('.tradConfirmPasswordError').text(i18next.t('tradConfirmPasswordError'));
    $('.tradBirth').text(i18next.t('tradBirth'));
    $('.tradLogin').text(i18next.t('tradLogin'));
    $('.tradCreateAccount').text(i18next.t('tradCreateAccount'));
    $('.tradRemember').text(i18next.t('tradRemember'));
    $('.tradRegister').text(i18next.t('tradRegister'));
    $('.tradFilter').text(i18next.t('tradFilter'));
    $('.tradAvailable').text(i18next.t('tradAvailable'));
    $('.tradFavorite').text(i18next.t('tradFavorite'));
    $('.tradPrice').text(i18next.t('tradPrice'));
    $('.tradAdditionDate').text(i18next.t('tradAdditionDate'));
    $('.tradLikeDislike').text(i18next.t('tradLike') + " / " + i18next.t('tradDislike'));
    $('.tradDislike').text(i18next.t('tradDislike'));
    $('.tradLike').text(i18next.t('tradLike'));
    $('.tradAsc').text(i18next.t('tradAsc'));
    $('.tradDesc').text(i18next.t('tradDesc'));
    $('.tradPartner').text(i18next.t('tradPartner'));
    $('.tradContact').text(i18next.t('tradContact'));
    $('.tradOrder').text(i18next.t('tradOrder'));
    $('.tradAddOffer').text(i18next.t('tradAddOffer')); //.prop.('label', i18next.t('tradSort'));
    $('.tradAdministration').text(i18next.t('tradAdministration'));
    $('.tradAdd').text(i18next.t('tradAdd'));
    $('.tradUpdate').text(i18next.t('tradUpdate'));
    $('.tradArticleName').text(i18next.t('tradArticleName'));
    $('.tradTermsOfUse').text(i18next.t('tradTermsOfUse'));
    $('.tradGetPersoData').text(i18next.t('tradGetPersoData'));
    $('.tradDeletePersoData').text(i18next.t('tradDeletePersoData'));
    $('.tradConnexionInscription').text(i18next.t('tradConnexionInscription'));
    //$('.tradSearch').attr('placeholder', 'placeholder');
    $('.tradSearch').attr('placeholder', i18next.t('tradSearch'));
    $('.tradAddFavorite').text(i18next.t('tradAddFavorite'));
    $('.tradGoDeal').text(i18next.t('tradGoDeal'));
    $('.tradPopularity').text(i18next.t('tradPopularity'));
    $('.tradPolitique').text(i18next.t('tradPolitique'));
    $('.tradTerms').text(i18next.t('tradTerms'));
    $('.tradMoreDetail').text(i18next.t('tradMoreDetail'));
    $('.tradNewsletter').text(i18next.t('tradNewsletter'));
    $('.tradEnterEmail').attr('placeholder', i18next.t('tradEnterEmail'));







}

function changeLng(lng) {
    i18next.changeLanguage(lng);
}