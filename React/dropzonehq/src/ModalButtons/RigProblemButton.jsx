import React from 'react';
import { Form } from 'reactstrap';
import RigDropdown from '../Dropdowns/RigDropdown.jsx';
import ProblemTypesDropdown from '../Dropdowns/ProblemTypesDropdown.jsx';
import TextArea from '../TextInputs/TextArea.jsx';
import ModalWithVerify from '../ModalWithVerify.jsx';
import Binder from '../Binder.js';
/*

*/
export default class RigProblemButton extends React.Component {

  constructor(props) {
    super(props);

    //creater a new binder and bind all of the methods in this class
    var binder = new Binder();
    binder.bindAll(this, RigProblemButton);

    //keep state for the values of the components in this modal
    this.state = {
      description: 'Input text here..',
      rig_id: 0,
      severity: 'CRITICAL',
      pin: 0
    }
  }

  verify() {
    this.props.verify(this.state.rig_id, this.state.severity, this.state.description)
  }

  //when the text area text is changed, update our state
  textChanged(id, text) {
    this.setState({
      description: text
    })
  }
  //when the selected rig is changed, update our state
  rigChanged(rig) {
    this.setState({
      rig_id: rig.rig_id
    })
  }
  //when the selected problem type is changed, update our state
  problemChanged(problem) {
    this.setState({
      severity: problem
    })
  }

  //update pin
  pinChanged(id, pin) {
    this.setState({
      pin: pin
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
        pinChanged={this.pinChanged}
      />
    );
  }
}