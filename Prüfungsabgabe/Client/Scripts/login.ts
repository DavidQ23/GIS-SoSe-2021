namespace Rezepte {
    let registrationFeedback: HTMLDivElement = <HTMLDivElement>document.getElementById("registrationFeedback");
    let registrationButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("registrationButton");
    let registrationForm: HTMLFormElement = <HTMLFormElement>document.getElementById("registrationForm");
    registrationButton.addEventListener("click", registration);

    let loginForm: HTMLFormElement = <HTMLFormElement>document.getElementById("loginForm");
    let loginButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("loginButton");
    loginButton.addEventListener("click", login);
    

    async function registration(): Promise<void> {
        let formData: FormData = new FormData(document.forms[0]);                   //Auslesen der eingebenen Daten des ersten Formulars im Dokument 
        let url: string = "https://davidqgissose2021.herokuapp.com/registration";   //URL des Formulars
        let query: URLSearchParams = new URLSearchParams(<any>formData);            
        url = url + "?" + query.toString();                                         //Daten des Formulars als query
        let response: Response = await fetch(url);                                  //auf Serverantwort warten
        let answer: string = await response.text(); 
        console.log(answer);
        
        let paragraphForFeedback: HTMLParagraphElement = <HTMLParagraphElement>document.createElement("p");
        paragraphForFeedback.innerHTML = answer;
        registrationFeedback.appendChild(paragraphForFeedback);

        if (answer == "Name existiert bereits! Bitte einen neuen Namen verwenden." || answer == "Bitte alle Felder ausfüllen!") {
            registrationForm.reset();
        }
        else {
            localStorage.setItem("username", answer);
            location.href = "rezeptStartseite.html";
        }
    }

    async function login(): Promise<void> {
        let formData: FormData = new FormData(document.forms[1]);                   
        let url: string = "https://davidqgissose2021.herokuapp.com/login";                                                      
        let query: URLSearchParams = new URLSearchParams(<any>formData);            
        url = url + "?" + query.toString();                                         
        let response: Response = await fetch(url);                                  
        let answer: string = await response.text(); 
        console.log(answer);

        if (answer == "Nutzername wurde nicht gefunden." || answer == "Bitte Felder vollständig ausfüllen!") {
            loginForm.reset();
        }
        else {
            localStorage.setItem("username", answer);
            location.href = "rezeptStartseite.html";
        }
        
    }
}