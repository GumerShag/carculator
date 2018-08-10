module.exports.countPrices = () => {

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
        let priceForCar = countPrice(car.movePrice, car.insuranceMovePrice, car.waitPrice, car.maxDayInsurance, car.overDistancePrice);
        belkaPriceData.push({
            car: car.name,
            price: priceForCar
        })
    });

    return belkaPriceData;
};

function countPrice(movePrice, insuranceMovePrice, waitPrice, maxDayInsurance, overDistancePrice) {
    let pickUpDate = global.pickUpDate;
    let dropOffDate = global.dropOffDate;
    let distance = global.distance;
    let insurance = global.insurance;
    let duration = global.duration;

    let days = dropOffDate.diff(pickUpDate, 'days');
    let waitTime = (dropOffDate.diff(pickUpDate, 'minutes') - duration * 2 - 6 * days * 60) > 0
        ? (dropOffDate.diff(pickUpDate, 'minutes') - duration * 2 - 6 * days * 60) : 0;

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
}

