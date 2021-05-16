"use strict";
var Aufgabe2_4_1;
(function (Aufgabe2_4_1) {
    // Aufgabe 1 a)
    Aufgabe2_4_1.getraenkJSON = `
    {
        
        "behaelter" : [
            {
                "name" : "Tasse",
                "preis" : "5",
                "bild" : "Bilder/Tasse.jpeg"
            },
            {
                "name" : "Becher",
                "preis" : "2",
                "bild" : "Bilder/Becher.jpg"
            },
            {
                "name" : "Wasserglas",
                "preis" : "4",
                "bild" : "Bilder/Wasserglas.jpg"
            }
        ],

        "inhalte" : [
            {
                "name" : "Kaffee",
                "preis" : "3",
                "bild" : "Bilder/Kaffee.jpg"
            },
            {
                "name" : "Pfirsicheistee",
                "preis" : "1",
                "bild" : "Bilder/Pfirsicheistee.png"
            },
            {
                "name" : "Cola",
                "preis" : "2",
                "bild" : "Bilder/Cola.png"
            }
        ],

        "zusatz" : [
            {
                "name" : "Zucker",
                "preis" : "0.5",
                "bild" : "Bilder/Zucker.jpeg"
            },
            {
                "name" : "Milch",
                "preis" : "0.8",
                "bild" : "Bilder/Milch.png"
            },
            {
                "name" : "Eiswürfel",
                "preis" : "1",
                "bild" : "Bilder/Eiswürfel.jpg"
            }
        ]
    }
    `;
    //Funktion zum Konvertieren des JSON Strings in ein Objekt
    function ConvertJSONString() {
        return JSON.parse(Aufgabe2_4_1.getraenkJSON);
    }
    Aufgabe2_4_1.ConvertJSONString = ConvertJSONString;
})(Aufgabe2_4_1 || (Aufgabe2_4_1 = {}));
//# sourceMappingURL=data.js.map