namespace Aufgabe2_3_2 {

    export interface Trinkbehaelter {
        farbe: string;
        fuellmenge: number;             //Angaben in ml
        form: string;
        bild: string;
    }

    export interface Trinkinhalt {
        getraenkeart: string;       //z.B. Kaffee, Fruchtsaft, Sprudel, Bier etc.
    }

    export interface Zusatz {
        zusatzinhalt: string; //z.B. Zucker / Milch etc
    }

    export interface Getraenk {
        trinkbehaelter: Trinkbehaelter;
        trinkfluessigkeit: Trinkinhalt;
        zusatz: Zusatz;
    }
}