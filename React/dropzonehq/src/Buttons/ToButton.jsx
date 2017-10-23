import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { reactstrapColors, reactstrapButtonSizes } from '../reactstrapStyles.js';

/*
    A ToChange button is a button that, when click, changes the view of the
    page to render the correct screen.
*/ 

export default class ToButton extends React.Component {
    constructor(props) {
        super(props);
    }
    

    render() {
        return(
            <div>
                <Button size={this.props.buttonSize} color={this.props.buttonColor}>{this.props.buttonText}</Button>
            </div>
        );
    }

}

ToButton.propTypes = {
    buttonSize: PropTypes.oneOf(reactstrapButtonSizes).isRequired, //the size of the outer button
    buttonColor: PropTypes.oneOf(reactstrapColors).isRequired, //the color of the outer button
    buttonText: PropTypes.string.isRequired, //the text of the outer button     
}
