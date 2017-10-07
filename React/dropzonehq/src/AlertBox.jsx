import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';
import { reactstrapColors } from './reactstrapColors.js';

/*
    An AlertBox is a Reactstrap Alert that can have its
    color and message customized via props.

    This wrapper allows for use of the key prop.
*/
export default class AlertBox extends React.Component{
    render() {
        return (
            <Alert color={this.props.alertColor}>
                {this.props.message}
            </Alert>
        );
    }
}

AlertBox.PropTypes = {
    alertColor: PropTypes.oneOf(reactstrapColors),
    message: PropTypes.string.isRequired //the message of the alert
}