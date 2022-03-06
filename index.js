const express =require ('express');
const bodyParser = require ('body-parser');

const app = express()
const port = 3000

const mongodb = require("./mongodb");
mongodb.connect();
const collection = ()=> mongodb.getCollection('users');


app.listen(port, () => {
    console.log('Server is running on port ' + port)
})

//const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send('Response from Server at port 3000; <br> Use postman to test methods Create (POST /add), Read (GET /read/:name), Update (PUT /update/), Delete (DELETE /delete/:name)');
})

//POST request to add user into db
app.post('/add', (req, res) => {
    if (req.body.name) { // valid name
        collection().insertOne(req.body)
            .then(result => {
                res.status(200).send("CREATE working");
                console.log("result : ", result);
            })
            .catch(err => console.error(err))
    } else {
        res.status(400).send("Must have name");
    }
})

//GET request to query db by user name
app.get('/read/:name', (req, res) => {
    const name = req.params.name
    collection().find({ "name": name }).toArray((err, data) => {
        if (err) console.log(err)
        if (data.length > 0) {
            res.status(200).send(data)
        }
        else res.status(404).end("Not Found");
    })

})

//PUT request to update user data into db
app.put('/update/', (req, res) => {
    if (req.body.name) { // valid name
        console.log("req.body.name : ", req.body.name)
        var data = req.body;
        collection().findOneAndUpdate({ "name": req.body.name }, {
                $set: data
            }, {
                upsert: true
            }, (err, result) => {
                if (err) return res.send(err)
                res.send(result)
            })
    } else {
        res.sendStatus(400)
    }


})

//DELETE request to delete user data from db
app.delete('/delete/:name', (req, res) => {
    const name = req.params.name
    console.log("req.params.name : ", req.params.name)

    collection().findOneAndDelete({
        "name": name
    }, (err, result) => {
        if (err) {
            res.send(err);
        } else if (result) {
            console.log(result)
            if (result.value) res.send("Delete Done")
        } else res.sendStatus(404)

    })
})