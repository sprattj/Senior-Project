import React from 'react';
import ModalButton from './ModalButton.jsx';
import Checkbox from '../CheckBox/Checkbox.js';
import { Form, FormGroup, Alert, Input, Row, Col, InputGroup, InputGroupAddon } from 'reactstrap';

export default class AddEmployeeButton extends React.Component {

  constructor(props) {
    super(props);

    this.verify = this.verify.bind(this);

    this.firstNameChanged = this.firstNameChanged.bind(this);
    this.lastNameChanged = this.lastNameChanged.bind(this);   
    this.emailChanged  = this.emailChanged.bind(this); 
    this.jobsChanged = this.jobsChanged.bind(this);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      error: '',
      jobs: []
    }
  }

  verify() {

    if(this.state.firstName && this.state.lastName && this.state.email && this.state.jobs.length > 0){
      this.props.authorize(this.state.firstName, this.state.lastName, this.state.email, this.state.jobs);
      this.setState( {
        firstName: '',
        lastName: '',
        email: '',
        error: '',
        jobs: []
      });
      return true;
    }else{
      this.setState(
        {error: 'All fields are required to add an employee.'}
      );
      return false;
    }
  }

  firstNameChanged(e) {
    this.setState({ firstName: e.target.value });
  }

  lastNameChanged(e) {
    this.setState({ lastName: e.target.value });
  }

  emailChanged(e) {
    this.setState({ email: e.target.value });
  }

  jobsChanged(job) {
    var newJobs = Array.from(this.state.jobs);
    if (newJobs.length !== 0) {
      var found = false;
      for (var i = 0; i < newJobs.length; i++) {
        if (newJobs[i] === job) {
          newJobs.splice(i, 1);
          this.setState({
            jobs: newJobs
          })
          return;
        }
      }
      if (!found) {
        newJobs.push(job);
      }
    } else {
      newJobs.push(job);
    }
    this.setState({
      jobs: newJobs
    })
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
      var t = true;
      var nextItem = <Checkbox isChecked={false} key={i} label={nextJob} updateCheckBoxArray={this.jobsChanged} />

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
    var error = <div></div>
    if(this.state.error){
      error = <Alert color="danger">{this.state.error}</Alert>;
  }
    const checkboxes = this.getCheckBoxes();
    const modalContent = <Form>
      {error}
      <InputGroup>
        <InputGroupAddon >First Name: </InputGroupAddon>
        <Input id="addEmployeeFirstName" type='text' value={this.state.firstName} onChange={this.firstNameChanged} />
      </InputGroup>
      <br />
      <InputGroup>
        <InputGroupAddon >Last Name: </InputGroupAddon>
        <Input id="addEmployeeLastName" type='text' value={this.state.lastName} onChange={this.lastNameChanged} />
      </InputGroup>
      <br />
      <InputGroup>
        <InputGroupAddon >Email: </InputGroupAddon>
        <Input id="addEmployeeEmail" type='email' value={this.state.email} onChange={this.emailChanged} />
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
        modalPrimaryClick={this.verify} />
    );
  }
}

