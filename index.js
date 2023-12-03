const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

app.get("/", async (req, res) => {
    res.send("Hello");
});

app.listen(port, (req, res) => {
    console.log(`Ami Dowracchi port ${port}.`);
});