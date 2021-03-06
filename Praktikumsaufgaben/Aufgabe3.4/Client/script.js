"use strict";
var Aufgabe3_4;
(function (Aufgabe3_4) {
    let button1 = document.getElementById("SaveInDB");
    button1.addEventListener("click", SaveInDB);
    let button2 = document.getElementById("DataFromDB");
    button2.addEventListener("click", ServerResponse);
    let serverausgabe = document.getElementById("Serverantwort");
    async function SaveInDB() {
        let formData = new FormData(document.forms[0]); // Auslesen der eingebenen Daten des ersten Formulars im Dokument
        let url = "https://davidqgissose2021.herokuapp.com/saveData";
        let query = new URLSearchParams(formData);
        url = url + "?" + query.toString();
        console.log(url);
        let response = await fetch(url);
        let answer = await response.text();
        console.log(answer);
    }
    async function ServerResponse() {
        let formData = new FormData(document.forms[0]); // Auslesen der eingebenen Daten des ersten Formulars im Dokument
        let url = "https://davidqgissose2021.herokuapp.com/printData";
        let query = new URLSearchParams(formData);
        url = url + "?" + query.toString();
        console.log(url);
        let response = await fetch(url);
        let answer = await response.text();
        console.log(answer);
        serverausgabe.innerHTML = answer;
    }
})(Aufgabe3_4 || (Aufgabe3_4 = {}));
//# sourceMappingURL=script.js.map