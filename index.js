const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

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