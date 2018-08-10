var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();
var moment = require('moment');
var belka = require('./controllers/belka');
var delimobil = require('./controllers/delimobil');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/calculate', function (req, res) {
    let calculationParams = req.body.params;
    global.pickUpDate = moment(calculationParams.pickUpDate, 'DD-MM-YYYY HH:mm');
    global.dropOffDate = moment(calculationParams.dropOffDate, 'DD-MM-YYYY HH:mm');
    global.distance = calculationParams.distance;
    global.insurance = calculationParams.insurance;
    global.duration = calculationParams.duration;

    let belkacarPrice = belka.countPrices();
    let delimobilPrice = delimobil.countPrice();

    res.send([
        {
            belkacarPrice
        },
        {
            delimobilPrice
        }
    ]);
});

app.listen(3001, function () {
    console.log('Example app listening on port 3001!');
});