"use strict";
var Rezepte;
(function (Rezepte) {
    /* let newRecipe: HTMLDivElement = <HTMLTableDataCellElement>document.getElementById("newRecipe");
   let newRecipeForm: HTMLFormElement = <HTMLFormElement>document.getElementById("newRecipeForm");
   let singleRecipe: HTMLDivElement = <HTMLDivElement>document.getElementById("singleRecipe"); */
    let saveButton = document.getElementById("saveRecipe");
    saveButton.addEventListener("click", saveRecipe);
    async function saveRecipe() {
        let formData = new FormData(document.forms[0]);
        let url = "https://davidqgissose2021.herokuapp.com/saveRecipe";
        let query = new URLSearchParams(formData);
        let loggedUser = localStorage.getItem("username");
        url = url + "?" + query.toString() + "&author=" + loggedUser;
        let response = await fetch(url);
        let answer = await response.text();
        console.log(answer);
    }
    /* if (document.querySelector("title").getAttribute("id") == "createRecipe") {

    } */
})(Rezepte || (Rezepte = {}));
//# sourceMappingURL=rezeptErstellen.js.map