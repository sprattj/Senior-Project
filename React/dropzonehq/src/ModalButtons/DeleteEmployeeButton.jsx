import React from 'react';
import ModalButton from './ModalButton.jsx';

export default class DeleteEmployeeButton extends React.Component {
  constructor(props) {
    super(props);

    this.verify = this.verify.bind(this);

    this.state = {
      id: null
    }
  }
  verify() {
    this.props.onClick(this.state.id);
  }

  render() {
    return (
      <ModalButton buttonSize="md" buttonColor={"danger"} buttonText={"Delete"} modalTitle={"Delete Employee"}
        modalContent={<p>Are you sure you want to delete this employee?</p>}
        modalPrimaryButtonText="Delete"
        modalPrimaryClick={this.verify} />
    );
  }
}