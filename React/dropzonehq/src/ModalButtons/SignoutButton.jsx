import React from 'react';
import { Form } from 'reactstrap';
import ModalButton from './ModalButton.jsx';
import RigDropdown from '../Dropdowns/RigDropdown.jsx';
import PlaneLoadDropdown from '../Dropdowns/PlaneLoadDropdown.jsx';
import InstructorDropdown from '../Dropdowns/InstructorDropdown.jsx';

/*
  A SignoutButton is a button for signing out rigs on rigsheets.
  It says 'Signout Rig', and when clicked, displays a modal
  that prompts the user to select the rig and other signout info,
  authorize with user id&pin, and then puts the signout into the database. 
*/
export default class SignoutButton extends React.Component {

  constructor(props) {
    super(props);
    //bind our onchange methods so they can be passed properly 
    //with this.methodName from the onChange props in render
    this.instructorChanged = this.instructorChanged.bind(this);
    this.rigChanged = this.rigChanged.bind(this);
    this.planeLoadChanged = this.planeLoadChanged.bind(this);
    //keep state for the values of the components in this modal
    this.state = {
      instructor: 'Input text here..',
      selectedRig: 'problem',
      planeLoad: '123'
    }
  }

  //when the text area text is changed, update our state
  instructorChanged(id, selectedInstr) {
    this.setState({
      instructor: selectedInstr
    })
    console.log(this.state);
  }

  //when the selected rig is changed, update our state
  rigChanged(id, rig) {
    this.setState({
      selectedRig: rig
    })
    console.log(this.state.selectedRig);
  }

  //when the selected problem type is changed, update our state
  planeLoadChanged(id, planeLoad) {
    this.setState({
      planeLoad: planeLoad
    })
    console.log(this.state.planeLoad);
  }

  render() {
    const modalContent =
      <Form>
        <InstructorDropdown onChange={this.instructorChanged} />
        <RigDropdown onChange={this.rigChanged} />
        <PlaneLoadDropdown onChange={this.planeLoadChanged} />
      </Form>;
    return (
      <ModalButton buttonSize="md" buttonColor={"primary"} buttonText={"Signout Rig"} modalTitle={"Signout Rig"}
        modalContent={modalContent}
        modalPrimaryButtonText="Signout"
        modalPrimaryClick={() => this.props.authorize(this.state.instructor, this.state.planeLoad, this.state.selectedRig)} />
    );
  }
}