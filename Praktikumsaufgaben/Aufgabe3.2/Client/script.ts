namespace P_3_2 {
    interface FormulaData {
        vorname: string;
        nachname: string;
        straße: string;
        straßennummer: number;
    }

    let button1: HTMLButtonElement = <HTMLButtonElement>document.getElementById("SubmitButtonHtml");
    button1.addEventListener("click", sendDataHtml);
    let button2: HTMLButtonElement = <HTMLButtonElement>document.getElementById("SubmitButtonJson");
    button2.addEventListener("click", sendDataJson);
    let serverausgabe: HTMLDivElement = <HTMLDivElement>document.getElementById("serverausgabe");

    
    async function sendDataHtml(): Promise<void> {


        let formData: FormData = new FormData(document.forms[0]);   // Auslesen der eingebenen Daten des ersten Formulars im Dokument

        /* for (let entry of formData) {                               //Konsolenausgabe der Key-Value-Paare des Formulars
            console.log(entry);
            console.log("name: " + entry[0]);
            console.log("value: " + entry[1]);
        } */

        let url: string = "https://davidqgissose2021.herokuapp.com/html";
        let query: URLSearchParams = new URLSearchParams(<any>formData); //Vorliegende Daten aus dem Formular werden aus einem FormData-Objekt generiert
        url = url + "?" + query.toString();                         //query String wird an URL hinten angehängt
        console.log(url);                                           //URL wird in Kosole ausgegeben



        let response: Response = await fetch(url);                  //Auf die URL warten zum Abschicken zum Server
        let answer: string = await response.text();                 //Warten auf Antwort des Servers in Form eines Strings
        serverausgabe.innerHTML = answer;

    }
    async function sendDataJson(): Promise<void> {
        let formData: FormData = new FormData(document.forms[0]);   // Auslesen der eingebenen Daten des ersten Formulars im Dokument

        let url: string = "https://davidqgissose2021.herokuapp.com/json";
        let query: URLSearchParams = new URLSearchParams(<any>formData); //Vorliegende Daten aus dem Formular werden aus einem FormData-Objekt generiert
        url = url + "?" + query.toString();                         //query String wird an URL hinten angehängt
        console.log(url);                                           //URL wird in Kosole ausgegeben



        let response: Response = await fetch(url);                  //Auf die URL warten zum Abschicken zum Server
        let answer: FormulaData = await response.json();            //Warten auf Antwort des Servers in Form eines Strings
        console.log(answer);

        //serverausgabe.innerHTML = JSON.stringify(answer);
    }

    
}