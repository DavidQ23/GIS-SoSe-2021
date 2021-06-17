import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";


export namespace Aufgabe3_4 {

    interface Student {
        firstname: string;
        name: string;
        registration: number;
    }

    console.log("Starting server");
    let port: number = Number(process.env.PORT);
    if (!port)
        port = 8100;

    let server: Http.Server = Http.createServer();
    server.addListener("request", handleRequest);
    server.addListener("listening", handleListen);
    server.listen(port);

    connectToDB("mongodb+srv://Testuser:passwort@clusterdavid.066x0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");

    async function connectToDB(_url: string): Promise<void> {
        let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };

        let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        retrieveStudents();

        async function retrieveStudents(): Promise<void> {
            let students: Mongo.Collection = mongoClient.db("Test").collection("Students");
            let cursor: Mongo.Cursor = students.find();
            let result: Student[] = await cursor.toArray();
            console.log(result);
        }


    }

    function handleListen(): void {
        console.log("Listening");
    }

    function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
        console.log("I hear voices!");

        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");



        let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);     //Die in der Request enthaltene URL wird in ein assoziatives Array geparsed/umformatiert
        if (_request.url) {
        let jsonString: string = JSON.stringify(url.query);
        console.log(jsonString);
        _response.write(jsonString);
        }
        _response.end();
    }

}