import React from 'react';
import { Alert } from 'reactstrap';

export default class AlertBox extends React.Component{
    render() {
        return (
            <Alert color={this.props.alertColor}>
                {this.props.message}
            </Alert>
        );
    }
}