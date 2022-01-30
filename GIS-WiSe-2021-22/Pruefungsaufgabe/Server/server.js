"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gefrierschrank = void 0;
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
var Gefrierschrank;
(function (Gefrierschrank) {
    //MongoDB verbinden und anlegen
    let gefriergutliste;
    async function connectWithDB(_url) {
        let options = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        gefriergutliste = mongoClient.db("Gefrierschrank").collection("Gefriergut");
    }
    let mongoURL = "mongodb+srv://Testuser:2lPp9jUUag8OsBAH@clusterdavid.066x0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    let port = Number(process.env.PORT);
    if (!port)
        port = 8100;
    function serverStart(_port) {
        let server = Http.createServer();
        server.addListener("request", handleRequest);
        server.addListener("listening", handleListen);
        server.listen(port);
    }
    serverStart(port);
    connectWithDB(mongoURL);
    console.log("Starting Server");
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
            if (url.pathname == "/saveGefriergut") {
                let gefriergut = JSON.parse(jsonString);
                let mongoResponse = await saveGefriergut(gefriergut);
                _response.write(mongoResponse);
            }
            _response.end();
        }
        function saveGefriergut(_gefriergut) {
            gefriergutliste.insertOne(_gefriergut);
            let serverResponse = "Gefriertgut wurde angelegt.";
            return serverResponse;
        }
    }
})(Gefrierschrank = exports.Gefrierschrank || (exports.Gefrierschrank = {}));
//# sourceMappingURL=server.js.map