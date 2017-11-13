import React from 'react';
import { Form } from 'reactstrap';
import ModalWithVerify from '../ModalWithVerify.jsx';
import RigDropdown from '../Dropdowns/RigDropdown.jsx';
import ProblemTypesDropdown from '../Dropdowns/ProblemTypesDropdown.jsx';

/*
  A PackedWrongRigButton is a button for reporting that an employee
  marked the wrong rig as packed.
*/
export default class PackedWrongRigButton extends React.Component {

  constructor(props) {
    super(props);
    //bind our onchange methods so they can be passed properly 
    //with this.methodName from the onChange props in render
    this.textChanged = this.textChanged.bind(this);
    this.rigChanged = this.rigChanged.bind(this);
    this.problemChanged = this.problemChanged.bind(this);
    //keep state for the values of the components in this modal
    this.state = {
      noteText: 'Input text here..',
      selectedRig: 'problem',
      selectedProblem: 'rig'
    }
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
    const modalContent = 
    (<Form>
      <RigDropdown onChange={this.rigChanged} />
      <ProblemTypesDropdown onChange={this.problemChanged} />
    </Form>);

    return (
      <ModalWithVerify
        mainButtonColor="danger"
        mainButtonText="I Packed the Wrong Rig"
        modalButtonText="Report"
        modalTitle="Rig Packing Correction"
        ID="PackedWrongRig"
        modalContent={modalContent}
        popoverTitle="Confirm Report"
        verify={this.props.verify}
        pinChanged={this.props.pinChanged}
      />
    );
  }
}