"use strict";
var Rezepte;
(function (Rezepte) {
    let registrationFeedback = document.getElementById("registrationFeedback");
    let registrationButton = document.getElementById("registrationButton");
    let registrationForm = document.getElementById("registrationForm");
    registrationButton.addEventListener("click", registration);
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
        if (answer == "Name existiert bereits! Bitte einen neuen Namen verwenden.") {
            registrationForm.reset();
        }
        else if (answer == "Bitte alle Felder ausfüllen!") {
            registrationForm.reset();
        }
        else {
            location.href = "rezeptStartseite.html";
        }
    }
    /* async function login(): Promise<void> {
        let formData: FormData = new FormData(document.forms[0]);
        let url: string = "https://davidqgissose2021.herokuapp.com/login";
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        url = url + "?" + query.toString();
        let response: Response = await fetch(url);
        let answer: string = await response.text();
        console.log(answer);
    } */
})(Rezepte || (Rezepte = {}));
//# sourceMappingURL=login.js.map