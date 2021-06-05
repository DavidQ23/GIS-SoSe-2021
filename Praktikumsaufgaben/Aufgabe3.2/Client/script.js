"use strict";
var P_3_2;
(function (P_3_2) {
    async function sendDataHtml() {
        let formData = new FormData(document.forms[0]); // Auslesen der eingebenen Daten des ersten Formulars im Dokument
        /* for (let entry of formData) {                               //Konsolenausgabe der Key-Value-Paare des Formulars
            console.log(entry);
            console.log("name: " + entry[0]);
            console.log("value: " + entry[1]);
        } */
        let url = "https://davidqgissose2021.herokuapp.com/html";
        let query = new URLSearchParams(formData); //Vorliegende Daten aus dem Formular werden aus einem FormData-Objekt generiert
        url = url + "?" + query.toString(); //query String wird an URL hinten angehängt
        console.log(url); //URL wird in Kosole ausgegeben
        let response = await fetch(url); //Auf die URL warten zum Abschicken zum Server
        let answer = await response.text(); //Warten auf Antwort des Servers in Form eines Strings
        let serverausgabe = document.getElementById("serverausgabe");
        serverausgabe.innerHTML = answer;
    }
    async function sendDataJson() {
        let formData = new FormData(document.forms[0]); // Auslesen der eingebenen Daten des ersten Formulars im Dokument
        let url = "https://davidqgissose2021.herokuapp.com/json";
        let query = new URLSearchParams(formData); //Vorliegende Daten aus dem Formular werden aus einem FormData-Objekt generiert
        url = url + "?" + query.toString(); //query String wird an URL hinten angehängt
        console.log(url); //URL wird in Kosole ausgegeben
        let response = await fetch(url); //Auf die URL warten zum Abschicken zum Server
        let answer = await response.json(); //Warten auf Antwort des Servers in Form eines Strings
        console.log(answer);
    }
    let button1 = document.getElementById("SubmitButtonHtml");
    button1.addEventListener("click", sendDataHtml);
    let button2 = document.getElementById("SubmitButtonJson");
    button2.addEventListener("click", sendDataJson);
})(P_3_2 || (P_3_2 = {}));
//# sourceMappingURL=script.js.map