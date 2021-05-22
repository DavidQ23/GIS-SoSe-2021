namespace Aufgabe2_5 {

    export interface Getraenkewahl {
        name: string;
        preis: string;
        bild: string;
    }

    export interface Auswahl {
        behaelter: Getraenkewahl[];
        inhalte: Getraenkewahl[];
        zusatz: Getraenkewahl[];
    }

    export interface Getraenk {
        behaelter: Getraenkewahl;
        inhalte: Getraenkewahl;
        zusatz: Getraenkewahl;
    }


}