import React from 'react';
import { Form } from 'reactstrap';
import ModalButton from './ModalButton.jsx';
import RigDropdown from '../Dropdowns/RigDropdown.jsx';
import PlaneLoadDropdown from '../Dropdowns/PlaneLoadDropdown.jsx';
import InstructorDropdown from '../Dropdowns/InstructorDropdown.jsx';
import ProblemTypesDropdown from '../Dropdowns/ProblemTypesDropdown.jsx';
import TextArea from '../TextInputs/TextArea.jsx';

/*

*/
export default class RigProblemButton extends React.Component {
   
  constructor(props) {
    super(props);
    //bind our onchange methods so they can be passed properly 
    //with this.methodName from the onChange props in render
    this.textChanged= this.textChanged.bind(this);
    this.rigChanged= this.rigChanged.bind(this);
    this.problemChanged= this.problemChanged.bind(this);
    //keep state for the values of the components in this modal
    this.state = {
      noteText: 'Input text here..',
      selectedRig: 'problem',
      selectedProblem: 'rig'
    }
  }

  //when the text area text is changed, update our state
  textChanged(id, text){
    this.setState({
      noteText: text
    })
    console.log(this.state.noteText);
  }
  //when the selected rig is changed, update our state
  rigChanged(id, rig){
    this.setState({
      selectedRig: rig
    })
    console.log(this.state.selectedRig);
  }

  //when the selected problem type is changed, update our state
  problemChanged(id, problem){
    this.setState({
      selectedProblem: problem
    })
    console.log(this.state.selectedProblem);
  }

  //what to do when the authorize button is clicked
  authorize(){
    console.log("Authorized");
  }
 
  //pass the corresponding onchange methods down to the child components so 
  //we can get their values back here when they are changed
    render() {
      const modalContent = <Form>
        <RigDropdown onChange={this.rigChanged}/>
        <ProblemTypesDropdown onChange={this.problemChanged}/>
        <TextArea onChange={this.textChanged} id="problemNotesTextArea" labelText="Describe the problem:"/></Form>;
       return (
           <ModalButton buttonSize="lg" buttonColor="danger" buttonText={"Report Rig Issue or Damage"} 
                        modalTitle={"Rig Issue Report"}
                        modalContent={modalContent}
                        modalPrimaryButtonText="Signout"
                        modalPrimaryClick={this.authorize}/>
        );
     }
 }