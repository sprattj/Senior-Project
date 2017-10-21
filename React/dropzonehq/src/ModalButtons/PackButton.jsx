import React from 'react';
import VerifyForm from '../VerifyForm.jsx';
import { Button, Popover, PopoverTitle, PopoverContent } from 'reactstrap';

/*
  A PackButton is a button for rigsheets.
  It says pack, and when clicked, displays a modal
  that prompts the user to authorize with their ID, 
  then marks the rig as packed.
*/
export default class PackButton extends React.Component {

  constructor(props) {
    super(props);
    //bind our onchange methods so they can be passed properly 
    //with this.methodName from the onChange props in render
    this.toggleVerifyModal = this.toggleVerifyModal.bind(this);

    //keep state for the values of the components in this modal
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

  render() {
    console.log(this.props.index);
    var buttonID = "PackButton" + this.props.index;
    return (
      <div>
        <Button size="md" color="primary"
          onClick={this.toggleVerifyModal} id={buttonID}>Pack</Button>

        <Popover placement="bottom" isOpen={this.state.verifyOpen} target={buttonID} toggle={this.toggleVerifyModal}>
          <PopoverTitle>Verify Packing</PopoverTitle>
          <PopoverContent>
            <VerifyForm passwordChanged={this.props.passwordChanged} usernameChanged={this.props.usernameChanged} />
            <Button color="primary" onClick={() => this.props.authorize(this.props.index, this.props.instructor)}>Verify</Button>{' '}
            <Button color="secondary" onClick={this.toggleVerifyModal}>Cancel</Button>
          </PopoverContent>
        </Popover>
      </div>
    );
  }
}
/*
<ModalButton buttonSize="md" buttonColor={"primary"} buttonText={"Pack"} modalTitle={"Confirm action?"}
        modalContent={
          <div>
            <h3><b>Pack rig {this.props.rig} from {this.props.instructor} on load {this.props.load}?</b></h3>
            <VerifyForm passwordChanged={this.props.passwordChanged} usernameChanged={this.props.usernameChanged}/>
          </div>}
        modalPrimaryButtonText="Authorize"
        modalPrimaryClick={() => this.props.authorize(this.props.index, this.props.instructor)} />
*/