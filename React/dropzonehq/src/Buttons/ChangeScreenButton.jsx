import React from 'react';
import { Button } from 'reactstrap';
//import { reactstrapColors, reactstrapButtonSizes } from '../reactstrapStyles.js';

/*
*   ScreenChangeButton is a button that changes the currently rendered screen in MainView, 
*/
export default class ScreenChangeButton extends React.Component {

    render() {
        return(
            <div>
                <Button onClick={() => this.props.changeScreen(this.props.screen)}
                size="lg" color="primary">{this.props.buttonText}</Button>
            </div>
        );
    }    
}

