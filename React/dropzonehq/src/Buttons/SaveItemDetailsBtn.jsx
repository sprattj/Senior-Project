import React from 'react';
import { Button } from 'reactstrap';

export default class SaveItemDetailsBtn extends React.Component 
{
    constructor(props) {
        super(props);
        this.onClickFunction = this.onClickFunction.bind(this);
        
        this.setState = {
            disabled: this.props.disabled
        }
    }

    onClickFunction() 
    {
        console.log(this.props);
        

    }


    render() {
        return (
            <div>
                <Button onClick={this.onClickFunction}
                    size="lg"
                    color="primary"
                    disabled={this.props.disabled}>{this.props.buttonText}
                </Button>
            </div>
        );
    }
}