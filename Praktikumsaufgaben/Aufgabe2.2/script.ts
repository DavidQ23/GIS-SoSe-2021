namespace Aufgabe22_1 {

    // Aufgabe 1 a)
    function min(...nums: number[]): void {
        let hilfsvariable: number = nums[0];

        for (let i: number = 0; i < nums.length; i++) {
            if (nums[i] < hilfsvariable)
                hilfsvariable = nums[i];
        }

        console.log(hilfsvariable);
    }

    min(4, 6, 13, 75, 54);

    // Aufgabe 1 b)

    function isEven(zahl: number): boolean {
        let endlos: boolean = true;
        while (endlos) {

            if (zahl == 0) {
                console.log(0);
                return true;
            }
            else if (zahl == 1) {
                console.log(1);
                return false;
            }
            else {
                zahl = zahl - 2;
            }
        }
        return null;


    }

    console.log(isEven(50));
    console.log(isEven(75));

    // Aufgabe c)

    // 1.
    class Student {
        name: string;
        age: number;
        matrikelnummer: number;
        constructor(_name: string, _age: number, _matrikelnummer: number) {
            this.name = _name;
            this.age = _age;
            this.matrikelnummer = _matrikelnummer;
        }

        showInfo(): void {
            console.log("Name : " + this.name);
            console.log("Alter : " + this.age);
            console.log("Matrikelnummer : " + this.matrikelnummer);
            console.log("");
        }


    }

    // 2.

    let student1: Student = new Student("Max", 20, 123456);
    let student2: Student = new Student("Lisa", 24, 123457);
    let student3: Student = new Student("Felix", 19, 123458);

    // 3.

    let studentenliste: Student[] = [student1, student2, student3];

    studentenliste.push(new Student("Lena", 34, 123459));
    console.log(studentenliste[3].age);

    // 4.

    student1.showInfo();
    student2.showInfo();
    student3.showInfo();
    studentenliste[3].showInfo();


}

namespace Aufgabe22_2 {

    // a)

    let numberlist: number[] = [1, 2, 3, 4, 5, 6];

    function backwards(_inputarray: number[]): number[] {
        let backwardsarray: number[] = new Array;
        for (let i: number = _inputarray.length - 1; i >= 0; i--) {
            backwardsarray.push(_inputarray[i]);
        }
        return (backwardsarray);
    }

    console.log(backwards(numberlist));

    // b)

    let numberlist2: number[] = [11, 12, 13];

    function join(_firstInputArray: number[], _secondInputArray: number[]): number[] {
        for (let i: number = 0; i < _secondInputArray.length; i++) {
            _firstInputArray.push(_secondInputArray[i]);
        }
        return _firstInputArray;
    }

    console.log(join(numberlist, numberlist2));

    // c)

    function split(_InputArray: number[], _stelle1: number, _stelle2: number): number[] {
        let hilfsArray: number[] = [];

        if (_stelle1 >= 0 && _stelle2 < _InputArray.length) {
            for (let i: number = _stelle1 + 1; i < _stelle2; i++) {
                hilfsArray.push(_InputArray[i]);
            }
            return hilfsArray;
        }
        else {
            console.log("Üngültig");
            return null;
        }
    }

    console.log(split(numberlist, 0, 5));
    console.log(split(numberlist2, 0, 2));
}

namespace Aufgabe22_3_Landschaft {
    let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("Landschaft");
    let context: CanvasRenderingContext2D = canvas.getContext("2d");


    //Wiese
    context.fillStyle = "green";
    context.fillRect(0, 0, 700, 500);

    //Himmel
    context.fillStyle = "lightblue";
    context.fillRect(0, 0, 700, 200);


    // Wolke
    context.beginPath();
    context.fillStyle = "white";
    context.arc(150, 100, 50, 0, Math.PI * 2);
    context.fill();

    context.beginPath();
    context.fillStyle = "white";
    context.arc(180, 80, 60, 0, Math.PI * 2);
    context.fill();

    context.beginPath();
    context.fillStyle = "white";
    context.arc(210, 100, 50, 0, Math.PI * 2);
    context.fill();

    context.beginPath();
    context.fillStyle = "white";
    context.arc(240, 70, 50, 0, Math.PI * 2);
    context.fill();

    context.beginPath();    //Wolke
    context.fillStyle = "white";
    context.arc(270, 100, 50, 0, Math.PI * 2);
    context.fill();

    //Hauswand
    context.beginPath();
    context.rect(350, 300, 100, 100);
    context.fillStyle = "grey";
    context.fill();
    context.lineWidth = 5;
    context.stroke();

    //Haustür
    context.beginPath();
    context.rect(385, 360, 30, 40);
    context.fillStyle = "brown";
    context.fill();
    context.stroke();

    //Dach
    context.beginPath();
    context.fillStyle = "red";
    context.moveTo(330, 300);
    context.lineTo(470, 300);
    context.lineTo(400, 230);
    context.closePath();
    context.lineWidth = 5;
    context.fill();
    context.stroke();

    //Baumstamm
    context.beginPath();
    context.fillStyle = "brown";
    context.fillRect(550, 220, 30, 100);

    //Baumkrone
    context.beginPath();
    context.fillStyle = "darkgreen";
    context.arc(520, 210, 40, 0, Math.PI * 2);
    context.fill();

    context.beginPath();
    context.fillStyle = "darkgreen";
    context.arc(540, 190, 50, 0, Math.PI * 2);
    context.fill();

    context.beginPath();
    context.fillStyle = "darkgreen";
    context.arc(560, 200, 40, 0, Math.PI * 2);
    context.fill();

    context.beginPath();
    context.fillStyle = "darkgreen";
    context.arc(570, 220, 30, 0, Math.PI * 2);
    context.fill();

    context.beginPath();
    context.fillStyle = "darkgreen";
    context.arc(590, 180, 45, 0, Math.PI * 2);
    context.fill();
}

namespace Aufgabe22_3_Zeichnen {
    let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("Zeichnen");
    let context: CanvasRenderingContext2D = canvas.getContext("2d");


    //Aufgabe 3 b) - e)
    class Rechteck {
        breite: number;
        hoehe: number;

        constructor() {
            this.breite = Math.floor(Math.random() * 200);
            this.hoehe = Math.floor(Math.random() * 200);
        }

        drawRect(): void {
            let breitenStart: number = this.breite;
            let hoehenStart: number = this.hoehe;
            breitenStart = Math.floor(Math.random() * 700);
            hoehenStart = Math.floor(Math.random() * 500);
            context.beginPath();
            context.fillStyle = "black";
            context.fillRect(breitenStart, hoehenStart, this.breite, this.hoehe);

        }

    }

    let rechteck1: Rechteck = new Rechteck();
    let rechteck2: Rechteck = new Rechteck();
    let rechteck3: Rechteck = new Rechteck();
    let rechteck4: Rechteck = new Rechteck();

    let rechteckListe: Rechteck[] = new Array();
    rechteckListe = [rechteck1, rechteck2, rechteck3, rechteck4];

    rechteckListe[0].drawRect();
    rechteckListe[1].drawRect();
    rechteckListe[2].drawRect();
    rechteckListe[3].drawRect();

}
