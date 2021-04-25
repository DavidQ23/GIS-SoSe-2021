"use strict";
var Aufgabe2_1;
(function (Aufgabe2_1) {
    /*  Aufgabe 1 a)
    In der Konsole wird zunächst "Alles" dann "Klar?" und abschließend "Logo!" ausgegeben.
    Zulässige Namen sind alle Ziffern und Buchstaben, jedoch ohne Leerzeichen oder Bindestriche dazwischen. Schlüsselwörter wie let sind ebenfalls nicht erlaubt.
    */
    /*  Aufgabe 1 b)
    Zunächst wird der function-Block sozusagen ignoriert und die Ausführung der Funktion a_1 wird ausgeführt. Dementsprechend wird zum function-block gesprungen
    bei dem chronologisch die Codes ausgeführt werden. a wird als Stringvariable angelegt und in der Konsole ausgeben und danach wird die func1() ausgeführt.
    Nun wird der func1()-Funktionsblock aufgerufen, in dem lediglich ein "Klar!" in der Konsole ausgegeben wird. Nun springt man wieder in den a_1() Funktionsblock
    und geht chronologisch weiter. In dem Fall wird "Logo!" in der Konsole ausgeben. Somit wird nach ausführen des Codes das in Aufgabe 1a) Beschriebene ausgegeben.
    */
    //    Aufgabe 1 c)
    function a_1() {
        let a = "Alles";
        console.log(a);
        func2();
        console.log(a);
        func1();
        console.log(a);
        console.log("Logo!");
    }
    a_1();
    function func1() {
        console.log("Klar?");
    }
    function func2() {
        console.log("Gute!");
    }
})(Aufgabe2_1 || (Aufgabe2_1 = {}));
var Aufgabe2_2;
(function (Aufgabe2_2) {
    /*In der Konsole wird von 9 beginnend immer um 1 runtergezählt, sprich pro Zeile in der Konsole steht: 9, 8, 7,...
    Der letzte Wert, der ausgegeben wird ist die 1, da danach die Schleife nicht mehr ausgeführt wird, da die Bedingung dafür nicht mehr wahr ist.
    */
    function a2() {
        let i = 9;
        do {
            console.log(i);
            i = i - 1;
        } while (i > 0);
    }
    a2();
})(Aufgabe2_2 || (Aufgabe2_2 = {}));
var Aufgabe2_4;
(function (Aufgabe2_4) {
    /*  Aufgabe 4
     
    Folgendes wird ausgegeben: Hallo Bla Hallo Blubb Test
     
    Die Konsole gibt zunächst das globale x (= Hallo) aus und und danach das lokale y der func1() (= Bla).
    X ist der Parameter der func1(), welcher zu einem Bla umgeschrieben und in der Konsole ausgegeben wird.
    Dementsprechend folgt darauf wieder ein Hallo, da die globale Variable nicht überschrieben wurde.
    In func2() wird ein lokales x deklariert und der ihm zugewiesene Wert wird in der Konsole ausgegeben.
    Als letztes wird nun Test ausgegeben, da in func3() kein neues lokas x deklariert wird, sondern das globale x (da der Block auf die Globale zugreifen kann)
    überschrieben mit Test.
     
    */
    let x = "Hallo";
    console.log(x);
    func1(x);
    console.log(x);
    func2();
    func3();
    console.log(x);
    function func1(y) {
        y = "Bla";
        console.log(y);
    }
    function func2() {
        let x = "Blubb";
        console.log(x);
    }
    function func3() {
        x = "Test";
    }
    /*  Aufgabe 4 b)
    Auf globale Variablen kann von überall im gesamten Code zugegriffen und verändert werden, auf lokale Variablen kann man nur innerhalb
    des jeweiligen Blocks zugreifen. Übergabeparameter beschreiben lediglich, dass dieser Parametertyp mitgegeben werden muss. Dies kann man zum Beispiel
    in Funktionen einbauen, wenn man einen bestimmten Typen weiterverwenden möchte.
     
    Zahlen sind Werte, die einer Variablen zugewiesen werden. Diese haben dann eben diese Zahl als Wert und werden mit "call by value" abgerufen.
    Strings sind Orte von Werten im Arbeitsspeicher auf die sozusagen gezeigt wird. Diese werden durch "call by Reference" abgerufen. Der Wert selber wird nie abgerufen, sondern der
    Ort des Wertes auf den gezeigt wird.
     
    Normalen Variablen werden immer ein Wert zugeordnet, während Funktionen etwas ausführen und einen Wert zurückgeben (sofern kein Void).
    Sie sind in der hinsicht gleich, dass man bei beiden den Wert abfragen kann.
    */
})(Aufgabe2_4 || (Aufgabe2_4 = {}));
var Aufgabe2_5;
(function (Aufgabe2_5) {
    // Aufgabe 5 a)
    function multiply(_param1, _param2) {
        return _param1 * _param2;
    }
    console.log(multiply(30, 2));
    //  Aufgabe 5 b)
    function max(_param1, _param2) {
        if (_param1 > _param2) {
            return _param1;
        }
        else {
            return _param2;
        }
    }
    console.log(max(53, 5));
    //  Aufgabe 5 c)
    let zahl = 0;
    while (zahl < 100) {
        zahl += 1;
        console.log(zahl);
    }
    // Aufgabe 5 d)
    for (let i = 0; i < 10; i++) {
        console.log(getRandomNumber(0, 100));
    }
    function getRandomNumber(_min, _max) {
        _min = Math.ceil(_min);
        _max = Math.floor(_max);
        return Math.floor(Math.random() * (_max - _min)) + _min;
    }
    //  Aufgabe 5 e)
    function factorial(_n) {
        let j = 1;
        let k = 1;
        while (j < _n) {
            k = k * (j + 1);
            j++;
        }
        if (_n >= 1) {
            return k;
        }
        else {
            return 1;
        }
    }
    console.log(factorial(5));
    //  Aufgabe 5 f)
    function leapyears() {
        let jahr = 1900;
        for (let index = 0; index < 121; index++) {
            if (jahr % 4 == 0 && jahr % 100 != 0) {
                console.log(jahr);
            }
            jahr++;
        }
    }
    leapyears();
})(Aufgabe2_5 || (Aufgabe2_5 = {}));
var Aufgabe2_6;
(function (Aufgabe2_6) {
    // Aufgabe 6 a)
    let zeichen = ["#", "##", "###", "####", "#####", "######", "#######"];
    for (let index = 0; index < zeichen.length; index++) {
        console.log(zeichen[index]);
    }
    //  Aufgabe 6 b)
    for (let i = 0; i < 101; i++) {
        if (i % 3 == 0) {
            console.log("Fizz");
        }
        else if (i % 5 == 0) {
            console.log("Buzz");
        }
        else {
            console.log(i);
        }
    }
    //  Aufgabe 6 c)
    for (let i = 0; i < 101; i++) {
        if (i % 15 == 0) {
            console.log("Fizzbuzz");
        }
        else if (i % 3 == 0 && i % 5 !== 0) {
            console.log("Fizz");
        }
        else if (i % 5 == 0 && i % 3 !== 0) {
            console.log("Buzz");
        }
        else {
            console.log(i);
        }
    }
    //  Aufgabe 6 d), e)
    function schach(_hoehe, _breite) {
        let x = "";
        for (let i = 0; i < _hoehe; i++) {
            for (let j = 0; j < (_breite / 2); j++) {
                if (i % 2 == 0) {
                    x += " #";
                }
                else {
                    x += "# ";
                }
            }
            x += "\n";
        }
        return (x);
    }
    console.log(schach(8, 8));
})(Aufgabe2_6 || (Aufgabe2_6 = {}));
//# sourceMappingURL=script.js.map