namespace Gefrierschrank {

    let heutigesDatum: number = Date.now();
    let datumString: string = heutigesDatum.toString();

    //Zugriff auf Form Elemente
    let newGefriergutForm: HTMLFormElement = <HTMLFormElement>document.getElementById("newGefriergut");
    let saveButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("saveButton");
    saveButton.addEventListener("click", saveGefriergut);

    async function saveGefriergut(): Promise<void> {
        let formData: FormData = new FormData(document.forms[0]);
        let url: string = "http://127.0.0.1:5500/GIS-WiSe-2021-22/Pruefungsaufgabe/Client/HTML/anlegen.html/saveGefriergut";
        let query: URLSearchParams = new URLSearchParams(<any>formData);

        //Eingaben an die URL zur Weiterverarbeitung anhängen
        url = url + "?" + query.toString() + "&anlegdatum=" + datumString + "&menge=1"; 
        console.log(url);

        let response: Response = await fetch(url);
        let answer: string = await response.text();
        console.log(answer);
        newGefriergutForm.reset();
        window.location.reload();
    }
}