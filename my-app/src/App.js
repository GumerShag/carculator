import React, { Component } from 'react';
import './App.css';
import Titles from './components/Titles'
import Form from './components/Form'
import Ymap from './components/Ymap'
import moment from 'moment'
import axios from 'axios'

class App extends Component {
    state = {
        pickUpDate: moment('05/06/2018 19:44'),
        dropOffDate: moment('05/06/2018 19:55'),
        distance: undefined,
        duration: undefined,
        insurance: false
    };
    calculatePrice = async (e) => {
        e.preventDefault();
        let requestData ={
            pickUpDate: e.target.elements.pickUpDate.value,
            dropOffDate:e.target.elements.dropOffDate.value,
            distance:e.target.elements.distance.value,
            duration:e.target.elements.duration.value,
            insurance: JSON.parse(e.target.elements.insurance.value),
        };
        axios.post('http://localhost:3001/calculate', {
            params: requestData
        }).then(function (response) {
            console.log('Cтоимость:')
            console.log(response)
        }).catch(function (err) {
            console.log(err)
        })
    };

    calculateBelkaPrice = () => {
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
            let priceForCar = me.countPrice(car.movePrice, car.insuranceMovePrice, car.waitPrice, car.maxDayInsurance, car.overDistancePrice);
            belkaPriceData.push({
                car: car.name,
                price: priceForCar
            })
        });
    };



    render() {
        return (
            <div className='container'>
                <header><Titles/></header>
                <main role='main'>
                    <div className='row'>
                        <div className='col-md-9 col-sm-1'>
                            <Ymap/>
                        </div>
                        <div className='col-md-3 col-sm-1'><Form calculatePrice={this.calculatePrice}/>
                        </div>
                    </div>
                </main>
                    <div className='container footer-text'>
                        <span className='text-muted'><h6>Версия 1.0</h6></span>
                    </div>
            </div>
        )
    }
}

export default App;
