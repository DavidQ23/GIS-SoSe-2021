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
        }
        async function registrateUser(_url, _user) {
            let options = { useNewUrlParser: true, useUnifiedTopology: true };
            let mongoClient = new Mongo.MongoClient(_url, options);
            await mongoClient.connect();
            userlist = mongoClient.db("Recipesite").collection("User"); //neue Collection in Variable
            console.log("Database connected", userlist != undefined);
            let response;
            if (_user.username && _user.password == "") {
                response = "Bitte alle Felder ausfüllen!";
                return response;
            }
            else {
                let cursor = userlist.find();
                let allUser = await cursor.toArray();
                for (let i = 0; i < allUser.length; i++) {
                    if (allUser[i].username == _user.username) {
                        response = "Name existiert bereits! Bitte einen neuen Namen verwenden.";
                        return response;
                    }
                }
                userlist.insertOne(_user);
                response = "Neuer Nutzer wurde angelegt.";
                return response;
            }
        }
        /* async function loginUser(params:type) {
            
        } */
    }
})(Rezepte = exports.Rezepte || (exports.Rezepte = {}));
//# sourceMappingURL=server.js.map