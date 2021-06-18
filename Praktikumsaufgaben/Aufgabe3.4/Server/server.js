"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aufgabe3_4 = void 0;
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
var Aufgabe3_4;
(function (Aufgabe3_4) {
    let students;
    let mongoURL = "mongodb+srv://Testuser:passwort@clusterdavid.066x0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    console.log("Starting server");
    let port = Number(process.env.PORT);
    if (!port)
        port = 8100;
    startServer(port);
    //connectToDB(mongoURL);
    function startServer(_port) {
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
        _response.setHeader("content-type", "application/json; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        if (_request.url) {
            let url = Url.parse(_request.url, true); //Die in der Request enthaltene URL wird in ein assoziatives Array geparsed/umformatiert
            let jsonString = JSON.stringify(url.query);
            console.log(jsonString); //Konsolenfeedback, dass die Daten an Server geschickt wurden
            if (url.pathname == "/saveData") {
                let student = JSON.parse(jsonString); //Eingebene Daten als String werden wieder in ein JSON OBjekt umgewandelt
                let mongoResponse = await saveInDB(mongoURL, student); //Auf Antwort der Funktion saveInDB warten
                _response.write(mongoResponse); //erhaltene Antwort an Client schicken               
            }
            else if (url.pathname == "/printData") {
                let studentlist = await printallStudents(mongoURL); //Auf Antwort der Funtion printallStudents warten, die ein Array an Studierenden ist
                _response.write(JSON.stringify(studentlist)); //Serverantwort = ein String der Arrayliste
            }
        }
        _response.end();
    }
    async function saveInDB(_url, _student) {
        let options = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient = new Mongo.MongoClient(_url, options); //Datenbank wird in Variable angelegt
        await mongoClient.connect(); //mit angelegter Datanbank verbinden
        students = mongoClient.db("Test").collection("Students"); //Eine Collection einer Datanbank in Variable legen
        console.log("Database connected", students != undefined); //Feedback für Konsole
        students.insertOne(_student); //Student, der als Parameter beigegeben wurde, in ausgewählter Collection speichern
        let response = "Daten erfolgreich in Datenbank gespeichert"; //Rückgabewert der Funktion
        return response;
    }
    async function printallStudents(_url) {
        let options = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        students = mongoClient.db("Test").collection("Students");
        console.log("Database connected", students != undefined);
        let cursor = students.find(); //Alle Studenten in der Collection auslesen 
        let result = await cursor.toArray(); //Alle gefundenen Einträge in einen Array umwandeln
        return result; //Rückgabewert ist ein Array aus Studierenden
    }
})(Aufgabe3_4 = exports.Aufgabe3_4 || (exports.Aufgabe3_4 = {}));
//# sourceMappingURL=server.js.map