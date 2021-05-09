"use strict";
var Aufgabe2_3_2;
(function (Aufgabe2_3_2) {
    let behaelterinhalte = document.getElementById("behaelterinhalte");
    let startseite = document.getElementById("startseiteButton");
    function Behaelterauswahl(_trinkbehaelter) {
        let div = document.createElement("div");
        div.style.textAlign = "center";
        div.classList.add("divContainer");
        let image = document.createElement("img");
        image.src = _trinkbehaelter.bild;
        image.classList.add("behaelterBild");
        div.appendChild(image);
        let button = document.createElement("button");
        button.dataset.form = _trinkbehaelter.form;
        button.classList.add("behaelterButton");
        button.innerText = "Auswahl bestätigen";
        button.addEventListener("click", handlerAusgabe);
        div.appendChild(button);
        let hr = document.createElement("hr");
        div.appendChild(hr);
        return div;
    }
    //Aufruf der Funktion zum hinzufügen
    for (let i = 0; i < Aufgabe2_3_2.behaelterwahl.length; i++) {
        let x = Behaelterauswahl(Aufgabe2_3_2.behaelterwahl[i]);
        behaelterinhalte.appendChild(x);
    }
    let startseiteButton = document.createElement("button");
    let a = document.createElement("a");
    a.href = "index.html";
    a.innerText = "Zurück zur Startseite";
    startseiteButton.appendChild(a);
    startseite.appendChild(startseiteButton);
    //Konsolenausgabe
    function handlerAusgabe(_event) {
        let target = _event.target;
        for (let i = 0; i < Aufgabe2_3_2.behaelterwahl.length; i++) {
            if (Aufgabe2_3_2.behaelterwahl[i].form == target.dataset.form) {
                console.log(Aufgabe2_3_2.behaelterwahl[i]);
            }
        }
    }
})(Aufgabe2_3_2 || (Aufgabe2_3_2 = {}));
//# sourceMappingURL=behaelter.js.map