import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";

export namespace Rezepte {

    export interface Recipe {
        author: string;
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
        loggedUser: string;
    }

    export interface User {
        username: string;
        password: string;
    }


    let userlist: Mongo.Collection;
    let favList: Mongo.Collection;
    let recipeList: Mongo.Collection;

    async function connectWithDB(_url: string): Promise<void> {
        let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        

        userlist = mongoClient.db("Recipesite").collection("User");
        favList = mongoClient.db("Recipesite").collection("favList");
        recipeList = mongoClient.db("Recipesite").collection("Recipes");
    }
    
    let mongoURL: string = "mongodb+srv://Testuser:passwort@clusterdavid.066x0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

    console.log("Starting server");
    let port: number = Number(process.env.PORT);
    if (!port)
        port = 8100;

    serverStart(port);
    connectWithDB(mongoURL);


    function serverStart(_port: number): void {
        let server: Http.Server = Http.createServer();
        server.addListener("request", handleRequest);
        server.addListener("listening", handleListen);
        server.listen(port);
    }

    function handleListen(): void {
        console.log("Listening");
    }

    async function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise<void> {
        console.log("I hear voices!");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");

        if (_request.url) {
            let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);     //-> assoziatives Array 
            let jsonString: string = JSON.stringify(url.query);
            console.log(jsonString);

            if (url.pathname == "/registration") {
                let user: User = JSON.parse(jsonString);                            //Json Objekt
                let mongoResponse: string = await registrateUser(user);
                _response.write(mongoResponse);
            }
            else if (url.pathname == "/login") {
                let user: User = JSON.parse(jsonString);
                let mongoResponse: string = await loginUser(user);
                _response.write(mongoResponse);
            }

            else if (url.pathname == "/buildsite") {
                let recipeList: Recipe[] = await loadSite();
                _response.write(JSON.stringify(recipeList));                    //Json in String
            }
            else if (url.pathname == "/addfavourite") {
                let favouredRecipe: Recipe = JSON.parse(jsonString);
                let mongoResponse: string = await favourRecipe(favouredRecipe);
                _response.write(mongoResponse);
            }
            else if (url.pathname == "/loadFavourites") {
                let recipe: Recipe = JSON.parse(jsonString);
                let recipeList: Recipe[] = await loadFavSite(recipe);
                _response.write(JSON.stringify(recipeList));
            }
            else if (url.pathname == "/deleteFav") {
                let recipe: Recipe = JSON.parse(jsonString);
                let mongoResponse: string = await deleteFav(recipe);
                _response.write(mongoResponse);
            }
            else if (url.pathname == "/saveRecipe") {
                let recipe: Recipe = JSON.parse(jsonString);
                let mongoResponse: string = await saveRecipe(recipe);
                _response.write(mongoResponse);
            }
            else if (url.pathname == "/myRecipeSite") {
                let recipe: Recipe = JSON.parse(jsonString);
                let recipeList: Recipe[] = await loadmyRecipesite(recipe);
                _response.write(JSON.stringify(recipeList));
            }
            else if (url.pathname == "/deleteRecipe") {
                let recipe: Recipe = JSON.parse(jsonString);
                let mongoResponse: string = await deleteRecipe(recipe);
                _response.write(mongoResponse);
            }
            _response.end();

        }

        async function deleteRecipe(_recipe: Recipe): Promise<string> {
            recipeList.deleteOne(_recipe);
            let serverResponse: string = "Rezept wurde erfolgreich gelöscht";
            return serverResponse;
        }

        async function deleteFav(_recipe: Recipe): Promise<string> {
            favList.deleteOne(_recipe);
            let serverResponse: string = "Rezept wurde aus Favoriten entfernt.";
            return serverResponse;
        }

        async function loadFavSite(_recipe: Recipe): Promise<Recipe[]> {
            let loggedUser: string = _recipe.loggedUser;
            let cursor: Mongo.Cursor = favList.find({loggedUser: loggedUser});
            let result: Recipe[] = await cursor.toArray();
            return result;

        }

        async function loadmyRecipesite(_recipe: Recipe): Promise<Recipe[]> {
            
            let loggedUser: string = _recipe.loggedUser;
            let cursor: Mongo.Cursor = recipeList.find({ loggedUser: loggedUser });
            let result: Recipe[] = await cursor.toArray();
            return result;
        }



        function saveRecipe(_recipe: Recipe): string {
            
            recipeList.insertOne(_recipe);
            let serverResponse: string = "Rezept wurde erstellt.";
            return serverResponse;

        }

        async function loginUser(_user: User): Promise<string> {

            if (_user.username != "" && _user.password != "") {
                let cursor: Mongo.Cursor = userlist.find();
                let allUser: User[] = await cursor.toArray();
                let serverresponse: string = await findUser(allUser, _user);
                return serverresponse;
            }
            else {
                let response: string = "Bitte Felder vollständig ausfüllen!";
                return response;
            }

        }

        function findUser(_allUser: User[], _user: User): string {
            let response: string;
            for (let i: number = 0; i < _allUser.length; i++) {
                if (_allUser[i].username == _user.username) {
                    response = _user.username;
                    return response;
                }
            }
            response = "Nutzername wurde nicht gefunden.";
            return response;
        }

        async function favourRecipe(_recipe: Recipe): Promise<string> {

            favList.insertOne(_recipe);
            let serverresponse: string = "Erfolgreich hinzugefügt!";
            return serverresponse;
        }


        async function registrateUser(_user: User): Promise<string> {

            if (_user.username != "" && _user.password != "") {
                let cursor: Mongo.Cursor = userlist.find();
                let allUser: User[] = await cursor.toArray();
                let serverResponse: string = await searchUser(allUser, _user);
                if (serverResponse == "Name existiert bereits! Bitte einen neuen Namen verwenden.") {
                    return serverResponse;
                }
                userlist.insertOne(_user);
                return serverResponse;
            }
            else {
                let serverResponse: string = "Bitte alle Felder ausfüllen!";
                return serverResponse;
            }

        }

        function searchUser(_User: User[], _user: User): string {
            let response: string;
            for (let i: number = 0; i < _User.length; i++) {
                if (_User[i].username == _user.username) {
                    response = "Name existiert bereits! Bitte einen neuen Namen verwenden.";
                    return response;
                }
            }
            response = _user.username;
            return response;
        }



        async function loadSite(): Promise<Recipe[]> {
        
            let cursor: Mongo.Cursor = recipeList.find();
            let result: Recipe[] = await cursor.toArray();
            return result;
        }
    }
}