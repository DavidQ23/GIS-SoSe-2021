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

    }

    export interface User {
        username: string;
        password: string;
    }


    let userlist: Mongo.Collection;
    let mongoURL: string = "mongodb+srv://Testuser:passwort@clusterdavid.066x0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

    console.log("Starting server");
    let port: number = Number(process.env.PORT);
    if (!port)
        port = 8100;

    serverStart(port);


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
                let mongoResponse: string = await registrateUser(mongoURL, user);
                _response.write(mongoResponse);
            }
            else if (url.pathname == "/login") {
                let user: User = JSON.parse(jsonString);
                let mongoResponse: string = await loginUser(mongoURL, user);
                _response.write(mongoResponse);
            }

            else if (url.pathname == "/buildsite") {
                let recipeList: Recipe[] = await loadSite(mongoURL);
                _response.write(JSON.stringify(recipeList));
            }
            else if (url.pathname == "/addfavourite") {
                let favouredRecipe: Recipe = JSON.parse(jsonString);
                let mongoResponse: string = await favourRecipe(mongoURL, favouredRecipe);
                _response.write(mongoResponse);
            }
            else if (url.pathname == "/saveRecipe") {
                let recipe: Recipe = JSON.parse(jsonString);
                let mongoResponse: string = await saveRecipe(mongoURL, recipe);
                _response.write(mongoResponse);
            }
            else if (url.pathname == "/myRecipeSite") {
                let recipe: Recipe = JSON.parse(jsonString);
                let recipeList: Recipe[] = await loadmyRecipesite(mongoURL, recipe);
                _response.write(JSON.stringify(recipeList));
            }
            _response.end();

        }

        async function loadmyRecipesite(_url: string, _recipe: Recipe): Promise<Recipe[]> {
            let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };
            let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
            await mongoClient.connect();
            let recipeList: Mongo.Collection = mongoClient.db("Recipesite").collection("Recipes");
            console.log("Database connected", recipeList != undefined);
            let loggedUser: string = _recipe.author;
            let cursor: Mongo.Cursor = recipeList.find({ author: loggedUser });
            let result: Recipe[] = await cursor.toArray();
            return result;
        }



        async function saveRecipe(_url: string, _recipe: Recipe): Promise<string> {
            let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };
            let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
            await mongoClient.connect();
            let recipeList: Mongo.Collection = mongoClient.db("Recipesite").collection("Recipes");
            console.log("Database connected", recipeList != undefined);
            recipeList.insertOne(_recipe);
            let serverResponse: string = "Rezept wurde erstellt.";
            return serverResponse;

        }

        async function loginUser(_url: string, _user: User): Promise<string> {
            let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };
            let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
            await mongoClient.connect();

            userlist = mongoClient.db("Recipesite").collection("User");
            console.log("Database connected", userlist != undefined);

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

        async function favourRecipe(_url: string, _recipe: Recipe): Promise<string> {
            let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };
            let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
            await mongoClient.connect();
            let favList: Mongo.Collection = mongoClient.db("Recipesite").collection("favList");
            console.log("Database connected", favList != undefined);
        
            let selectedRecipe: Recipe = _recipe;
            favList.insertOne(selectedRecipe);
            let serverresponse: string = "Erfolgreich hinzugefügt!";
            return serverresponse;
            

        }


        async function registrateUser(_url: string, _user: User): Promise<string> {
            let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };
            let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
            await mongoClient.connect();
            userlist = mongoClient.db("Recipesite").collection("User");                                     //neue Collection in Variable
            console.log("Database connected", userlist != undefined);

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



        async function loadSite(_url: string): Promise<Recipe[]> {
            let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };
            let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
            await mongoClient.connect();
            let recipeList: Mongo.Collection = mongoClient.db("Recipesite").collection("Recipes");
            console.log("Database connected", recipeList != undefined);
            let cursor: Mongo.Cursor = recipeList.find();
            let result: Recipe[] = await cursor.toArray();
            return result;
        }
    }
}