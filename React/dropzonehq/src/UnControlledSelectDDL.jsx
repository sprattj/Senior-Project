import React from 'react';
import { Form, FormGroup, Input, Row, Col, InputGroup, InputGroupAddon } from 'reactstrap';
import PropTypes from 'prop-types';
import './UnControlledTextInput.css';

// Supports change-able default value, unlike a standard React Uncontrolled text input component
// See component signature (props) below

export default class UnControlledSelectDDL extends React.Component{
    constructor (props)
    {
        super (props);
        this.shouldSetInputTextToDefaultValue = this.shouldSetInputTextToDefaultValue.bind(this); // bind method's 'this' to the instance
   
    }

    shouldSetInputTextToDefaultValue (props)
    {
        var result =
            this.previousDefaultValue        != props.defaultValue ||
            this.proviousChangeIndicator    != props.changeIndicator;  
        return result;
    }

    componentWillUpdate (nextProps, nextState)
    {
        var defaultValue     = nextProps.defaultValue;
        var changeIndicator = nextProps.changeIndicator;
        if (this.shouldSetInputTextToDefaultValue (nextProps))  // set the default text input value if either the defaultText or the changeIndicator change
        {
         // set the default value
            var theInput                    = this.refs["selectInput"];
            theInput.value                  = defaultValue;

         // save the default value and change indicator for later comparison
            this.previousDefaultValue       = defaultValue;
            this.proviousChangeIndicator    = changeIndicator;
        }
    }

    shouldComponentUpdate (nextProps, nextState)
    {
        return this.shouldSetInputTextToDefaultValue (nextProps);
    }

    render ()
    {
        var result = (
            <div>
                <select
                    // {...this.props.inputProps}
                    ref = "selectInput" 
                    onChange = {this.props.onChange}
                    defaultValue = {this.props.defaultValue}
                >
                    <option value="true">{this.props.options[0].text}</option>
                    <option value="false">{this.props.options[1].text}</option>
                </select>
            </div>
        );
        return result;
    }
};

// Component signature (props)

UnControlledSelectDDL.propTypes =
{
/*     defaultText:        React.PropTypes.any,                // Default input text field value, written when it changes or when the changeIndicator changes.  Note - .isRequired fails for an unknown reason
    changeIndicator:    React.PropTypes.any,                // Optional indicator, which on change triggers a write of defaultText to the text input field
    onBlur:             React.PropTypes.func.isRequired,    // Method to capture user-edited value on exit from field
    inputProps:         React.PropTypes.any   */               // attributes you want to pass to the input text element, for example {{className = "'form-control'"}}
};