const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Header", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.static('public'));
app.get('/snakeGame', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(process.env.PORT || 5000, () =>{
    console.log('Server Runs on: http://localhost:5000/snakeGame');
})