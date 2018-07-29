import React, { Component } from 'react';
import './App.css';
import Titles from './components/Titles'
import Form from './components/Form'
import Ymap from './components/Ymap'
import moment from 'moment'
import axios from 'axios'

class App extends Component {
    state = {
        date: new Date(),
        pickUpDate: moment(),
        dropOffDate: moment(),
        distance: undefined,
        insurance: false
    };
    calculatePrice = async (e) => {
        e.preventDefault();
        var requestData ={
            pickUpDate: e.target.elements.pickUpDate.value,
            dropOffDate:e.target.elements.pickUpDate.value,
            distance:e.target.elements.distance.value,
            insurance: e.target.elements.insurance.value
        };
        console.log(requestData)
        axios.post('http://localhost:3001/', {
            params: requestData
        }).then(function (response) {

        }).catch(function (err) {
            console.log(err)
        })
    };

    clearData = () => {
        this.setState({
            pickUpDate: '',
            dropOffDate: ''
        })
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
