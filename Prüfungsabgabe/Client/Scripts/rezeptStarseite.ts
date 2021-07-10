namespace Rezepte {
    export interface Recipe {
        title: string;
        ingrediants: string;
        instruction: string;
    }
    let recipelist: HTMLDivElement = <HTMLDivElement>document.getElementById("recipelist");

}    