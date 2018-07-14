import React, {Component} from 'react';

class Data extends Component{
    render() {
        return(
            <div>
                <p>{this.props.pickUpdate}</p>
                <p>{this.props.dropOffDate}</p>
            </div>
        )
    }
}

export default Data;