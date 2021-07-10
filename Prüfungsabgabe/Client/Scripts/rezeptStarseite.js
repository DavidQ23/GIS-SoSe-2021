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
            allRecipes.innerHTML = answer;
        };
    }
})(Rezepte || (Rezepte = {}));
//# sourceMappingURL=rezeptStarseite.js.map