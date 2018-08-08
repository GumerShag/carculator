import React, { Component } from 'react';
import './App.css';
import Titles from './components/Titles'
import Form from './components/Form'
import Ymap from './components/Ymap'
import moment from 'moment'
import axios from 'axios'

class App extends Component {
    state = {
        pickUpDate: moment('05/05/2018 10:59'),
        dropOffDate: moment('05/06/2018 19:52'),
        distance: undefined,
        duration: undefined,
        insurance: false
    };
    calculatePrice = async (e) => {
        e.preventDefault();
        var requestData ={
            pickUpDate: e.target.elements.pickUpDate.value,
            dropOffDate:e.target.elements.dropOffDate.value,
            distance:e.target.elements.distance.value,
            duration:e.target.elements.duration.value,
            insurance: e.target.elements.insurance.value,
        };
        this.setState({
            distance:e.target.elements.distance.value,
            duration:e.target.elements.duration.value,
            insurance: e.target.elements.insurance.value,
        });
        console.log(requestData)
        this.calculateData()
        axios.post('http://localhost:3001/', {
            params: requestData
        }).then(function (response) {

        }).catch(function (err) {
            console.log(err)
        })
    };

    calculateData = () => {
          var pida = this.state.pickUpDate;
          var doda =   this.state.dropOffDate;
          var dist =   this.state.distance;
          var insurance =   this.state.insurance;
          var duration = this.state.duration;

          var days = doda.diff(pida, 'days');
          var waitTime = doda.diff(pida, 'minutes') - duration * 2 - 6 * days * 60 ;

          var allPrice = duration * 2 * 11 + waitTime * 2;

          debugger
    }

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
