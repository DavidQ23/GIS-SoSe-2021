"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rezepte = void 0;
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
var Rezepte;
(function (Rezepte) {
    let userlist;
    let mongoURL = "mongodb+srv://Testuser:passwort@clusterdavid.066x0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    console.log("Starting server");
    let port = Number(process.env.PORT);
    if (!port)
        port = 8100;
    serverStart(port);
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
                let mongoResponse = await registrateUser(mongoURL, user);
                _response.write(mongoResponse);
            }
            else if (url.pathname == "/login") {
                let user = JSON.parse(jsonString);
                let mongoResponse = await loginUser(mongoURL, user);
                _response.write(mongoResponse);
            }
            else if (url.pathname == "/buildsite") {
                let recipeList = await loadSite(mongoURL);
                _response.write(JSON.stringify(recipeList));
            }
            /* else if (url.pathname == "/addfavourite") {
                let favouredRecipe: Recipe = JSON.parse(jsonString);
                let mongoResponse: string = await favourRecipe(mongoURL, favouredRecipe);
                _response.write(mongoResponse);
            } */
            else if (url.pathname == "/saveRecipe") {
                let recipe = JSON.parse(jsonString);
                let mongoResponse = await saveRecipe(mongoURL, recipe);
                _response.write(mongoResponse);
            }
            _response.end();
        }
        async function saveRecipe(_url, _recipe) {
            let options = { useNewUrlParser: true, useUnifiedTopology: true };
            let mongoClient = new Mongo.MongoClient(_url, options);
            await mongoClient.connect();
            let recipeList = mongoClient.db("Recipesite").collection("Recipes");
            console.log("Database connected", recipeList != undefined);
            recipeList.insertOne(_recipe);
            let serverResponse = "Rezept wurde erstellt.";
            return serverResponse;
        }
        async function loginUser(_url, _user) {
            let options = { useNewUrlParser: true, useUnifiedTopology: true };
            let mongoClient = new Mongo.MongoClient(_url, options);
            await mongoClient.connect();
            userlist = mongoClient.db("Recipesite").collection("User");
            console.log("Database connected", userlist != undefined);
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
        /* async function favourRecipe(_url: string, _recipe: Recipe): Promise<string> {
            let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };
            let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
            await mongoClient.connect();
            let recipeList: Mongo.Collection = mongoClient.db("Recipesite").collection("Recipes");
            console.log("Database connected", recipeList != undefined);

        } */
        async function registrateUser(_url, _user) {
            let options = { useNewUrlParser: true, useUnifiedTopology: true };
            let mongoClient = new Mongo.MongoClient(_url, options);
            await mongoClient.connect();
            userlist = mongoClient.db("Recipesite").collection("User"); //neue Collection in Variable
            console.log("Database connected", userlist != undefined);
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
        async function loadSite(_url) {
            let options = { useNewUrlParser: true, useUnifiedTopology: true };
            let mongoClient = new Mongo.MongoClient(_url, options);
            await mongoClient.connect();
            let recipeList = mongoClient.db("Recipesite").collection("Recipes");
            console.log("Database connected", recipeList != undefined);
            let cursor = recipeList.find();
            let result = await cursor.toArray();
            return result;
        }
    }
})(Rezepte = exports.Rezepte || (exports.Rezepte = {}));
//# sourceMappingURL=server.js.map