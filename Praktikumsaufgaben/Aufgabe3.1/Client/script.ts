namespace P_3_1Server {
    async function handleRequest(): Promise<void> {
        let formData: FormData = new FormData(document.forms[0]);   // Auslesen der eingebenen Daten des ersten Formulars im Dokument
        let url: string = "https://davidqgissose2021.herokuapp.com/";
        let query: URLSearchParams = new URLSearchParams(<any>formData); //Vorliegende Daten aus dem Formular werden aus einem FormData-Objekt generiert
        url = url + "?" + query.toString();                         //query String wird an URL hinten angehängt
        console.log(url);                                           //URL wird in Kosole ausgegeben

        for (let entry of formData) {                               //Konsolenausgabe der Key-Value-Paare des Formulars
            console.log(entry);
            console.log("name: " + entry[0]);
            console.log("value: " + entry[1]);
        }

        let response: Response = await fetch(url);                  //Auf die URL warten zum Abschicken zum Server
        let answer: string = await response.text();                 //Warten auf Antwort des Servers in Form eines Strings
        console.log(answer);                                        //Konsolenausgabe der Serverantwort

    }
    let button: HTMLButtonElement = <HTMLButtonElement>document.getElementById("SubmitButton");
    button.addEventListener("click", handleRequest);
}