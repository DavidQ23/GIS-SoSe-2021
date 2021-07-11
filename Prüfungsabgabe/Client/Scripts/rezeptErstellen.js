"use strict";
var Rezepte;
(function (Rezepte) {
    let newRecipeForm = document.getElementById("newRecipeForm");
    let allRecipe = document.getElementById("myRecipelist");
    let saveButton = document.getElementById("saveRecipe");
    saveButton.addEventListener("click", saveRecipe);
    async function saveRecipe() {
        let formData = new FormData(document.forms[0]);
        let url = "https://davidqgissose2021.herokuapp.com/saveRecipe";
        let query = new URLSearchParams(formData);
        let loggedUser = localStorage.getItem("username");
        url = url + "?" + query.toString() + "&author=" + loggedUser;
        console.log(url);
        let response = await fetch(url);
        let answer = await response.text();
        console.log(answer);
        newRecipeForm.reset();
    }
    if (document.querySelector("title").getAttribute("id") == "createRecipe") {
        window.onload = async function buildSite() {
            let loggedUser = localStorage.getItem("username");
            let url = "https://davidqgissose2021.herokuapp.com/myRecipeSite";
            url = url + "?author=" + loggedUser + "&loggedUser=" + loggedUser;
            console.log(url);
            let response = await fetch(url);
            let answer = await response.text();
            console.log(answer);
            let everyRecipe = JSON.parse(answer);
            for (let i = 0; i < everyRecipe.length; i++) {
                let spaceforsingleRecipe = document.createElement("div");
                let spaceforingradiants = document.createElement("div");
                let spaceforinstruction = document.createElement("div");
                let title = document.createElement("p");
                title.innerHTML = everyRecipe[i].title;
                title.classList.add("headline");
                spaceforsingleRecipe.appendChild(title);
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
                let deleteButton = document.createElement("button");
                deleteButton.innerHTML = "Rezept entfernen";
                deleteButton.classList.add("deleteButton");
                spaceforsingleRecipe.appendChild(spaceforingradiants);
                spaceforsingleRecipe.appendChild(spaceforinstruction);
                spaceforsingleRecipe.appendChild(author);
                spaceforsingleRecipe.appendChild(deleteButton);
                allRecipe.appendChild(spaceforsingleRecipe);
                deleteButton.addEventListener("click", deleteRecipe);
                async function deleteRecipe() {
                    let loggedUser = localStorage.getItem("username");
                    let url = "https://davidqgissose2021.herokuapp.com/deleteRecipe";
                    url = url + "?" + "title=" + everyRecipe[i].title + "&ingradiant1=" + everyRecipe[i].ingradiant1 + "&ingradiant2=" + everyRecipe[i].ingradiant2 + "&ingradiant3=" + everyRecipe[i].ingradiant3 + "&ingradiant4=" + everyRecipe[i].ingradiant4 + "&ingradiant5=" + everyRecipe[i].ingradiant5 + "&ingradiant6=" + everyRecipe[i].ingradiant6 + "&ingradiant7=" + everyRecipe[i].ingradiant7 + "&ingradiant8=" + everyRecipe[i].ingradiant8 + "&ingradiant9=" + everyRecipe[i].ingradiant9 + "&ingradiant10=" + everyRecipe[i].ingradiant10 + "&instruction=" + everyRecipe[i].instruction + "&author=" + everyRecipe[i].author + "&loggedUser=" + loggedUser;
                    let response = await fetch(url);
                    let answer = await response.text();
                    console.log(answer);
                }
            }
        };
    }
})(Rezepte || (Rezepte = {}));
//# sourceMappingURL=rezeptErstellen.js.map