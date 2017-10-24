import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { reactstrapColors, reactstrapButtonSizes } from '../reactstrapStyles.js';

/*
*   ScreenChangeButton is a button that changes the currently rendered screen in MainView, 
*/
export default class ScreenChangeButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <Button onClick={() => this.props.changeScreen(this.props.screen)}
                size="lg" color="primary">{this.props.buttonText}</Button>
            </div>
        );
    }    
}

ScreenChangeButton.propTypes = {
        buttonSize: PropTypes.oneOf(reactstrapButtonSizes).isRequired,
        buttonColor: PropTypes.oneOf(reactstrapColors).isRequired,
        buttonText: PropTypes.string.isRequired
}