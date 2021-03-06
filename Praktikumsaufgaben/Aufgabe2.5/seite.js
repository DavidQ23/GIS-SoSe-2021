"use strict";
var Aufgabe2_5;
(function (Aufgabe2_5) {
    let behaelterinhalte = document.getElementById("behaelterinhalte");
    let getraenkeinhalte = document.getElementById("getränkinhaltsinhalte");
    let zusatzinhalte = document.getElementById("zusatzinhalte");
    //let auswahlmöglichkeiten: Auswahl = ConvertJSONString();
    async function communicate(_url) {
        let antwort = await fetch(_url);
        let auswahlmöglichkeiten = await antwort.json();
        seitenaufbau(auswahlmöglichkeiten);
    }
    communicate("https://davidq23.github.io/GIS-SoSe-2021/Praktikumsaufgaben/Aufgabe2.5/data.json");
    function Behaelterauswahl(_trinkbehaelter) {
        let div = document.createElement("div");
        div.style.textAlign = "center";
        div.classList.add("divContainer");
        let image = document.createElement("img");
        image.src = _trinkbehaelter.bild;
        div.appendChild(image);
        let button = document.createElement("button");
        button.classList.add("auswahlButton");
        button.innerText = "Auswahl bestätigen";
        button.addEventListener("click", Zwischenspeichern);
        div.appendChild(button);
        let hr = document.createElement("hr");
        div.appendChild(hr);
        return div;
        function Zwischenspeichern(_event) {
            if (document.querySelector("title").getAttribute("id") == "Behaelterwahl") {
                localStorage.setItem("behaeltername", _trinkbehaelter.name);
                localStorage.setItem("behaelterpreis", _trinkbehaelter.preis);
                localStorage.setItem("behaelterbild", _trinkbehaelter.bild);
                location.href = "getränkeinhalt.html";
            }
            else if (document.querySelector("title").getAttribute("id") == "Inhaltswahl") {
                localStorage.setItem("inhaltsname", _trinkbehaelter.name);
                localStorage.setItem("inhaltspreis", _trinkbehaelter.preis);
                localStorage.setItem("inhaltsbild", _trinkbehaelter.bild);
                location.href = "zusatzauswahl.html";
            }
            else if (document.querySelector("title").getAttribute("id") == "Zusatzwahl") {
                localStorage.setItem("zusatzname", _trinkbehaelter.name);
                localStorage.setItem("zusatzpreis", _trinkbehaelter.preis);
                localStorage.setItem("zusatzbild", _trinkbehaelter.bild);
                location.href = "getraenk.html";
            }
        }
    }
    //Aufruf der Funktion zum hinzufügen
    function seitenaufbau(_auswahl) {
        if (document.querySelector("title").getAttribute("id") == "Behaelterwahl") {
            for (let i = 0; i < _auswahl.behaelter.length; i++) {
                let x = Behaelterauswahl(_auswahl.behaelter[i]);
                behaelterinhalte.appendChild(x);
            }
        }
        else if (document.querySelector("title").getAttribute("id") == "Inhaltswahl") {
            for (let i = 0; i < _auswahl.inhalte.length; i++) {
                let x = Behaelterauswahl(_auswahl.inhalte[i]);
                getraenkeinhalte.appendChild(x);
            }
        }
        else if (document.querySelector("title").getAttribute("id") == "Zusatzwahl") {
            for (let i = 0; i < _auswahl.zusatz.length; i++) {
                let x = Behaelterauswahl(_auswahl.zusatz[i]);
                zusatzinhalte.appendChild(x);
            }
        }
    }
    let bisherigeAuswahl = document.getElementById("bisherigeAuswahl");
    if (document.querySelector("title").getAttribute("id") == "Inhaltswahl") {
        let div = document.createElement("div");
        div.style.textAlign = "center";
        div.classList.add("divContainer");
        let image = document.createElement("img");
        image.src = localStorage.getItem("behaelterbild");
        div.appendChild(image);
        bisherigeAuswahl.appendChild(div);
    }
    else if (document.querySelector("title").getAttribute("id") == "Zusatzwahl") {
        let div = document.createElement("div");
        div.style.textAlign = "center";
        div.classList.add("divContainer");
        let image1 = document.createElement("img");
        let image2 = document.createElement("img");
        image1.src = localStorage.getItem("behaelterbild");
        image2.src = localStorage.getItem("inhaltsbild");
        div.appendChild(image1);
        div.appendChild(image2);
        bisherigeAuswahl.appendChild(div);
    }
    else if (document.querySelector("title").getAttribute("id") == "Getraenk") {
        let div = document.createElement("div");
        div.style.textAlign = "center";
        div.classList.add("divContainer");
        let image1 = document.createElement("img");
        let image2 = document.createElement("img");
        let image3 = document.createElement("img");
        image1.src = localStorage.getItem("behaelterbild");
        image2.src = localStorage.getItem("inhaltsbild");
        image3.src = localStorage.getItem("zusatzbild");
        div.appendChild(image1);
        div.appendChild(image2);
        div.appendChild(image3);
        bisherigeAuswahl.appendChild(div);
        async function serverausgabe(_url) {
            let query = new URLSearchParams(localStorage);
            _url = _url + "?" + query.toString();
            let antwort = await fetch(_url);
            let ausgabe = await antwort.json();
            if (ausgabe.message != null) {
                let ausgabeAnzeigen = document.getElementById("serverausgabe");
                ausgabeAnzeigen.textContent = ausgabe.message;
                ausgabeAnzeigen.classList.add("message");
            }
            else {
                let ausgabeAnzeigen = document.getElementById("serverausgabe");
                ausgabeAnzeigen.textContent = ausgabe.error;
                ausgabeAnzeigen.classList.add("error");
            }
        }
        serverausgabe("https://gis-communication.herokuapp.com");
    }
})(Aufgabe2_5 || (Aufgabe2_5 = {}));
//# sourceMappingURL=seite.js.map