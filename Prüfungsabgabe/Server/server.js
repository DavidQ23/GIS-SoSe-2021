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
            /* else if (url.pathname == "/login") {
                let user: User = JSON.parse(jsonString);
                let mongoResponse: string = await loginUser(mongoURL, user);
            } */
            else if (url.pathname == "/buildsite") {
                let recipeList = await loadSite(mongoURL);
                _response.write(recipeList);
            }
        }
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
        async function searchUser(_User, _user) {
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
        /* async function loginUser(params:type) {
            
        } */
        async function loadSite(_url) {
            let options = { useNewUrlParser: true, useUnifiedTopology: true };
            let mongoClient = new Mongo.MongoClient(_url, options);
            await mongoClient.connect();
            let recipeList = mongoClient.db("Recipelist").collection("Recipes");
            console.log("Database connected", recipeList != undefined);
            let cursor = recipeList.find();
            let result = await cursor.toArray();
            return result;
        }
    }
})(Rezepte = exports.Rezepte || (exports.Rezepte = {}));
//# sourceMappingURL=server.js.map