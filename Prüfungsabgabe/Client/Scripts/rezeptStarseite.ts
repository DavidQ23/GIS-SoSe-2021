namespace Rezepte {

    interface Recipe {
        title: string;
        ingrediant1: string;
        ingrediant2: string;
        ingrediant3: string;
        ingrediant4: string;
        ingrediant5: string;
        ingrediant6: string;
        ingrediant7: string;
        ingrediant8: string;
        ingrediant9: string;
        ingrediant10: string;
        instruction: string;
    }

    let allRecipes: HTMLDivElement = <HTMLDivElement>document.getElementById("recipelist");


    if (document.querySelector("title").getAttribute("id") == "allRecipes") {
        window.onload = async function buildSite(): Promise<void> {
            let url: string = "https://davidqgissose2021.herokuapp.com/buildsite";
            console.log(url);

            let response: Response = await fetch(url);
            let answer: string = await response.text();
            console.log(answer);

            let everyRecipe: Recipe[] = JSON.parse(answer);

            for (let i: number = 0; i < everyRecipe.length; i++) {
                let spaceforsinglerecipe: HTMLDivElement = <HTMLDivElement>document.createElement("div");
                let spaceforingradiants: HTMLDivElement = <HTMLDivElement>document.createElement("div");
                let spaceforinstruction: HTMLDivElement = <HTMLDivElement>document.createElement("div");
                let spaceforfavouriteButton: HTMLDivElement = <HTMLDivElement>document.createElement("div");

                let title: HTMLParagraphElement = <HTMLParagraphElement>document.createElement("p");
                title.innerHTML = everyRecipe[i].title;
                title.classList.add("headline");
                spaceforsinglerecipe.appendChild(title);

                let ingradiant1: HTMLParagraphElement = <HTMLParagraphElement>document.createElement("p");
                ingradiant1.innerHTML = everyRecipe[i].ingrediant1;
                spaceforingradiants.appendChild(ingradiant1);

                let ingradiant2: HTMLParagraphElement = <HTMLParagraphElement>document.createElement("p");
                ingradiant2.innerHTML = everyRecipe[i].ingrediant2;
                spaceforingradiants.appendChild(ingradiant2);

                let ingradiant3: HTMLParagraphElement = <HTMLParagraphElement>document.createElement("p");
                ingradiant3.innerHTML = everyRecipe[i].ingrediant3;
                spaceforingradiants.appendChild(ingradiant3);

                let ingradiant4: HTMLParagraphElement = <HTMLParagraphElement>document.createElement("p");
                ingradiant4.innerHTML = everyRecipe[i].ingrediant4;
                spaceforingradiants.appendChild(ingradiant4);

                let ingradiant5: HTMLParagraphElement = <HTMLParagraphElement>document.createElement("p");
                ingradiant5.innerHTML = everyRecipe[i].ingrediant5;
                spaceforingradiants.appendChild(ingradiant5);

                let ingradiant6: HTMLParagraphElement = <HTMLParagraphElement>document.createElement("p");
                ingradiant6.innerHTML = everyRecipe[i].ingrediant6;
                spaceforingradiants.appendChild(ingradiant6);

                let ingradiant7: HTMLParagraphElement = <HTMLParagraphElement>document.createElement("p");
                ingradiant7.innerHTML = everyRecipe[i].ingrediant7;
                spaceforingradiants.appendChild(ingradiant7);

                let ingradiant8: HTMLParagraphElement = <HTMLParagraphElement>document.createElement("p");
                ingradiant8.innerHTML = everyRecipe[i].ingrediant8;
                spaceforingradiants.appendChild(ingradiant8);

                let ingradiant9: HTMLParagraphElement = <HTMLParagraphElement>document.createElement("p");
                ingradiant9.innerHTML = everyRecipe[i].ingrediant9;
                spaceforingradiants.appendChild(ingradiant9);

                let ingradiant10: HTMLParagraphElement = <HTMLParagraphElement>document.createElement("p");
                ingradiant10.innerHTML = everyRecipe[i].ingrediant10;
                spaceforingradiants.appendChild(ingradiant10);

                let instruction: HTMLParagraphElement = <HTMLParagraphElement>document.createElement("p");
                instruction.innerHTML = everyRecipe[i].instruction;
                spaceforinstruction.appendChild(instruction);

                spaceforsinglerecipe.appendChild(spaceforingradiants);
                spaceforsinglerecipe.appendChild(instruction);
                allRecipes.appendChild(spaceforsinglerecipe);

                /* let addfavouriteButton: HTMLButtonElement = <HTMLButtonElement>document.createElement("button");
                addfavouriteButton.innerHTML = "Favorisieren";
                spaceforfavouriteButton.appendChild(addfavouriteButton);
                addfavouriteButton.addEventListener("click", addFavourite); */
            }

            /* async function addFavourite(): Promise<void> {
                let url: string = "https://davidqgissose2021.herokuapp.com/addfavourite";
                console.log(url);

                let response: Response = await fetch(url);
                let answer: string = await response.text();
                console.log(answer);
            } */



        };
    }


}