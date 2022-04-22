const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

const {getData, updateData} = require('./filemanagement')


app.use(express.json());
app.use(cors());

app.get('/getData', (request, response) => {
    response.send(getData());
})

app.post('/updateData', (request, response) => {
    updateData(request.body);
    response.sendStatus(200);
});

app.listen(port);