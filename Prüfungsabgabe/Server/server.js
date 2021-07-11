"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rezepte = void 0;
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
var Rezepte;
(function (Rezepte) {
    let userlist;
    let favList;
    let recipeList;
    async function connectWithDB(_url) {
        let options = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        userlist = mongoClient.db("Recipesite").collection("User");
        favList = mongoClient.db("Recipesite").collection("favList");
        recipeList = mongoClient.db("Recipesite").collection("Recipes");
    }
    let mongoURL = "mongodb+srv://Testuser:passwort@clusterdavid.066x0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    console.log("Starting server");
    let port = Number(process.env.PORT);
    if (!port)
        port = 8100;
    serverStart(port);
    connectWithDB(mongoURL);
    function serverStart(_port) {
        let server = Http.createServer();
        server.addListener("request", handleRequest);
        server.addListener("listening", handleListen);
        server.listen(port);
    }
    function handleListen() {
        console.log("Listening");
    }
    async function handleRequest(_request, _response) {
        console.log("I hear voices!");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        if (_request.url) {
            let url = Url.parse(_request.url, true); //-> assoziatives Array 
            let jsonString = JSON.stringify(url.query);
            console.log(jsonString);
            if (url.pathname == "/registration") {
                let user = JSON.parse(jsonString); //Json Objekt
                let mongoResponse = await registrateUser(user);
                _response.write(mongoResponse);
            }
            else if (url.pathname == "/login") {
                let user = JSON.parse(jsonString);
                let mongoResponse = await loginUser(user);
                _response.write(mongoResponse);
            }
            else if (url.pathname == "/buildsite") {
                let recipeList = await loadSite();
                _response.write(JSON.stringify(recipeList)); //Json in String
            }
            else if (url.pathname == "/addfavourite") {
                let favouredRecipe = JSON.parse(jsonString);
                let mongoResponse = await favourRecipe(favouredRecipe);
                _response.write(mongoResponse);
            }
            else if (url.pathname == "/loadFavourites") {
                let recipe = JSON.parse(jsonString);
                let recipeList = await loadFavSite(recipe);
                _response.write(JSON.stringify(recipeList));
            }
            else if (url.pathname == "/deleteFav") {
                let recipe = JSON.parse(jsonString);
                let mongoResponse = await deleteFav(recipe);
                _response.write(mongoResponse);
            }
            else if (url.pathname == "/saveRecipe") {
                let recipe = JSON.parse(jsonString);
                let mongoResponse = await saveRecipe(recipe);
                _response.write(mongoResponse);
            }
            else if (url.pathname == "/myRecipeSite") {
                let recipe = JSON.parse(jsonString);
                let recipeList = await loadmyRecipesite(recipe);
                _response.write(JSON.stringify(recipeList));
            }
            else if (url.pathname == "/deleteRecipe") {
                let recipe = JSON.parse(jsonString);
                let mongoResponse = await deleteRecipe(recipe);
                _response.write(mongoResponse);
            }
            _response.end();
        }
        async function deleteRecipe(_recipe) {
            recipeList.deleteOne(_recipe);
            let serverResponse = "Rezept wurde erfolgreich gelöscht";
            return serverResponse;
        }
        async function deleteFav(_recipe) {
            favList.deleteOne(_recipe);
            let serverResponse = "Rezept wurde aus Favoriten entfernt.";
            return serverResponse;
        }
        async function loadFavSite(_recipe) {
            let loggedUser = _recipe.loggedUser;
            let cursor = favList.find({ loggedUser: loggedUser });
            let result = await cursor.toArray();
            return result;
        }
        async function loadmyRecipesite(_recipe) {
            let loggedUser = _recipe.loggedUser;
            let cursor = recipeList.find({ author: loggedUser });
            let result = await cursor.toArray();
            return result;
        }
        function saveRecipe(_recipe) {
            recipeList.insertOne(_recipe);
            let serverResponse = "Rezept wurde erstellt.";
            return serverResponse;
        }
        async function loginUser(_user) {
            if (_user.username != "" && _user.password != "") {
                let cursor = userlist.find();
                let allUser = await cursor.toArray();
                let serverresponse = await findUser(allUser, _user);
                return serverresponse;
            }
            else {
                let response = "Bitte Felder vollständig ausfüllen!";
                return response;
            }
        }
        function findUser(_allUser, _user) {
            let response;
            for (let i = 0; i < _allUser.length; i++) {
                if (_allUser[i].username == _user.username) {
                    response = _user.username;
                    return response;
                }
            }
            response = "Nutzername wurde nicht gefunden.";
            return response;
        }
        async function favourRecipe(_recipe) {
            favList.insertOne(_recipe);
            let serverresponse = "Erfolgreich hinzugefügt!";
            return serverresponse;
        }
        async function registrateUser(_user) {
            if (_user.username != "" && _user.password != "") {
                let cursor = userlist.find();
                let allUser = await cursor.toArray();
                let serverResponse = await searchUser(allUser, _user);
                if (serverResponse == "Name existiert bereits! Bitte einen neuen Namen verwenden.") {
                    return serverResponse;
                }
                userlist.insertOne(_user);
                return serverResponse;
            }
            else {
                let serverResponse = "Bitte alle Felder ausfüllen!";
                return serverResponse;
            }
        }
        function searchUser(_User, _user) {
            let response;
            for (let i = 0; i < _User.length; i++) {
                if (_User[i].username == _user.username) {
                    response = "Name existiert bereits! Bitte einen neuen Namen verwenden.";
                    return response;
                }
            }
            response = _user.username;
            return response;
        }
        async function loadSite() {
            let cursor = recipeList.find();
            let result = await cursor.toArray();
            return result;
        }
    }
})(Rezepte = exports.Rezepte || (exports.Rezepte = {}));
//# sourceMappingURL=server.js.map