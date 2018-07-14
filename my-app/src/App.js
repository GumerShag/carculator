import React, { Component } from 'react';
import './App.css';
import Titles from './components/Titles'
import Form from './components/Form'
import Data from './components/Data'

class App extends Component {
    state = {
        date: new Date(),
        pickUpDate: undefined,
        dropOffDate: undefined
    };
    calculatePrice = async (e) => {
        e.preventDefault();
console.log(e.target.elements)
    };

    clearData = () => {
        this.setState({
            pickUpDate: '',
            dropOffDate: ''
        })
    };

    render() {
        return (
            < div>
                <h1>Hello</h1>
                <p>Now is {this.state.date.toLocaleDateString()}</p>
                <Titles/>
                <h3>Машина будет у меня...</h3>

                <Form calculatePrice={this.calculatePrice} />
                <Data
                    dateTo = {this.state.pickUpDate}
                    dateWhen = {this.state.dropOffDate}
                />
                <button onClick={this.clearData}>Clear</button>
            </div>
        )
    }
}

export default App;
