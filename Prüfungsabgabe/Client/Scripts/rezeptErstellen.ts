namespace Rezepte {
     /* let newRecipe: HTMLDivElement = <HTMLTableDataCellElement>document.getElementById("newRecipe");
    let newRecipeForm: HTMLFormElement = <HTMLFormElement>document.getElementById("newRecipeForm");
    let singleRecipe: HTMLDivElement = <HTMLDivElement>document.getElementById("singleRecipe"); */
    let saveButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("saveRecipe");
    saveButton.addEventListener("click", saveRecipe);

    async function saveRecipe(): Promise<void> {
        let formData: FormData = new FormData(document.forms[0]);                   
        let url: string = "https://davidqgissose2021.herokuapp.com/saveRecipe";   
        let query: URLSearchParams = new URLSearchParams(<any>formData);  
        let loggedUser: string = localStorage.getItem("username");          
        url = url + "?" + query.toString() + "&author=" + loggedUser;                                         
        
        let response: Response = await fetch(url);                                  
        let answer: string = await response.text(); 
        console.log(answer);
    }
    /* if (document.querySelector("title").getAttribute("id") == "createRecipe") {

    } */
}