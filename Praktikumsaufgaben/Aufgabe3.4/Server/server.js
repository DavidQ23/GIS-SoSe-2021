"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aufgabe3_4 = void 0;
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
var Aufgabe3_4;
(function (Aufgabe3_4) {
    console.log("Starting server");
    let port = Number(process.env.PORT);
    if (!port)
        port = 8100;
    let server = Http.createServer();
    server.addListener("request", handleRequest);
    server.addListener("listening", handleListen);
    server.listen(port);
    connectToDB("mongodb+srv://Testuser:passwort@clusterdavid.066x0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
    async function connectToDB(_url) {
        let options = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        retrieveStudents();
        async function retrieveStudents() {
            let students = mongoClient.db("Test").collection("Students");
            let cursor = students.find();
            let result = await cursor.toArray();
            console.log(result);
        }
    }
    function handleListen() {
        console.log("Listening");
    }
    function handleRequest(_request, _response) {
        console.log("I hear voices!");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        let url = Url.parse(_request.url, true); //Die in der Request enthaltene URL wird in ein assoziatives Array geparsed/umformatiert
        if (_request.url) {
            let jsonString = JSON.stringify(url.query);
            console.log(jsonString);
            _response.write(jsonString);
        }
        _response.end();
    }
})(Aufgabe3_4 = exports.Aufgabe3_4 || (exports.Aufgabe3_4 = {}));
//# sourceMappingURL=server.js.map