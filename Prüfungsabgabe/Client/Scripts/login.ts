namespace Rezepte {
    let registrationFeedback: HTMLDivElement = <HTMLDivElement>document.getElementById("registrationFeedback");
    let registrationButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("registrationButton");
    registrationButton.addEventListener("click", registration);

    async function registration(): Promise<void> {
        let formData: FormData = new FormData(document.forms[0]);                   // Auslesen der eingebenen Daten des ersten Formulars im Dokument 
        let url: string = "https://davidqgissose2021.herokuapp.com/registration";                                                       //URL des Formulars
        let query: URLSearchParams = new URLSearchParams(<any>formData);            
        url = url + "?" + query.toString();                                         //Daten des Formulars als query
        let response: Response = await fetch(url);                                  //auf Serverantwort warten
        let answer: string = await response.text(); 
        console.log(answer);
        let paragraphForFeedback: HTMLParagraphElement = <HTMLParagraphElement>document.createElement("p");
        paragraphForFeedback.innerHTML = answer;
        registrationFeedback.appendChild(paragraphForFeedback);
    }

    /* async function login(): Promise<void> {
        let formData: FormData = new FormData(document.forms[0]);                   
        let url: string = "https://davidqgissose2021.herokuapp.com/login";                                                      
        let query: URLSearchParams = new URLSearchParams(<any>formData);            
        url = url + "?" + query.toString();                                         
        let response: Response = await fetch(url);                                  
        let answer: string = await response.text(); 
        console.log(answer);
    } */
}