namespace Aufgabe2_3_1 {

    let abbildungen: HTMLElement = document.getElementById("abbildungen");
    let createRectangle: HTMLElement = document.getElementById("createRectangle");
    let clearAllRectangle: HTMLElement = document.getElementById("clearAllRectangle");

    class Rechteck {
        breite: number;
        hoehe: number;

        constructor() {
            this.breite = Math.floor(Math.random() * 100);
            this.hoehe = Math.floor(Math.random() * 100);
        }

        drawRect(_rechteck: Rechteck): void {
            let a: number = Math.floor(Math.random() * 1500);
            let b: number = Math.floor(Math.random() * 500);
            let div: HTMLDivElement = document.createElement("div");
            div.style.height = _rechteck.hoehe + "px";
            div.style.width = _rechteck.breite + "px";
            div.style.top = a + "px";
            div.style.left = b + "px";
            div.style.position = "absolute";
            div.style.backgroundColor = "blue";
            abbildungen.appendChild(div);
        }

    }

    function addRectangle(): void {
        let rectangle: Rechteck = new Rechteck();
        rectangle.drawRect(rectangle);
    }

    function clearRectangle(): void {
        abbildungen.innerHTML = "";
    }

    createRectangle.addEventListener("click", addRectangle);
    clearAllRectangle.addEventListener("click", clearRectangle);


}

