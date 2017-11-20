import React from 'react';
import VerifyForm from '../VerifyForm.jsx';
import { Button, Popover, PopoverTitle, PopoverContent } from 'reactstrap';

export default class RentReturnButton extends React.Component {
    constructor(props) {
        super(props);
        this.onClickFunction = this.onClickFunction.bind(this);
        this.toggleVerifyModal = this.toggleVerifyModal.bind(this);

        this.state = {
            verifyOpen: false
        }
    }

    //change the VERFIY modal's visibility via state
    toggleVerifyModal() {
        console.log("RentButton: toggleVerifyModal: ");
        this.setState({
            verifyOpen: !this.state.verifyOpen
        });
    }

    onClickFunction() {
        console.log(this.props);
        this.toggleVerifyModal();
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
    }

    titleSelect(text) {
        var title = "";
        if (text) {
            {
                if (text === "Return") {
                    title = "Verify Return";
                } else if (text === "Rent") {
                    title = "Verify Rental";
                } else {
                    //do nothing on click if it doesnt say Rent or Return the button isnt being used properly
                }
            }
        }
        return title
    }


    render() {
        var buttonID = "RentReturnButton" + this.props.index;
        
        return (
            <div>
                <Button onClick={this.onClickFunction}
                    size="lg"
                    color="primary"
                    id={buttonID} > {this.props.buttonText} </Button>

                <Popover placement="bottom" isOpen={this.state.verifyOpen} target={buttonID} toggle={this.toggleVerifyModal}>
                    <PopoverTitle>{this.titleSelect(this.props.buttonText)}</PopoverTitle>
                    <PopoverContent>
                        <VerifyForm pinChanged={this.props.pinChanged} />
                        <Button color="primary" onClick={this.packButton}>Verify</Button>{' '}
                        <Button color="secondary" onClick={this.toggleVerifyModal}>Cancel</Button>
                    </PopoverContent>
                </Popover>
            </div>
        );
    }
}