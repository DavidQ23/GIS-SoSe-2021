"use strict";
var Rezepte;
(function (Rezepte) {
    let registrationFeedback = document.getElementById("registrationFeedback");
    let registrationButton = document.getElementById("registrationButton");
    registrationButton.addEventListener("click", registration);
    async function registration() {
        let formData = new FormData(document.forms[0]); // Auslesen der eingebenen Daten des ersten Formulars im Dokument 
        let url = ""; //URL des Formulars
        let query = new URLSearchParams(formData);
        url = url + "?" + query.toString(); //Daten des Formulars als query
        let response = await fetch(url); //auf Serverantwort warten
        let answer = await response.text();
        console.log(answer);
        let paragraphForFeedback = document.createElement("p");
        paragraphForFeedback.innerHTML = answer;
        registrationFeedback.appendChild(paragraphForFeedback);
    }
})(Rezepte || (Rezepte = {}));
//# sourceMappingURL=login.js.map