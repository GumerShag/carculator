var moment = require('moment')

module.exports.countPrice = () => {
    let pickUpDate = global.pickUpDate;
    let dropOffDate = global.dropOffDate;
    let distance = global.distance;
    let insurance = global.insurance;
    let duration = global.duration;


    //Counting by minutes tariffs
    let startWaitTime = pickUpDate.clone();
    startWaitTime.add(duration, 'minutes');
    let endWaitTime = dropOffDate.clone();
    endWaitTime.subtract(duration, 'minutes');
    let moveMinutePrice = 8;
    let waitMinutePrice = 2.5;
    let movePriceTo = 0;
    let movePriceBACK = 0;
    let waitPrice = 0;

    for (let i = 0; i < duration; i++) {
        let higherPriceStart = pickUpDate.clone();
        higherPriceStart.set('hour', 18).set('minutes', 0);
        let higherPriceEnd = pickUpDate.clone();
        higherPriceEnd.set('hour', 21).set('minutes', 0);

        if (pickUpDate > higherPriceStart && pickUpDate < higherPriceEnd ) {
            moveMinutePrice = 9;
        } else {
            moveMinutePrice = 8;
        }

        movePriceTo = movePriceTo + moveMinutePrice;
        pickUpDate.add(1, 'minutes');
    }

    for (let i = duration; i > 0; i--) {
        let higherPriceStart = pickUpDate.clone();
        higherPriceStart.set('hour', 18).set('minutes', 0);
        let higherPriceEnd = pickUpDate.clone();
        higherPriceEnd.set('hour', 21).set('minutes', 0);

        if (dropOffDate > higherPriceStart && dropOffDate < higherPriceEnd) {
            moveMinutePrice = 9;
        } else {
            moveMinutePrice = 8;
        }

        movePriceBACK = movePriceTo + moveMinutePrice;
        dropOffDate.add(1, 'minutes');
    }

    for (let i = 0; i < endWaitTime.diff(startWaitTime, 'minutes'); i++) {
        let freePriceStart = startWaitTime.clone();
        freePriceStart.set('hour', 0).set('minutes', 0);
        let freePriceEnd = startWaitTime.clone();
        freePriceEnd.set('hour', 6).set('minutes', 0);

        if (startWaitTime > freePriceStart && startWaitTime < freePriceEnd) {
            waitMinutePrice = 0;
        } else {
            waitMinutePrice = 2.5
        }

        waitPrice = waitPrice + waitMinutePrice * 10;
        startWaitTime.add(moment.duration(10, 'minutes'));
    }
    let allPrice = movePriceTo + waitPrice + movePriceBACK;
    let delimobilPrice = [
        {
            car: 'solaris',
            price: allPrice
        },
        {
            car: 'captur',
            price: allPrice
        },
        {
            car: 'polo',
            price: allPrice
        }
    ];

    return delimobilPrice;

};