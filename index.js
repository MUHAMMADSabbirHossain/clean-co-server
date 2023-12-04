const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

//! Waring: Do not use in production
app.use(cors({
    origin: "*"
}));

app.use(express.json());


const uri = "mongodb+srv://dustobalok000:WAmEARwXrcrUEkTY@clean-co.c3skspr.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        await client.connect();
        const servicesCollection = client.db("cleanCo").collection("service");

        /* 
        get /get-service => all data
        post /post-service => create new data
        put /update-service => modify a data
        delete /delete-service => delete a data from collection
        */

        app.get("/get-service", async (req, res) => {
            const services = await servicesCollection.find({}).toArray();
            console.log(services);
            res.send(services);
        });

        app.post("/add-service", async (req, res) => {
            const data = req.body;
            console.log(data);
            const result = await servicesCollection.insertOne(data);
            res.send(result);
        });

        app.put("/update-service/:id", async (req, res) => {

            const { id } = req.params;
            const data = req.body;

            const filter = { _id: new ObjectId(id) };
            const updateDoc = { $set: data };
            const option = { upsert: true };

            const result = await servicesCollection.updateOne(filter, updateDoc, option);

            res.send(result);
        });

        app.delete("/delete-service/:id", async (req, res) => {
            const { id } = req.params;

            const query = { _id: new ObjectId(id) };
            const result = await servicesCollection.deleteOne(query);
            res.send(result);
        });

        // with try catch block

        /* app.post("add-service", async (req, res) => {

            try {
                const data = req.body;
                const result = await servicesCollection.insertOne(data);
                res.send({ status: true, result: result });
            } catch (error) {
                res.send({ status: false, error });
            }

        }); */
    } finally {

    }
}
run().catch(console.dir);

// Body

app.get("/dummy-route/user2", async (req, res) => {
    const data = req.body
    res.json(data);
});

// Query

app.get("/dummy-route/user", async (req, res) => {
    const { name, age } = req.query;
    console.log(name);
    console.log(age);
    res.json(name);
});

// Param

app.get("/dummy-route/user/:id", async (req, res) => {
    const { id } = req.params;
    res.send(id);
});

app.get("/", async (req, res) => {
    res.send(
        `<html>
            <body>
                <h1 style="color: red"> Hello</h1>
            </body>
        </html>`
    );
});
app.get("/home", async (req, res) => {
    res.sendFile(
        "C:/Projects/Programming Hero Projects/clean-co-server/index.html"
    );
});

app.listen(port, (req, res) => {
    console.log(`Ami Dowracchi port ${port}.`);
});