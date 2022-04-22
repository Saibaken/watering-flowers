const express = require("express");
const app = express();
const port = 3001;

const {getData, updateFlower} = require("./filemanagement")


app.use(express.json());

app.get('/getData', (request, response) => {
    response.send(getData());
})

app.post('/updateData', (request, response) => {
    updateFlower(req.body.id);
    response.sendStatus(200);
})

app.listen(port);