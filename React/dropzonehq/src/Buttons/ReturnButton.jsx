import React from 'react';
import VerifyForm from '../VerifyForm.jsx';
import { Button, Popover, PopoverTitle, PopoverContent } from 'reactstrap';

export default class ReturnButton extends React.Component {
    constructor(props) {
        super(props);
        this.toggleVerifyModal = this.toggleVerifyModal.bind(this);
        this.callReturnItem = this.callReturnItem.bind(this);

        this.state = {
            verifyOpen: false
        }
    }

    //change the VERFIY modal's visibility via state
    toggleVerifyModal() {
        this.setState({
            verifyOpen: !this.state.verifyOpen
        });
    }

    callReturnItem() {
        this.toggleVerifyModal();
        this.props.return(this.props.index, this.props.rental_id); 
    }
   

    render() {
        var buttonID = "ReturnButton" + this.props.index;

        return (
            <div>
                <Button onClick={this.toggleVerifyModal}
                    size="lg"
                    color="primary"
                    id={buttonID} > {"Return"} </Button>

                <Popover placement="bottom" isOpen={this.state.verifyOpen} target={buttonID} toggle={this.toggleVerifyModal}>
                    <PopoverTitle>{"Verify Return"}</PopoverTitle>
                    <PopoverContent>
                        <VerifyForm pinChanged={this.props.pinChanged} />
                        <Button color="primary" onClick={this.callReturnItem}>Verify</Button>{' '}
                        <Button color="secondary" onClick={this.toggleVerifyModal}>Cancel</Button>
                    </PopoverContent>
                </Popover>
            </div>
        );
    }
}