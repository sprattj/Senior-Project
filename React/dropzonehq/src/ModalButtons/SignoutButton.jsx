import React from 'react';
import { Form, Input, InputGroup, InputGroupAddon } from 'reactstrap';
import ModalWithVerify from '../ModalWithVerify.jsx';
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
    this.addSignout = this.addSignout.bind(this);
    this.rigChanged = this.rigChanged.bind(this);
    this.planeLoadChanged = this.planeLoadChanged.bind(this);
    //keep state for the values of the components in this modal
    this.state = {
      rig_id: 111,
      planeLoad: 111
    }
  }

  //when the selected rig is changed, update our state
  rigChanged(rigData) {
    this.setState({
      rig_id: rigData.rig_id
    })
    console.log(rigData);
  }

  //when the selected plane load is changed, update our state
  planeLoadChanged(event) {
    this.setState({
      planeLoad: event.target.value
    })
    console.log(this.state.planeLoad);
  }

  addSignout() {
    console.log("Click!");
    this.props.authorize(
      this.state.planeLoad,
      this.state.rig_id
    );
  }

  render() {
    const modalContent =
      <Form>
        <RigDropdown sheetType={this.props.sheetType} onChange={this.rigChanged} />
        <InputGroup>
          <InputGroupAddon >Plane Load </InputGroupAddon>
          <Input id="addPlaneLoad" type="number" pattern="[0-9]*" onChange={this.planeLoadChanged} />
        </InputGroup>
      </Form>;
    return (
      <ModalWithVerify
        mainButtonColor="primary"
        mainButtonText="Signout Rig"
        modalButtonText="Signout"
        modalTitle="Signout Rig"
        ID="SignoutButton"
        modalContent={modalContent}
        popoverTitle="Confirm Signout"
        verify={this.addSignout}
        pinChanged={this.props.pinChanged}
      />
    );
  }
}