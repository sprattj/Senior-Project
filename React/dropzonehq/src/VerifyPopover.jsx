import React from 'react';
import PropTypes from 'prop-types';
import { Button, Popover, PopoverTitle, PopoverContent } from 'reactstrap';
import VerifyForm from './VerifyForm.jsx';

export default class VerifyPopover extends React.Component {

    render() {
        return (
            <Popover placement="bottom" 
                     isOpen={this.props.isOpen} 
                     target={this.props.buttonID} 
                     toggle={this.props.toggle}
            >
                <PopoverTitle>{this.props.title}</PopoverTitle>
                <PopoverContent>
                    <VerifyForm pinChanged={this.props.pinChanged} />
                    <Button color="primary" onClick={this.props.verify}>Verify</Button>{' '}
                    <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
                </PopoverContent>
            </Popover>
        );
    }
}

VerifyPopover.propTypes = {
    isOpen: PropTypes.bool.isRequired, //whether this popover is open
    title: PropTypes.string.isRequired, //the title at the top of the modal
    buttonID: PropTypes.string.isRequired,
    toggle: PropTypes.func.isRequired, //the function to perform when the cancel button is clicked
    verify: PropTypes.func.isRequired,
    pinChanged: PropTypes.func.isRequired
  }