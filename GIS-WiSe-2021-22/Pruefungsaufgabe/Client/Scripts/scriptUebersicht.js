"use strict";
var Gefrierschrank;
(function (Gefrierschrank) {
    let allGefriergut = document.getElementById("displayListe");
    window.onload = async function buildSite() {
        let url = "https://davidqgissose2021.herokuapp.com/allGefriergut";
        let response = await fetch(url);
        let answer = await response.text();
        //let everyGefriergut: Gefriergut[] = JSON.parse(answer);
        /* let displayTabelle: HTMLDivElement = <HTMLDivElement>document.getElementById("displayListe");
        let inhaltstabelle: HTMLTableElement = <HTMLTableElement>document.getElementById("inhaltstabelle");
        
        //Aufbau der Seite
        for (let i: number = 0; i < everyGefriergut.length; i++) {
            
        } */
    };
})(Gefrierschrank || (Gefrierschrank = {}));
//# sourceMappingURL=scriptUebersicht.js.map