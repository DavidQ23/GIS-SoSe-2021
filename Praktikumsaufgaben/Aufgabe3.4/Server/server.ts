import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";


export namespace Aufgabe3_4 {

    interface Student {
        firstname: string;
        name: string;
        studypath: string;
    }

    let students: Mongo.Collection;
    let mongoURL: string = "mongodb+srv://Testuser:passwort@clusterdavid.066x0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

    console.log("Starting server");
    let port: number = Number(process.env.PORT);
    if (!port)
        port = 8100;

    startServer(port);
    //connectToDB(mongoURL);

    function startServer(_port: number): void {
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

        _response.setHeader("content-type", "application/json; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");

        if (_request.url) {
            let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);     //Die in der Request enthaltene URL wird in ein assoziatives Array geparsed/umformatiert
            let jsonString: string = JSON.stringify(url.query);
            console.log(jsonString);

            if (url.pathname == "/saveData") {
                let student: Student = JSON.parse(jsonString);                      //Eingebene Daten als String werden wieder in ein JSON OBjekt umgewandelt
                let mongoResponse: string = await saveInDB(mongoURL, student);
                _response.write(mongoResponse);
                
            }

        }

        _response.end();
    }

    async function saveInDB(_url: string, _student: Student): Promise<string> {
        let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        students = mongoClient.db("Test").collection("Students");
        console.log("Database connected", students != undefined);
        students.insertOne(_student);
        let response: string = "Daten erfolgreich in Daten gespeichert";
        return response;
    }

}