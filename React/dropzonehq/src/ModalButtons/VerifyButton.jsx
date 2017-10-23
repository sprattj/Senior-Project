import React from 'react';
import ModalButton from './ModalButton.jsx';
import VerifyForm from '../VerifyForm.jsx';

/*
  
*/
export default class VerifyButton extends React.Component {

  render() {
    console.log(this.props.index);
    return (
      <ModalButton buttonSize="md" buttonColor={"primary"} buttonText={"Verify"} modalTitle={"Confirm action?"}
        modalContent={
            <div>
                {VerifyForm}
            </div>}
        modalPrimaryButtonText="Authorize"
        modalPrimaryClick={() => this.props.authorize(this.props.index, this.props.instructor)} />
    );
  }
}