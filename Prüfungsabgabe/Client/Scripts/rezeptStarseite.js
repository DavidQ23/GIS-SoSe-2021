"use strict";
var Rezepte;
(function (Rezepte) {
    let allRecipes = document.getElementById("recipelist");
    if (document.querySelector("title").getAttribute("id") == "allRecipes") {
        window.onload = async function buildSite() {
            let url = "https://davidqgissose2021.herokuapp.com/buildsite";
            console.log(url);
            let response = await fetch(url);
            let answer = await response.text();
            console.log(answer);
            let everyRecipe = JSON.parse(answer);
            for (let i = 0; i < everyRecipe.length; i++) {
                let spaceforsinglerecipe = document.createElement("div");
                let spaceforingradiants = document.createElement("div");
                let spaceforinstruction = document.createElement("div");
                let spaceforfavouriteButton = document.createElement("div");
                let title = document.createElement("p");
                title.innerHTML = everyRecipe[i].title;
                title.classList.add("headline");
                spaceforsinglerecipe.appendChild(title);
                let ingradiantheader = document.createElement("p");
                ingradiantheader.innerHTML = "Zutaten:";
                spaceforingradiants.appendChild(ingradiantheader);
                let ingradiant1 = document.createElement("p");
                if (everyRecipe[i].ingradiant1 != undefined) {
                    ingradiant1.innerHTML = everyRecipe[i].ingradiant1;
                    spaceforingradiants.appendChild(ingradiant1);
                }
                let ingradiant2 = document.createElement("p");
                if (everyRecipe[i].ingradiant2 != undefined) {
                    ingradiant2.innerHTML = everyRecipe[i].ingradiant2;
                    spaceforingradiants.appendChild(ingradiant2);
                }
                let ingradiant3 = document.createElement("p");
                if (everyRecipe[i].ingradiant3 != undefined) {
                    ingradiant3.innerHTML = everyRecipe[i].ingradiant3;
                    spaceforingradiants.appendChild(ingradiant3);
                }
                let ingradiant4 = document.createElement("p");
                if (everyRecipe[i].ingradiant4 != undefined) {
                    ingradiant4.innerHTML = everyRecipe[i].ingradiant4;
                    spaceforingradiants.appendChild(ingradiant4);
                }
                let ingradiant5 = document.createElement("p");
                if (everyRecipe[i].ingradiant5 != undefined) {
                    ingradiant5.innerHTML = everyRecipe[i].ingradiant5;
                    spaceforingradiants.appendChild(ingradiant5);
                }
                let ingradiant6 = document.createElement("p");
                if (everyRecipe[i].ingradiant6 != undefined) {
                    ingradiant6.innerHTML = everyRecipe[i].ingradiant6;
                    spaceforingradiants.appendChild(ingradiant6);
                }
                let ingradiant7 = document.createElement("p");
                if (everyRecipe[i].ingradiant7 != undefined) {
                    ingradiant7.innerHTML = everyRecipe[i].ingradiant7;
                    spaceforingradiants.appendChild(ingradiant7);
                }
                let ingradiant8 = document.createElement("p");
                if (everyRecipe[i].ingradiant8 != undefined) {
                    ingradiant8.innerHTML = everyRecipe[i].ingradiant8;
                    spaceforingradiants.appendChild(ingradiant8);
                }
                let ingradiant9 = document.createElement("p");
                if (everyRecipe[i].ingradiant9 != undefined) {
                    ingradiant9.innerHTML = everyRecipe[i].ingradiant9;
                    spaceforingradiants.appendChild(ingradiant9);
                }
                let ingradiant10 = document.createElement("p");
                if (everyRecipe[i].ingradiant10 != undefined) {
                    ingradiant10.innerHTML = everyRecipe[i].ingradiant10;
                    spaceforingradiants.appendChild(ingradiant10);
                }
                let instructionheader = document.createElement("p");
                instructionheader.innerHTML = "Zubereitung:";
                spaceforinstruction.appendChild(instructionheader);
                let instruction = document.createElement("p");
                instruction.innerHTML = everyRecipe[i].instruction;
                spaceforinstruction.appendChild(instruction);
                let author = document.createElement("p");
                author.innerHTML = "Erstellt von: " + everyRecipe[i].author;
                spaceforsinglerecipe.appendChild(spaceforingradiants);
                spaceforsinglerecipe.appendChild(spaceforinstruction);
                spaceforsinglerecipe.appendChild(author);
                allRecipes.appendChild(spaceforsinglerecipe);
                let addfavouriteButton = document.createElement("button");
                addfavouriteButton.innerHTML = "Favorisieren";
                spaceforfavouriteButton.appendChild(addfavouriteButton);
                allRecipes.appendChild(spaceforfavouriteButton);
                addfavouriteButton.addEventListener("click", addFavourite);
                async function addFavourite() {
                    let url = "https://davidqgissose2021.herokuapp.com/addfavourite";
                    console.log(url);
                    url = url + "?" + "title=" + everyRecipe[i];
                    let response = await fetch(url);
                    let answer = await response.text();
                    console.log(answer);
                }
            }
        };
    }
})(Rezepte || (Rezepte = {}));
//# sourceMappingURL=rezeptStarseite.js.map