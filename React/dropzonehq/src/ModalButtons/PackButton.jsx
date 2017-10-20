import React from 'react';
import ModalButton from './ModalButton.jsx';
import VerifyForm from '../VerifyForm.jsx';

/*
  A PackButton is a button for rigsheets.
  It says pack, and when clicked, displays a modal
  that prompts the user to authorize with their ID, 
  then marks the rig as packed.
*/
export default class PackButton extends React.Component {

  render() {
    console.log(this.props.index);
    return (
      <ModalButton buttonSize="md" buttonColor={"primary"} buttonText={"Pack"} modalTitle={"Confirm action?"}
        modalContent={
          <div>
            <h3><b>Pack rig {this.props.rig} from {this.props.instructor} on load {this.props.load}?</b></h3>
            <VerifyForm passwordChanged={this.props.passwordChanged} usernameChanged={this.props.usernameChanged}/>
          </div>}
        modalPrimaryButtonText="Authorize"
        modalPrimaryClick={() => this.props.authorize(this.props.index, this.props.instructor)} />
    );
  }
}