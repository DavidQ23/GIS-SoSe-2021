namespace Rezepte {

    interface Recipe {
        title: string;
        ingradiant1: string;
        ingradiant2: string;
        ingradiant3: string;
        ingradiant4: string;
        ingradiant5: string;
        ingradiant6: string;
        ingradiant7: string;
        ingradiant8: string;
        ingradiant9: string;
        ingradiant10: string;
        instruction: string;
        author: string;
        loggedUser: string;
    }

    let recipeList: HTMLDivElement = <HTMLDivElement>document.getElementById("savedRecipelist");
    
    if (document.querySelector("title").getAttribute("id") == "favouriteRecipes") {
        window.onload = async function loadingSite (): Promise<void> {
            
            let loggedUser: string = localStorage.getItem("username");
            let url: string = "https://davidqgissose2021.herokuapp.com/loadFavourites";
            url = url + "?loggedUser=" + loggedUser;
            console.log(url);

            let response: Response = await fetch(url);
            let answer: string = await response.text();
            console.log(answer);

            let everyRecipe: Recipe[] = JSON.parse(answer);

            for (let i: number = 0; i < everyRecipe.length; i++) {
                let spaceforsinglerecipe: HTMLDivElement = <HTMLDivElement>document.createElement("div");
                let spaceforingradiants: HTMLDivElement = <HTMLDivElement>document.createElement("div");
                let spaceforinstruction: HTMLDivElement = <HTMLDivElement>document.createElement("div");
                

                let title: HTMLParagraphElement = <HTMLParagraphElement>document.createElement("p");
                title.innerHTML = everyRecipe[i].title;
                title.classList.add("headline");
                spaceforsinglerecipe.appendChild(title);

                let ingradiantheader: HTMLParagraphElement = <HTMLParagraphElement>document.createElement("p");
                ingradiantheader.innerHTML = "Zutaten:";
                spaceforingradiants.appendChild(ingradiantheader);

                let ingradiant1: HTMLParagraphElement = <HTMLParagraphElement>document.createElement("p");
                if (everyRecipe[i].ingradiant1 != undefined) {
                    ingradiant1.innerHTML = everyRecipe[i].ingradiant1;
                    spaceforingradiants.appendChild(ingradiant1);
                }

                let ingradiant2: HTMLParagraphElement = <HTMLParagraphElement>document.createElement("p");
                if (everyRecipe[i].ingradiant2 != undefined) {
                    ingradiant2.innerHTML = everyRecipe[i].ingradiant2;
                    spaceforingradiants.appendChild(ingradiant2);
                }

                let ingradiant3: HTMLParagraphElement = <HTMLParagraphElement>document.createElement("p");
                if (everyRecipe[i].ingradiant3 != undefined) {
                    ingradiant3.innerHTML = everyRecipe[i].ingradiant3;
                    spaceforingradiants.appendChild(ingradiant3);
                }

                let ingradiant4: HTMLParagraphElement = <HTMLParagraphElement>document.createElement("p");
                if (everyRecipe[i].ingradiant4 != undefined) {
                    ingradiant4.innerHTML = everyRecipe[i].ingradiant4;
                    spaceforingradiants.appendChild(ingradiant4);
                }

                let ingradiant5: HTMLParagraphElement = <HTMLParagraphElement>document.createElement("p");
                if (everyRecipe[i].ingradiant5 != undefined) {
                    ingradiant5.innerHTML = everyRecipe[i].ingradiant5;
                    spaceforingradiants.appendChild(ingradiant5);
                }

                let ingradiant6: HTMLParagraphElement = <HTMLParagraphElement>document.createElement("p");
                if (everyRecipe[i].ingradiant6 != undefined) {
                    ingradiant6.innerHTML = everyRecipe[i].ingradiant6;
                    spaceforingradiants.appendChild(ingradiant6);
                }

                let ingradiant7: HTMLParagraphElement = <HTMLParagraphElement>document.createElement("p");
                if (everyRecipe[i].ingradiant7 != undefined) {
                    ingradiant7.innerHTML = everyRecipe[i].ingradiant7;
                    spaceforingradiants.appendChild(ingradiant7);
                }

                let ingradiant8: HTMLParagraphElement = <HTMLParagraphElement>document.createElement("p");
                if (everyRecipe[i].ingradiant8 != undefined) {
                    ingradiant8.innerHTML = everyRecipe[i].ingradiant8;
                    spaceforingradiants.appendChild(ingradiant8);
                }

                let ingradiant9: HTMLParagraphElement = <HTMLParagraphElement>document.createElement("p");
                if (everyRecipe[i].ingradiant9 != undefined) {
                    ingradiant9.innerHTML = everyRecipe[i].ingradiant9;
                    spaceforingradiants.appendChild(ingradiant9);
                }

                let ingradiant10: HTMLParagraphElement = <HTMLParagraphElement>document.createElement("p");
                if (everyRecipe[i].ingradiant10 != undefined) {
                    ingradiant10.innerHTML = everyRecipe[i].ingradiant10;
                    spaceforingradiants.appendChild(ingradiant10);
                }

                let instructionheader: HTMLParagraphElement = <HTMLParagraphElement>document.createElement("p");
                instructionheader.innerHTML = "Zubereitung:";
                spaceforinstruction.appendChild(instructionheader);
                let instruction: HTMLParagraphElement = <HTMLParagraphElement>document.createElement("p");
                instruction.innerHTML = everyRecipe[i].instruction;
                spaceforinstruction.appendChild(instruction);

                let author: HTMLParagraphElement = <HTMLParagraphElement>document.createElement("p");
                author.innerHTML = "Erstellt von: " + everyRecipe[i].author;

                
                spaceforsinglerecipe.appendChild(spaceforingradiants);
                spaceforsinglerecipe.appendChild(spaceforinstruction);
                spaceforsinglerecipe.appendChild(author);
                recipeList.appendChild(spaceforsinglerecipe);
            }
        };
    }
}