import React from 'react';
import { Button } from 'reactstrap';

export default class SaveItemDetailsBtn extends React.Component {
    
    constructor(props) {
        super(props);
    }



    render() {
        return (
            <div>
                <Button onClick={this.props.onClick}
                    size="lg"
                    color="primary"
                    disabled={this.props.disabled}>{this.props.buttonText}
                </Button>
            </div>
        );
    }
}