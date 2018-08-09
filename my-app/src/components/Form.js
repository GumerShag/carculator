import React, {Component} from 'react';
import InputMoment from 'input-moment';
import moment from 'moment'
import '../../node_modules/input-moment/dist/input-moment.css';

class Form extends Component {
    state = {
        pickUpDate: moment(),
        dropOffDate: moment(),
        showPickUpDatePicker: false,
        showDropOffDatePicker: false,
        insurance: false
    };



    handleInsuranceChange = () => {
        this.setState({insurance: !this.state.insurance})
    };
    handlePickUpDateChange = (pickUpDate) => {
        this.setState({ pickUpDate: pickUpDate });
    };

    handleDropOffChange = (dropOffDate) => {
        this.setState({ dropOffDate: dropOffDate });
    };

    handlePickUpDateSave = () => {
        this.setState({showPickUpDatePicker: false});
    };

    handleDropOffDateSave = () => {
        this.setState({showDropOffDatePicker: false});
    };

    onPickUpDateInputClick = () => {
        this.setState(prev => ({showPickUpDatePicker: !prev.showPickUpDatePicker}))
    };

    onDropOffDateInputClick = () => {
        this.setState(prev => ({showDropOffDatePicker: !prev.showDropOffDatePicker}))
    };
    render() {
        return (
            <form onSubmit={this.props.calculatePrice} className='route-details-form'>
                <div className='form-group'>
                    <h4>Детали поездки</h4>
                    <label htmlFor="pickUpDate">С:</label>
                    <input
                        onClick={this.onPickUpDateInputClick}
                        type="When"
                        value={this.state.pickUpDate.format('DD/MM/YYYY HH:mm')}
                        readOnly="true"
                        name="pickUpDate"
                        placeholder='дд/мм/гггг чч:мм'
                        id='pickUpDate'
                        className='form-control'/>
                    <div className="datepicker-wrap">
                        {this.state.showPickUpDatePicker ?
                        <InputMoment
                            moment={this.state.pickUpDate}
                            onChange = {this.handlePickUpDateChange}
                            onSave={this.handlePickUpDateSave}
                            minStep={10}
                            hourStep={1}
                            prevMonthIcon="ion-ios-arrow-left" // default
                            nextMonthIcon="ion-ios-arrow-right" // default
                        /> : null}
                    </div>

                </div>
                <div className='form-group'>
                    <label htmlFor="dropOffForm">До:</label>
                    <input
                        onClick={this.onDropOffDateInputClick}
                        type="Until"
                        name="dropOffDate"
                        value={this.state.dropOffDate.format('DD/MM/YYYY HH:mm')}
                        readOnly placeholder='дд/мм/гггг чч:мм'
                        id='dropOffForm'
                        className='form-control'/>
                    <div className='datepicker-wrap'>
                        {this.state.showDropOffDatePicker ?
                            <InputMoment
                                moment={this.state.dropOffDate}
                                onChange={this.handleDropOffChange}
                                onSave={this.handleDropOffDateSave}
                                minStep={10}
                                hourStep={1}
                                prevMonthIcon="ion-ios-arrow-left" // default
                                nextMonthIcon="ion-ios-arrow-right" // default
                            /> : null}
                    </div>
                </div>
                <div className='form-group'>
                    <label htmlFor="distance">Расстояние (км):</label>
                    <input id="distance" readOnly className='form-control' onChange={this.handleDistanseChange} value={this.state.routeDistance}/>
                </div>
                <div className='form-group'>
                    <label htmlFor="duration">Время в пути (мин):</label>
                    <input id="duration" readOnly className='form-control' onChange={this.handleDurationChange} value={this.state.routeDuration}/>
                </div>
                <div className='form-check'>
                    <input id="insurance" type='checkbox' className='form-check-input' onChange={this.handleInsuranceChange} value={this.state.insurance}/>
                    <label htmlFor="insurance" className='form-check-label'>Страховка</label>
                </div>
                <div className='row justify-content-center'>
                   <button type='submit' className='btn btn-primary'>Рассчитать</button>
                </div>
            </form>
        );
    }
}

export default Form;