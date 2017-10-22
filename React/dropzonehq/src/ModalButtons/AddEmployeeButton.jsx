import React from 'react';
import ModalButton from './ModalButton.jsx';
import { Form, FormGroup, Input, Label, Row, Col, InputGroup, InputGroupAddon } from 'reactstrap';

export default class AddEmployeeButton extends React.Component {

  authorize() {
    console.log("Authorized");
  }

  getCheckBoxes() {
    var jobs = ["Rigger", "Loft Head", "Loft Employee", "Tandem Instructor",
      "AFP Instructor", "Packer", "Manifest", "Videographer",
      "Hanger Master", "Administrator"];
    var col1 = [];
    var col2 = [];
    var col3 = [];

    for (var i = 0; i < jobs.length; i++) {
      var nextJob = jobs[i];
      var nextItem = <Label check>
        <Input type="checkbox" />{' '}
        {nextJob}
      </Label>;

      if (i % 3 === 0) {
        col1.push(nextItem);
      } else if (i % 3 === 1) {
        col2.push(nextItem);
      } else if (i % 3 === 2) {
        col3.push(nextItem);
      }
    }
    return (<Row>
      <Col>{col1}</Col>
      <Col>{col2}</Col>
      <Col>{col3}</Col>
    </Row>
    );
  }

  render() {
    const checkboxes = this.getCheckBoxes();
    const modalContent = <Form>
      <InputGroup>
        <InputGroupAddon id="addEmployeeLastName">First Name:</InputGroupAddon>
        <Input />
      </InputGroup>
      <br />
      <InputGroup>
        <InputGroupAddon id="addEmployeeLastName">Last Name:</InputGroupAddon>
        <Input />
      </InputGroup>
      <br />
      <Col>
        <h3>Job(s)</h3>
        <FormGroup check>
          {checkboxes}
        </FormGroup>
      </Col>
    </Form>;
    return (
      <ModalButton buttonSize="md" buttonColor={"primary"} buttonText={"New Employee"} modalTitle={"New Employee"}
        modalContent={modalContent}
        modalPrimaryButtonText="Add"
        modalPrimaryClick={this.authorize} />
    );
  }
}