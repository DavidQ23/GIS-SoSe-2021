"use strict";
var Rezepte;
(function (Rezepte) {
    let registrationFeedback = document.getElementById("registrationFeedback");
    let registrationButton = document.getElementById("registrationButton");
    let registrationForm = document.getElementById("registrationForm");
    registrationButton.addEventListener("click", registration);
    let loginForm = document.getElementById("loginForm");
    let loginButton = document.getElementById("loginButton");
    loginButton.addEventListener("click", login);
    async function registration() {
        let formData = new FormData(document.forms[0]); //Auslesen der eingebenen Daten des ersten Formulars im Dokument 
        let url = "https://davidqgissose2021.herokuapp.com/registration"; //URL des Formulars
        let query = new URLSearchParams(formData);
        url = url + "?" + query.toString(); //Daten des Formulars als query
        let response = await fetch(url); //auf Serverantwort warten
        let answer = await response.text();
        console.log(answer);
        let paragraphForFeedback = document.createElement("p");
        paragraphForFeedback.innerHTML = answer;
        registrationFeedback.appendChild(paragraphForFeedback);
        if (answer == "Name existiert bereits! Bitte einen neuen Namen verwenden." || answer == "Bitte alle Felder ausfüllen!") {
            registrationForm.reset();
        }
        else {
            localStorage.setItem("username", answer);
            location.href = "rezeptStartseite.html";
        }
    }
    async function login() {
        let formData = new FormData(document.forms[1]);
        let url = "https://davidqgissose2021.herokuapp.com/login";
        let query = new URLSearchParams(formData);
        url = url + "?" + query.toString();
        let response = await fetch(url);
        let answer = await response.text();
        console.log(answer);
        if (answer == "Nutzername wurde nicht gefunden." || answer == "Bitte Felder vollständig ausfüllen!") {
            loginForm.reset();
        }
        else {
            localStorage.setItem("username", answer);
            location.href = "rezeptStartseite.html";
        }
    }
})(Rezepte || (Rezepte = {}));
//# sourceMappingURL=login.js.map