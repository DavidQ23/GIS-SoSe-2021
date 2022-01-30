"use strict";
var Gefrierschrank;
(function (Gefrierschrank) {
    let displayListe = document.getElementById("displayListe");
    let inhaltstabelle = document.getElementById("inhaltstabelle");
    let detailLink = document.createElement("a");
    detailLink.setAttribute("href", "detail.html");
    window.onload = async function buildSite() {
        let url = "https://davidqgissose2021.herokuapp.com/buildSite";
        console.log(url);
        let response = await fetch(url);
        let answer = await response.text();
        console.log(answer);
        let alleGefriergueter = JSON.parse(answer);
        for (let i = 1; i < alleGefriergueter.length; i++) {
            let tabellenzeile = document.createElement("tr");
            tabellenzeile.classList.add("tabellenzeile");
            let nameTabelle = document.createElement("td");
            nameTabelle.classList.add("nameTabelle");
            nameTabelle.innerHTML = alleGefriergueter[i].name;
            tabellenzeile.appendChild(nameTabelle);
            let ablaufTabelle = document.createElement("td");
            ablaufTabelle.classList.add("ablaufTabelle");
            let datumAusgabe = alleGefriergueter[i].ablaufdatum;
            ablaufTabelle.innerHTML = datumAusgabe.toLocaleString();
            tabellenzeile.appendChild(ablaufTabelle);
            let detailTabelle = document.createElement("td");
            detailTabelle.classList.add("detailTabelle");
            detailTabelle.appendChild(detailLink);
        }
    };
})(Gefrierschrank || (Gefrierschrank = {}));
//# sourceMappingURL=scriptUebersicht.js.map