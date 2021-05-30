"use strict";
var P_3_1Server;
(function (P_3_1Server) {
    async function communication() {
        let formData = new FormData(document.forms[0]); // Auslesen der eingebenen Daten des ersten Formulars im Dokument
        for (let entry of formData) { //Konsolenausgabe der Key-Value-Paare des Formulars
            console.log(entry);
            console.log("name: " + entry[0]);
            console.log("value: " + entry[1]);
        }
        let url = "https://davidqgissose2021.herokuapp.com/";
        let query = new URLSearchParams(formData); //Vorliegende Daten aus dem Formular werden aus einem FormData-Objekt generiert
        url = url + "?" + query.toString(); //query String wird an URL hinten angehängt
        console.log(url); //URL wird in Kosole ausgegeben
        let response = await fetch(url); //Auf die URL warten zum Abschicken zum Server
        let answer = await response.text(); //Warten auf Antwort des Servers in Form eines Strings
        console.log(answer); //Konsolenausgabe der Serverantwort
    }
    let button = document.getElementById("SubmitButton");
    button.addEventListener("click", communication);
})(P_3_1Server || (P_3_1Server = {}));
//# sourceMappingURL=script.js.map