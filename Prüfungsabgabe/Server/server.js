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
        _response.setHeader("content-type", "application/json; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        if (_request.url) {
            let url = Url.parse(_request.url, true); //-> assoziatives Array 
            let jsonString = JSON.stringify(url.query);
            console.log(jsonString);
            let user = JSON.parse(jsonString); //Json Objekt
            let mongoResponse = await registrateUser(mongoURL, user);
            _response.write(mongoResponse);
        }
        async function registrateUser(_url, _user) {
            let options = { useNewUrlParser: true, useUnifiedTopology: true };
            let mongoClient = new Mongo.MongoClient(_url, options);
            await mongoClient.connect();
            userlist = mongoClient.db("Recipesite").collection("User"); //neue Collection in Variable
            console.log("Database connected", userlist != undefined);
            let response;
            let cursor = userlist.find({ "username": "_user" });
            if (cursor) {
                response = "Es existiert bereits ein Nutzer mit diesem Namen.";
                return response;
            }
            else {
                userlist.insertOne(_user);
                response = "Neuer Nutzer wurde registriert.";
                return response;
            }
        }
    }
})(Rezepte = exports.Rezepte || (exports.Rezepte = {}));
//# sourceMappingURL=server.js.map