import React from 'react';
import { Form, Button} from 'reactstrap';
import ModalDialog from '../ModalDialog.jsx';
import VerifyPopover from '../VerifyPopover.jsx';
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
    this.toggleSignoutModal = this.toggleSignoutModal.bind(this);
    this.toggleVerifyModal = this.toggleVerifyModal.bind(this);
    this.verify = this.verify.bind(this);

    this.instructorChanged = this.instructorChanged.bind(this);
    this.rigChanged = this.rigChanged.bind(this);
    this.planeLoadChanged = this.planeLoadChanged.bind(this);
    //keep state for the values of the components in this modal
    this.state = {
      instructor: 'Input text here..',
      selectedRig: 'problem',
      planeLoad: '123',
      signoutOpen: false,
      verifyOpen: false
    }
  }

  //change the SIGNOUT modal's visibility via state
  toggleSignoutModal() {
    this.setState({
      signoutOpen: !this.state.signoutOpen
    });
  }

  //change the VERFIY modal's visibility via state
  toggleVerifyModal() {
    this.setState({
      verifyOpen: !this.state.verifyOpen
    });
  }

  //when selected instructor is changed, update our state
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

  //when the selected plane load is changed, update our state
  planeLoadChanged(id, planeLoad) {
    this.setState({
      planeLoad: planeLoad
    })
    console.log(this.state.planeLoad);
  }

  verify() {
    console.log("Click!");
    this.props.authorize(this.state.instructor, this.state.planeLoad, this.state.selectedRig);
  }

  render() {
    const modalContent =
      <Form>
        <InstructorDropdown onChange={this.instructorChanged} />
        <RigDropdown onChange={this.rigChanged} />
        <PlaneLoadDropdown onChange={this.planeLoadChanged} />
      </Form>;

    return (
      <div>
        <Button size="lg" color="primary"
          onClick={this.toggleSignoutModal}>Signout Rig</Button>

        <ModalDialog title="Signout Rig"
          isOpen={this.state.signoutOpen}
          onCancelClick={this.toggleSignoutModal}
          primaryButtonText="Signout"
          onPrimaryClick={this.toggleVerifyModal}
          primaryButtonID="SignoutButton">
          {modalContent}
        </ModalDialog>

        <VerifyPopover isOpen={this.state.verifyOpen}
          title={"Confirm Signout"}
          buttonID="SignoutButton"
          toggle={this.toggleVerifyModal}
          verify={this.verify}
          passwordChanged={this.props.passwordChanged}
          usernameChanged={this.props.usernameChanged} />
      </div>
    );
  }
}