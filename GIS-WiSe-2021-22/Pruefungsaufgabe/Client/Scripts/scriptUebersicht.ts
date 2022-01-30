namespace Gefrierschrank {

    interface Gefriergut {
        name: string;
        ablaufdatum: Date;
        kategorie: string;
        notiz: string;
        
    }

    let displayListe: HTMLElement = <HTMLElement>document.getElementById("displayListe");
    let inhaltstabelle: HTMLDivElement = <HTMLDivElement>document.getElementById("inhaltstabelle");
    let detailLink: HTMLAnchorElement = <HTMLAnchorElement>document.createElement("a");
    detailLink.setAttribute("href", "detail.html");


    window.onload = async function buildSite(): Promise<void> {
        let url: string = "https://davidqgissose2021.herokuapp.com/buildSite";
        console.log(url);

        let response: Response = await fetch(url);
        let answer: string = await response.text();
        console.log(answer);

        let alleGefriergueter: Gefriergut[] = JSON.parse(answer);

        for (let i: number = 1; i < alleGefriergueter.length; i++) {
            let tabellenzeile: HTMLTableRowElement = <HTMLTableRowElement>document.createElement("tr");
            tabellenzeile.classList.add("tabellenzeile");
                    
            let nameTabelle: HTMLTableCellElement = <HTMLTableCellElement>document.createElement("td");
            nameTabelle.classList.add("nameTabelle");
            nameTabelle.innerHTML = alleGefriergueter[i].name;
            tabellenzeile.appendChild(nameTabelle);

            let ablaufTabelle: HTMLTableCellElement = <HTMLTableCellElement>document.createElement("td");
            ablaufTabelle.classList.add("ablaufTabelle");
            let datumAusgabe: Date = alleGefriergueter[i].ablaufdatum;
            ablaufTabelle.innerHTML = datumAusgabe.toLocaleString();
            tabellenzeile.appendChild(ablaufTabelle);

            let detailTabelle: HTMLTableCellElement = <HTMLTableCellElement>document.createElement("td");
            detailTabelle.classList.add("detailTabelle");
            detailTabelle.appendChild(detailLink);


            
        }

        
       

    };
}