import React from 'react';
import ModalButton from './ModalButton.jsx';

export default class DeleteEmployeeButton extends React.Component {
  constructor(props) {
    super(props);

    this.verify = this.verify.bind(this);
  }
  verify() {
    this.props.authorize(this.props.id);
    return true;
  }
  

  render() {
    const name = this.props.firstName + " " + this.props.lastName;
    const title = "Delete Employee: " + name;
    return (
      <ModalButton buttonSize="md" buttonColor={"danger"} buttonText={"Delete"} modalTitle={title}
        modalContent={<p>Are you sure you want to delete {name}?</p>}
        modalPrimaryButtonText="Delete"
        modalPrimaryClick={this.verify} />
    );
  }
}