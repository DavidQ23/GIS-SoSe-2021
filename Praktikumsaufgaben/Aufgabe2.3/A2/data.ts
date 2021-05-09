namespace Aufgabe2_3_2 {
    export let behaelterwahl: Trinkbehaelter[] = [];


    // Trinkbehälter
    let trinkbehaelter1: Trinkbehaelter = { farbe: "schwarz", fuellmenge: 240, form: "Tasse", bild: "Tasse.jpeg" };
    behaelterwahl.push(trinkbehaelter1);
    let trinkbehaelter2: Trinkbehaelter = { farbe: "rot", fuellmenge: 400, form: "Becher", bild: "Becher.jpg" };
    behaelterwahl.push(trinkbehaelter2);
    let trinkbehaelter3: Trinkbehaelter = { farbe: "gruen", fuellmenge: 500, form: "Wasserglas", bild: "Wasserglas.jpg" };
    behaelterwahl.push(trinkbehaelter3);

    // Trinkinhalt
    export let inhaltswahl: Trinkinhalt[] = [];

    let getraenkinhalt1: Trinkinhalt = { getraenkeart: "Kaffee" };
    inhaltswahl.push(getraenkinhalt1);
    let getraenkinhalt2: Trinkinhalt = { getraenkeart: "Pfirsicheistee" };
    inhaltswahl.push(getraenkinhalt2);
    let getraenkinhalt3: Trinkinhalt = { getraenkeart: "Kaffee" };
    inhaltswahl.push(getraenkinhalt3);

    // Deko
    export let zusatzwahl: Zusatz[] = [];

    let zusatz1: Zusatz = { zusatzinhalt: "Zucker" };
    zusatzwahl.push(zusatz1);
    let zusatz2: Zusatz = { zusatzinhalt: "Milch" };
    zusatzwahl.push(zusatz2);
    let zusatz3: Zusatz = { zusatzinhalt: "Eis" };
    zusatzwahl.push(zusatz3);


}