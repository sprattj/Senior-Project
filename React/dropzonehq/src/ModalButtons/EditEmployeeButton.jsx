import React from 'react';
import ModalButton from './ModalButton.jsx';
import Checkbox from '../CheckBox/Checkbox.js';
import { Form, FormGroup, Row, Col, InputGroup, InputGroupAddon } from 'reactstrap';
import UncontrolledTextInput from '../UnControlledTextInput.jsx';
import Binder from '../Binder.js';

export default class EditEmployeeButton extends React.Component {

    constructor(props) {
        super(props);

        //creater a new binder and bind all of the methods in this class
        var binder = new Binder();
        binder.bindAll(this, EditEmployeeButton);

        this.state = {
            firstName: this.props.firstName,
            lastName: this.props.lastName,
            email: this.props.email,
            jobs: this.props.roles
        }
    }

    //Updates the edited Employee by passing the states of this component to its parent component
    //Then is sets its states to nothing to be used by the next row that's edit button it clicked
    update() {
        this.props.authorize(this.props.id, this.state.firstName, this.state.lastName, this.state.email, this.state.jobs);
        this.setState({
            firstName: '',
            lastName: '',
            email: '',
            jobs: []
        });
        return true;
    }

    //updates the first name state when the first name text field is edited
    firstNameChanged(e) {
        this.setState({ firstName: e.target.value });
    }

    //updates the last name state when the last name text field is edited
    lastNameChanged(e) {
        this.setState({ lastName: e.target.value });
    }

    //updates the email state when the email text field is edited
    emailChanged(e) {
        this.setState({ email: e.target.value });
    }

    //updates the jobs state by checking which checkboxes are checked and unchecked
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

    //Gets the original roles of the employee and checks the appropriate checkboxes
    //as the modal is being rendered
    getCheckBoxes(jobsList) {
        console.log("Hey this is your job list!");
        console.log(jobsList);
        var jobsArray = ["rigger", "loft head", "loft employee", "tandem instructor",
            "afp instructor", "packer", "manifest", "videographer",
            "hanger master", "administrator"];//list of all possible roles
        var col1 = [];
        var col2 = [];
        var col3 = [];

        if (jobsList) {
            this.state({
                jobs: jobsList
            });
            var alreadyChecked = false;
            for (var i = 0; i < jobsArray.length; i++) {
                var nextJob = jobsArray[i];
                for (var j = 0; j < this.state.jobs.length; j++) {
                    if (nextJob === this.state.jobs[j]) {
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
        const checkboxes = this.getCheckBoxes(this.state.jobs);
        const modalContent = <Form>
            <InputGroup>
                <InputGroupAddon >First Name: </InputGroupAddon>
                    <UncontrolledTextInput
                        onBlur={this.firstNameChanged}
                        id="editEmployeeFirstName"
                        defaultText={this.props.firstName}
                    />
            </InputGroup>
            <br />
            <InputGroup>
                <InputGroupAddon >Last Name: </InputGroupAddon>
                    <UncontrolledTextInput
                        onBlur={this.lastNameChanged}
                        id="editEmployeeLastName"
                        defaultText={this.props.lastName}
                    />            
            </InputGroup>
            <br />
            <InputGroup>
                <InputGroupAddon >Email </InputGroupAddon>
                    <UncontrolledTextInput
                        onBlur={this.emailChanged}
                        id="editEmployeeEmail"
                        defaultText={this.props.email}
                    />               
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
                modalPrimaryClick={this.update} />
        );
    }
}