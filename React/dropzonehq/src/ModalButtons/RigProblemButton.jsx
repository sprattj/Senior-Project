import React from 'react';
import { Form } from 'reactstrap';
import RigDropdown from '../Dropdowns/RigDropdown.jsx';
import ProblemTypesDropdown from '../Dropdowns/ProblemTypesDropdown.jsx';
import TextArea from '../TextInputs/TextArea.jsx';
import ModalWithVerify from '../ModalWithVerify.jsx';
/*

*/
export default class RigProblemButton extends React.Component {

  constructor(props) {
    super(props);

    //bind our onchange methods so they can be passed properly 
    //with this.methodName from the onChange props in render
    this.textChanged = this.textChanged.bind(this);
    this.rigChanged = this.rigChanged.bind(this);
    this.problemChanged = this.problemChanged.bind(this);
    this.verify = this.verify.bind(this);
    
    //keep state for the values of the components in this modal
    this.state = {
      description: 'Input text here..',
      rig_id: 0,
      severity: 'CRITICAL'
    }
  }

  verify(){
    this.props.verify(this.state.rig_id, this.state.severity, this.state.description)
  }

  //when the text area text is changed, update our state
  textChanged(id, text) {
    this.setState({
      noteText: text
    })
  }
  //when the selected rig is changed, update our state
  rigChanged(id, rig) {
    this.setState({
      selectedRig: rig
    })
  }
  //when the selected problem type is changed, update our state
  problemChanged(id, problem) {
    this.setState({
      selectedProblem: problem
    })
  }

  //pass the corresponding onchange methods down to the child components so 
  //we can get their values back here when they are changed
  render() {
    const modalContent = <Form>
      <RigDropdown onChange={this.rigChanged} />
      <ProblemTypesDropdown onChange={this.problemChanged} />
      <TextArea onChange={this.textChanged} id="problemNotesTextArea" labelText="Describe the problem:" /></Form>;
    return (
      <ModalWithVerify
        mainButtonColor="danger"
        mainButtonText="Report Rig Issue or Damage"
        modalButtonText="Report"
        modalTitle="Rig Issue Report"
        ID="RigIssueReport"
        modalContent={modalContent}
        popoverTitle="Confirm Report"
        verify={this.verify}
        pinChanged={this.props.pinChanged}
      />
    );
  }
}