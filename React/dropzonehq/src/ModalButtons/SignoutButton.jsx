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
   
  authorize(){
    console.log("Authorized");
  }
 
    render() {
      const modalContent = <Form><InstructorDropdown/><RigDropdown/><PlaneLoadDropdown/></Form>;
       return (
           <ModalButton buttonSize="md" buttonColor={"primary"} buttonText={"Signout Rig"} modalTitle={"Signout Rig"}
                        modalContent={modalContent}
                        modalPrimaryButtonText="Signout"
                        modalPrimaryClick={this.authorize}/>
        );
     }
 }