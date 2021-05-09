"use strict";
var Aufgabe2_3_1;
(function (Aufgabe2_3_1) {
    let abbildungen = document.getElementById("abbildungen");
    let createRectangle = document.getElementById("createRectangle");
    let clearAllRectangle = document.getElementById("clearAllRectangle");
    class Rechteck {
        constructor() {
            this.breite = Math.floor(Math.random() * 100);
            this.hoehe = Math.floor(Math.random() * 100);
        }
        drawRect(_rechteck) {
            let a = Math.floor(Math.random() * 1500);
            let b = Math.floor(Math.random() * 500);
            let div = document.createElement("div");
            div.style.height = _rechteck.hoehe + "px";
            div.style.width = _rechteck.breite + "px";
            div.style.top = a + "px";
            div.style.left = b + "px";
            div.style.position = "absolute";
            div.style.backgroundColor = "blue";
            abbildungen.appendChild(div);
        }
    }
    function addRectangle() {
        let rectangle = new Rechteck();
        rectangle.drawRect(rectangle);
    }
    function clearRectangle() {
        abbildungen.innerHTML = "";
    }
    createRectangle.addEventListener("click", addRectangle);
    clearAllRectangle.addEventListener("click", clearRectangle);
})(Aufgabe2_3_1 || (Aufgabe2_3_1 = {}));
//# sourceMappingURL=script.js.map