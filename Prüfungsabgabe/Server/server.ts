import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";

export namespace Rezepte {

    export interface Recipe {
        title: string;
        ingrediants: string;
        instruction: string;
    }

    export interface User {
        username: string;
        password: string;
    }


    let userlist: Mongo.Collection;
    let mongoURL: string = "mongodb+srv://Testuser:passwort@clusterdavid.066x0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

    console.log("Starting server");
    let port: number = Number(process.env.PORT);
    if (!port)
        port = 8100;

    serverStart(port);


    function serverStart(_port: number): void {
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
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");

        if (_request.url) {
            let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);     //-> assoziatives Array 
            let jsonString: string = JSON.stringify(url.query);
            console.log(jsonString);

            if (url.pathname == "/registration") {
                let user: User = JSON.parse(jsonString);                            //Json Objekt
                let mongoResponse: string = await registrateUser(mongoURL, user);
                _response.write(mongoResponse);
            }
            /* else if (url.pathname == "/login") {
                let user: User = JSON.parse(jsonString);
                let mongoResponse: string = await loginUser(mongoURL, user);
            } */

        }

        async function registrateUser(_url: string, _user: User): Promise<string> {
            let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };
            let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
            await mongoClient.connect();
            userlist = mongoClient.db("Recipesite").collection("User");                                     //neue Collection in Variable
            console.log("Database connected", userlist != undefined);

            let response: string;

            if (_user.username && _user.password == "") {
                response = "Bitte alle Felder ausfüllen!";
                return response;
            }
            else {
                let cursor: Mongo.Cursor = userlist.find();
                let allUser: User[] = await cursor.toArray();
                let serverResponse: string = await searchUser(allUser, _user);
                return serverResponse;
            }

        }

        async function searchUser(_User: User[], _user: User): Promise<string> {
            let response: string;
            for (let i: number = 0; i < _User.length; i++) {
                if (_User[i].username == _user.username) {
                    response = "Name existiert bereits! Bitte einen neuen Namen verwenden.";
                    return response;
                }
            }
            userlist.insertOne(_user);
            response = "Neuer Nutzer wurde angelegt.";
            return response;
        }

        /* async function loginUser(params:type) {
            
        } */
    }
}