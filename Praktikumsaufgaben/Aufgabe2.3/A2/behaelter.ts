namespace Aufgabe2_3_2 {
    let behaelterinhalte: HTMLElement = document.getElementById("behaelterinhalte");
    let startseite: HTMLElement = document.getElementById("startseiteButton");

    function Behaelterauswahl(_trinkbehaelter: Trinkbehaelter): HTMLElement {
        let div: HTMLDivElement = document.createElement("div");
        div.style.textAlign = "center";
        div.classList.add("divContainer");

        let image: HTMLImageElement = document.createElement("img");
        image.src = _trinkbehaelter.bild;
        image.classList.add("behaelterBild");
        div.appendChild(image);



        let button: HTMLButtonElement = document.createElement("button");
        button.dataset.form = _trinkbehaelter.form;
        button.classList.add("behaelterButton");
        button.innerText = "Auswahl bestätigen";
        button.addEventListener("click", handlerAusgabe);
        div.appendChild(button);




        let hr: HTMLHRElement = document.createElement("hr");
        div.appendChild(hr);

        return div;
    }


    //Aufruf der Funktion zum hinzufügen
    for (let i: number = 0; i < behaelterwahl.length; i++) {
        let x: HTMLElement = Behaelterauswahl(behaelterwahl[i]);
        behaelterinhalte.appendChild(x);
    }

    let startseiteButton: HTMLButtonElement = document.createElement("button");
    let a: HTMLAnchorElement = document.createElement("a");
    a.href = "index.html";
    a.innerText = "Zurück zur Startseite";

    startseiteButton.appendChild(a);
    startseite.appendChild(startseiteButton);


    //Konsolenausgabe
    function handlerAusgabe(_event: MouseEvent): void {
        let target: HTMLElement = <HTMLElement>_event.target;
        for (let i: number = 0; i < behaelterwahl.length; i++) {
            if (behaelterwahl[i].form == target.dataset.form) {
                console.log(behaelterwahl[i]);

            }
        }
    }
}