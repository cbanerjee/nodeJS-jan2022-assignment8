const MongoClient = require('mongodb').MongoClient;
const url = "" //URL Removed
const dbName = 'myFirstDatabase'

var dbClient;

exports.connect = () =>{
    MongoClient.connect(url).then(
        (client)=>{
            dbClient = client;
            console.log("MongoDb has been connected");
        },
        (err) => {
            console.log(err)
            console.log("retrying");
            this.connect();
        }
    )
}

exports.getCollection = (name) =>{
    return dbClient.db(dbName).collection(name);
}