import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";
import { url } from "inspector";

export namespace Gefrierschrank {

    export interface Gefriergut {
        name: string;
        ablaufdatum: Date;
        notiz: string;
        menge: number;
    }


    //MongoDB verbinden und anlegen
    let gefriergutliste: Mongo.Collection;

    async function connectWithDB(_url: string): Promise<void> {                                                 
        let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();

        gefriergutliste = mongoClient.db("Gefrierschrank").collection("Gefriergut");
    }
    let mongoURL: string = "mongodb+srv://Testuser:2lPp9jUUag8OsBAH@clusterdavid.066x0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

    let port: number = Number(process.env.PORT);
    if (!port)
        port = 8100;


    function serverStart(_port: number): void {
        let server: Http.Server = Http.createServer();
        server.addListener("request", handleRequest);
        server.addListener("listening", handleListen);
        server.listen(port);
    }    

    serverStart(port);
    connectWithDB(mongoURL);

    console.log("Starting Server");


    function handleListen(): void {
        console.log("Listening");
    }

    async function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise<void> {
        console.log("I hear voices!");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");

        if (_request.url) {
            let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);     //-> assoziatives Array 
            let jsonString: string = JSON.stringify(url.query);
            console.log(jsonString);

            if (url.pathname == "/saveGefriergut") {
                let gefriergut: Gefriergut = JSON.parse(jsonString);
                let mongoResponse: string = await saveGefriergut(gefriergut);
                _response.write(mongoResponse);
            }
            
            
            
            
            
            
            
            
            _response.end();
        }

        function saveGefriergut(_gefriergut: Gefriergut): string {
            gefriergutliste.insertOne(_gefriergut);
            let serverResponse: string = "Gefriertgut wurde angelegt.";
            return serverResponse;
        }

        
    }



}