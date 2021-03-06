namespace Aufgabe3_4 {

    let button1: HTMLButtonElement = <HTMLButtonElement>document.getElementById("SaveInDB");
    button1.addEventListener("click", SaveInDB);
    let button2: HTMLButtonElement = <HTMLButtonElement>document.getElementById("DataFromDB");
    button2.addEventListener("click", ServerResponse);
    let serverausgabe: HTMLDivElement = <HTMLDivElement>document.getElementById("Serverantwort");


    async function SaveInDB(): Promise<void> {
        let formData: FormData = new FormData(document.forms[0]);   // Auslesen der eingebenen Daten des ersten Formulars im Dokument

        let url: string = "https://davidqgissose2021.herokuapp.com/saveData";
        let query: URLSearchParams = new URLSearchParams(<any>formData); 
        url = url + "?" + query.toString();                         
        console.log(url); 
        let response: Response = await fetch(url);
        let answer: string = await response.text(); 
        console.log(answer);
    }

    async function ServerResponse(): Promise<void> {
        let formData: FormData = new FormData(document.forms[0]);   // Auslesen der eingebenen Daten des ersten Formulars im Dokument

        let url: string = "https://davidqgissose2021.herokuapp.com/printData";
        let query: URLSearchParams = new URLSearchParams(<any>formData); 
        url = url + "?" + query.toString();                         
        console.log(url);                                           

        let response: Response = await fetch(url);                  
        let answer: string = await response.text();                 
        console.log(answer);

       
        serverausgabe.innerHTML = answer;
    }
}