import React from 'react';
import { Button } from 'reactstrap';

export default class AddInventoryItemBtn extends React.Component 
{
    constructor(props) {
        super(props);
        // this.onClickFunction = this.onClickFunction.bind(this);
        
        this.setState = {
            disabled: this.props.disabled
        }
    }

/*     onClickFunction() {
        console.log(this.props);
        if (this.props.buttonText) {
            if (this.props.buttonText === "Return") {
                //return function
                this.props.return(this.props.rowID)
            } else if (this.props.buttonText === "Rent") {
                //rent out function
                this.props.rent(this.props.rowID)
            } else {
                //do nothing on click if it doesnt say Rent or Return the button isnt being used properly
            }
        }

    } */


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