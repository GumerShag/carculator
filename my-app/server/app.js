var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();
var moment = require('moment');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/calculate', function (req, res) {

    let calculationParams = req.body.params;
    app.locals.pickUpDate = moment(calculationParams.pickUpDate, 'DD-MM-YYYY HH:mm');
    app.locals.dropOffDate = moment(calculationParams.dropOffDate, 'DD-MM-YYYY HH:mm');
    app.locals.distance = calculationParams.distance;
    app.locals.insurance = calculationParams.insurance;
    app.locals.duration = calculationParams.duration;

    let me = this;
    //fixme: read all car data from config file
    let carData = [
        {
            name: 'rio',
            movePrice: 8,
            insuranceMovePrice: 2,
            overDistancePrice: 8,
            waitPrice: 2,
            maxDayInsurance: 500
        },
        {
            name: 'x-line',
            movePrice: 9,
            insuranceMovePrice: 2,
            overDistancePrice: 9,
            waitPrice: 2.5,
            maxDayInsurance: 500
        },
        {
            name: 'mercedes',
            movePrice: 14,
            insuranceMovePrice: 4,
            overDistancePrice: 14,
            waitPrice: 4,
            maxDayInsurance: 1500
        }
    ];

    let belkaPriceData = [];

    carData.forEach(function (car) {
        let priceForCar = app.locals.countPrice(car.movePrice, car.insuranceMovePrice, car.waitPrice, car.maxDayInsurance, car.overDistancePrice);
        belkaPriceData.push({
            car: car.name,
            price: priceForCar
        })
    });

    res.send(belkaPriceData);
});

app.listen(3001, function () {
    console.log('Example app listening on port 3001!');
});

app.locals.countPrice = (movePrice, insuranceMovePrice, waitPrice, maxDayInsurance, overDistancePrice) => {
    let pickUpDate = app.locals.pickUpDate;
    let dropOffDate = app.locals.dropOffDate;
    let distance = app.locals.distance;
    let insurance = app.locals.insurance;
    let duration = app.locals.duration;

    let days = dropOffDate.diff(pickUpDate, 'days');
    let waitTime = (dropOffDate.diff(pickUpDate, 'minutes') - duration * 2 - 6 * days * 60) > 0
        ? (dropOffDate.diff(pickUpDate, 'minutes') - duration * 2 - 6 * days * 60) : 0;
    console.log(movePriceRes, insurance, movePrice)
    if (insurance) {
        movePrice = movePrice + insuranceMovePrice;
    }

    let allPrice = duration * 2 * movePrice + waitTime * waitPrice;

    if (days < 1 && distance * 2 > 100) {
        allPrice = (distance * 2 - 100) * overDistancePrice;
    } else if (insurance) {
        allPrice = allPrice + maxDayInsurance * days;
    }
    return allPrice;
};