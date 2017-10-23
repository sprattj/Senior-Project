import React from 'react';
import ModalButton from './ModalButton.jsx';
import Checkbox from '../CheckBox/Checkbox.js';
import { Form, FormGroup, Input, Label, Row, Col, InputGroup, InputGroupAddon } from 'reactstrap';

export default class AddEmployeeButton extends React.Component {

  constructor(props) {
    super(props);

    this.verify = this.verify.bind(this);

    this.fullNameChanged = this.fullNameChanged.bind(this);
    this.infoChanged = this.infoChanged.bind(this);
    this.jobsChanged = this.jobsChanged.bind(this);

    this.state = {
      fullName: '',
      info: '',
      jobs: []
    }
  }

  verify() {
    this.props.authorize(this.state.fullName, this.state.info, this.state.jobs);
    this.setState({ fullName: '',
                    info: '',
                    jobs: ''})
  }

  fullNameChanged(e) {
    this.setState({ fullName: e.target.value });
  }

  infoChanged(e) {
    this.setState({ info: e.target.value });
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
    console.log(newJobs);
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
      var nextItem = <Checkbox label={nextJob} updateCheckBoxArray={this.jobsChanged} />

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
        <InputGroupAddon >Full Name: </InputGroupAddon>
        <Input id="addEmployeeFullName" type='text' value={this.state.fullName} onChange={this.fullNameChanged} />
      </InputGroup>
      <br />
      <InputGroup>
        <InputGroupAddon >Info:</InputGroupAddon>
        <Input id="addEmployeeInfo" type='text' value={this.state.info} onChange={this.infoChanged} />
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