"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.P_3_1Server = void 0;
const Http = require("http");
var P_3_1Server;
(function (P_3_1Server) {
    console.log("Starting server"); //Konsolenausgabe
    let port = Number(process.env.PORT); //Variable für den Port wird angelegt
    if (!port) //Wenn Portvariable keinen Wert hat wird ihm der Wert 8100 zugewiesen
        port = 8100;
    let server = Http.createServer(); //Http Server wird angelegt und in eine Variable abgespeichert
    server.addListener("request", handleRequest); //Event wird angelegt: Bei einer Anfrage wird die handleRequest() ausgeführt
    server.addListener("listening", handleListen); //Event wird angelegt: Auf Event warten, Wenn Event eintritt wird handleListen() ausgeführt
    server.listen(port); //Server hört und reagiert auf Port 
    function handleListen() {
        console.log("Listening");
    }
    function handleRequest(_request, _response) {
        console.log("I hear voices!");
        _response.setHeader("content-type", "text/html; charset=utf-8"); //Header wird mit diesen Werten befüllt 
        _response.setHeader("Access-Control-Allow-Origin", "*"); // Zugriffserlaubnis
        _response.write(_request.url); //Serverantwort entspricht dem Ausschreiben der empfangenen Daten in URL
        _response.end(); //Serverantwort endet
        console.log(_request.url); //Konsolenausgabe der _request.url
    }
})(P_3_1Server = exports.P_3_1Server || (exports.P_3_1Server = {}));
//# sourceMappingURL=server.js.map