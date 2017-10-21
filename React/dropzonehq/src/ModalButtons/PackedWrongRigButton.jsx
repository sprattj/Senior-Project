import React from 'react';
import { Form, Button, Popover, PopoverTitle, PopoverContent } from 'reactstrap';
import ModalDialog from '../ModalDialog.jsx';
import VerifyForm from '../VerifyForm.jsx';
import RigDropdown from '../Dropdowns/RigDropdown.jsx';
import ProblemTypesDropdown from '../Dropdowns/ProblemTypesDropdown.jsx';

/*
  A PackedWrongRigButton is a button for reporting that an employee
  marked the wrong rig as packed.
*/
export default class PackedWrongRigButton extends React.Component {

  authorize() {
    console.log("Authorized");
  }

  constructor(props) {
    super(props);
    //bind our onchange methods so they can be passed properly 
    //with this.methodName from the onChange props in render
    this.toggleReportModal = this.toggleReportModal.bind(this);
    this.toggleVerifyModal = this.toggleVerifyModal.bind(this);
    this.verify = this.verify.bind(this);

    this.textChanged = this.textChanged.bind(this);
    this.rigChanged = this.rigChanged.bind(this);
    this.problemChanged = this.problemChanged.bind(this);
    //keep state for the values of the components in this modal
    this.state = {
      noteText: 'Input text here..',
      selectedRig: 'problem',
      selectedProblem: 'rig',
      reportOpen: false,
      verifyOpen: false
    }
  }

  verify() {
    console.log("Click!");
    //this.props.authorize(this.state.noteText, this.state.selectedRig, this.state.selectedProblem);
  }

  //change the REPORT modal's visibility via state
  toggleReportModal() {
    this.setState({
      reportOpen: !this.state.reportOpen
    });
  }

  //change the VERFIY modal's visibility via state
  toggleVerifyModal() {
    this.setState({
      verifyOpen: !this.state.verifyOpen
    });
  }

  //when the text area text is changed, update our state
  textChanged(id, text) {
    this.setState({
      noteText: text
    })
    console.log(this.state.noteText);
  }
  //when the selected rig is changed, update our state
  rigChanged(id, rig) {
    this.setState({
      selectedRig: rig
    })
    console.log(this.state.selectedRig);
  }
  //when the selected problem type is changed, update our state
  problemChanged(id, problem) {
    this.setState({
      selectedProblem: problem
    })
    console.log(this.state.selectedProblem);
  }

  //pass the corresponding onchange methods down to the child components so 
  //we can get their values back here when they are changed
  render() {
    const modalContent = <Form>
      <RigDropdown onChange={this.rigChanged} />
      <ProblemTypesDropdown onChange={this.problemChanged} />
    </Form>;
    return (
      <div>
        <Button size="lg" color="danger"
          onClick={this.toggleReportModal}>Report Rig Issue or Damage</Button>

        <ModalDialog title="Rig Issue Report"
          isOpen={this.state.reportOpen}
          onCancelClick={this.toggleReportModal}
          primaryButtonText="Report"
          onPrimaryClick={this.toggleVerifyModal}
          primaryButtonID="ReportButton">
          {modalContent}
        </ModalDialog>

        <Popover placement="bottom" isOpen={this.state.verifyOpen} target="ReportButton" toggle={this.toggleVerifyModal}>
          <PopoverTitle>Verify Report</PopoverTitle>
          <PopoverContent>
            <VerifyForm passwordChanged={this.props.passwordChanged} usernameChanged={this.props.usernameChanged} />
            <Button color="primary" onClick={this.verify}>Verify</Button>{' '}
            <Button color="secondary" onClick={this.toggleVerifyModal}>Cancel</Button>
          </PopoverContent>
        </Popover>
      </div>
    );
  }
}