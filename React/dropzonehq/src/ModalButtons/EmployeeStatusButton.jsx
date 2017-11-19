import React from 'react';
import ModalButton from './ModalButton.jsx';

export default class EmployeeStatusButton extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

  }
  toggle() {
    this.props.toggleEmployeeStatus(this.props.employee_id);
  }
  

  render() {
    var name = this.props.firstName + " " + this.props.lastName;
    var title = "Toggle Employee: " + name;
    var btnColor = "success";
    var btnText = "Activate";
    if(this.props.status === true){
      btnColor = "danger";
      btnText = "disactive"
    }

    return (
      <ModalButton buttonSize="md" buttonColor={btnColor} buttonText={btnText} modalTitle={title}
        modalContent={<p>Are you sure you want to {btnText} the employment status of {name}?</p>}
        modalPrimaryButtonText={btnText}
        modalPrimaryClick={this.toggle} />
    );
  }
}
