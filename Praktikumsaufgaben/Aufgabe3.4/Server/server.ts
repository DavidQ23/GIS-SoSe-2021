import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";


export namespace Aufgabe3_4 {

    interface Student {
        firstname: string;
        name: string;
        registration: number;
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
        console.log("Waiting");
    }

    async function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise<void> {
        console.log("I hear voices!");

        _response.setHeader("content-type", "application/json; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");

        if (_request.url) {
            let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);     //Die in der Request enthaltene URL wird in ein assoziatives Array geparsed/umformatiert
            let jsonString: string = JSON.stringify(url.query);
            console.log(jsonString);                                               //Konsolenfeedback, dass die Daten an Server geschickt wurden

            if (url.pathname == "/saveData") {
                let student: Student = JSON.parse(jsonString);                      //Eingebene Daten als String werden wieder in ein JSON OBjekt umgewandelt
                let mongoResponse: string = await saveInDB(mongoURL, student);      //Auf Antwort der Funktion saveInDB warten
                _response.write(mongoResponse);                                     //erhaltene Antwort an Client schicken               
            }
            else if (url.pathname == "/printData") {
                let studentlist: Student[] = await printallStudents(mongoURL);          //Auf Antwort der Funtion printallStudents warten, die ein Array an Studierenden ist
                _response.write(JSON.stringify(studentlist));                           //Serverantwort = ein String der Arrayliste
            }
        }

        _response.end();
    }

    async function saveInDB(_url: string, _student: Student): Promise<string> {
        let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };    
        let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);                      //Datenbank wird in Variable angelegt
        await mongoClient.connect();                                                                    //mit angelegter Datanbank verbinden
        students = mongoClient.db("Recipesite").collection("User");                                       //Eine Collection einer Datanbank in Variable legen
        console.log("Database connected", students != undefined);                                       //Feedback für Konsole
        students.insertOne(_student);                                                                   //Student, der als Parameter beigegeben wurde, in ausgewählter Collection speichern
        let response: string = "Daten erfolgreich in Datenbank gespeichert";                            //Rückgabewert der Funktion
        return response;
    }

    async function printallStudents(_url: string): Promise<Student[]> {
        let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };    
        let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);                      
        await mongoClient.connect();                                                                    
        students = mongoClient.db("Test").collection("Students");                                       
        console.log("Database connected", students != undefined);  
        let cursor: Mongo.Cursor = students.find();                                                     //Alle Studenten in der Collection auslesen 
        let result: Student[] = await cursor.toArray();                                                 //Alle gefundenen Einträge in einen Array umwandeln
        return result;                                                                                  //Rückgabewert ist ein Array aus Studierenden
    }
}