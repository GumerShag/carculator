import React, {Component} from 'react';
import InputMoment from 'input-moment';
import moment from 'moment'
import '../../node_modules/input-moment/dist/input-moment.css';


class Form extends Component {
    state = {
        pickUpDate: moment(),
        dropOffDate: moment(),
        showPickUpDatePicker: false,
        showDropOffDatePicker: false
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
            <form onSubmit={this.props.calculatePrice}>
                <div>
                    <label>С:</label>
                    <input
                        onClick={this.onPickUpDateInputClick}
                        type="When"
                        value={this.state.pickUpDate.format('DD/MM/YYYY HH:mm')}
                        readOnly name="pickUpDate"
                        placeholder='дд/мм/гггг чч:мм'/>
                    <div className="datepicker-wrap">
                        {this.state.showPickUpDatePicker ?
                        <InputMoment
                            moment={this.state.pickUpDate}
                            onChange = {this.handlePickUpDateChange}
                            onSave={this.handlePickUpDateSave}
                            minStep={5}
                            hourStep={1}
                            prevMonthIcon="ion-ios-arrow-left" // default
                            nextMonthIcon="ion-ios-arrow-right" // default
                        /> : null}
                    </div>

                </div>
                <div>
                    <label>До:</label>
                    <input
                        onClick={this.onDropOffDateInputClick}
                        type="Until"
                        name="dropOffDate"
                        value={this.state.dropOffDate.format('DD/MM/YYYY HH:mm')}
                        readOnly placeholder='дд/мм/гггг чч:мм'/>
                    <div className='datepicker-wrap'>
                        {this.state.showDropOffDatePicker ?
                            <InputMoment
                                moment={this.state.dropOffDate}
                                onChange={this.handleDropOffChange}
                                onSave={this.handleDropOffDateSave}
                                minStep={5}
                                hourStep={1}
                                prevMonthIcon="ion-ios-arrow-left" // default
                                nextMonthIcon="ion-ios-arrow-right" // default
                            /> : null}
                    </div>
                </div>
                <div className="position-field"><label>Получение:</label>
                    <input type="Until" name='pickUpLocation' placeholder='Местоположение'/></div>
                <div className="position-field"><label>Возврат:</label>
                    <input type="Until" name='dropOffLocation' placeholder='Местоположение'/></div>

                <button type='submit'>Calculate</button>
            </form>
        );
    }
}

export default Form;