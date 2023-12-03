const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

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

        app.get("/service", async (req, res) => {
            const services = await servicesCollection.find({}).toArray();
            console.log(services);
            res.send(services);
        });
    } finally {

    }
}
run().catch(console.dir);


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