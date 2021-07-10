namespace Rezepte {
    let allRecipes: HTMLDivElement = <HTMLDivElement>document.getElementById("recipelist");

    if (document.querySelector("title").getAttribute("id") == "allRecipes") {
        window.onload = async function buildSite(): Promise<void> {
            let url: string = "https://davidqgissose2021.herokuapp.com/buildsite";
            console.log(url);

            let response: Response = await fetch(url);
            let answer: string = await response.text();
            console.log(answer);

            let spaceforrecipe: HTMLDivElement = <HTMLDivElement>document.createElement("div");
            spaceforrecipe.innerHTML = answer;
            allRecipes.appendChild(spaceforrecipe);
        };
    }


}