import React from 'react';
import ModalButton from './ModalButton.jsx';
import Checkbox from '../CheckBox/Checkbox.js';
import { Form, FormGroup, Input, Row, Col, InputGroup, InputGroupAddon } from 'reactstrap';

export default class EditEmployeeButton extends React.Component {

    constructor(props) {
        super(props);

        this.verify = this.verify.bind(this);

        this.firstNameChanged = this.firstNameChanged.bind(this);
        this.lastNameChanged = this.lastNameChanged.bind(this);
        this.jobsChanged = this.jobsChanged.bind(this);
        this.email = this.email.bind(this);


        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            jobs: this.props.roles
        }
    }

    verify() {
        this.props.authorize(this.props.id, this.state.firstName, this.state.lastName, this.state.email, this.state.jobs);
        this.setState({
            firstName: '',
            lastName: '',
            email: '',
            jobs: []
        });
        return true;
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
        console.log(newJobs);
        this.setState({
            jobs: newJobs
        })
    }

    getCheckBoxes() {
        var jobsArray = ["Rigger", "Loft Head", "Loft Employee", "Tandem Instructor",
            "AFP Instructor", "Packer", "Manifest", "Videographer",
            "Hanger Master", "Administrator"];
        var col1 = [];
        var col2 = [];
        var col3 = [];
        var alreadyChecked = false;
        if (this.jobs.length > 0) {
            for (var i = 0; i < jobsArray.length; i++) {
                var nextJob = jobsArray[i];
                for (var j = 0; j < this.jobs.length; j++) {
                    if (nextJob === this.jobs[j]) {
                        var NextItem = <Checkbox isChecked={true} key={i} label={nextJob} updateCheckBoxArray={this.jobsChanged} />
                        alreadyChecked = true;
                    }
                }
                if (!alreadyChecked) {
                    var nextItem = <Checkbox isChecked={false} key={i} label={nextJob} updateCheckBoxArray={this.jobsChanged} />
                }
                if (i % 3 === 0) {
                    col1.push(nextItem);
                } else if (i % 3 === 1) {
                    col2.push(nextItem);
                } else if (i % 3 === 2) {
                    col3.push(nextItem);
                }
                alreadyChecked = false;
            }
        } else {
            for (var i = 0; i < jobsArray.length; i++) {
                var t = true;
                var nextJob = jobsArray[i];
                var nextItem = <Checkbox isChecked={false} key={i} label={nextJob} updateCheckBoxArray={this.jobsChanged} />

                if (i % 3 === 0) {
                    col1.push(nextItem);
                } else if (i % 3 === 1) {
                    col2.push(nextItem);
                } else if (i % 3 === 2) {
                    col3.push(nextItem);
                }
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
                <InputGroupAddon >First Name: </InputGroupAddon>
                <Input id="editEmployeeFirstName" type='text' value={this.state.firstName} onChange={this.firstNameChanged} />
            </InputGroup>
            <br />
            <InputGroup>
                <InputGroupAddon >Last Name: </InputGroupAddon>
                <Input id="editEmployeeLastName" type='text' value={this.state.lastName} onChange={this.lastNameChanged} />
            </InputGroup>
            <br />
            <InputGroup>
                <InputGroupAddon >Email </InputGroupAddon>
                <Input id="editEmployeeEmail" type='email' value={this.state.email} onChange={this.emailChanged} />
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
            <ModalButton buttonSize="md" buttonColor={"primary"} buttonText={"Edit"} modalTitle={"Edit Employee"}
                modalContent={modalContent}
                modalPrimaryButtonText="Save"
                modalPrimaryClick={this.verify} />
        );
    }
}