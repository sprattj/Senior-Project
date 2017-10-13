import React from 'react';
import { Form } from 'reactstrap';
import ModalButton from './ModalButton.jsx';
import RigDropdown from '../Dropdowns/RigDropdown.jsx';
import PlaneLoadDropdown from '../Dropdowns/PlaneLoadDropdown.jsx';
import InstructorDropdown from '../Dropdowns/InstructorDropdown.jsx';
import ProblemTypesDropdown from '../Dropdowns/ProblemTypesDropdown.jsx';
import TextArea from '../TextInputs/TextArea.jsx';

/*
  A SignoutButton is a button for signing out rigs on rigsheets.
  It says 'Signout Rig', and when clicked, displays a modal
  that prompts the user to select the rig and other signout info,
  authorize with user id&pin, and then puts the signout into the database. 
*/
export default class RigProblemButton extends React.Component {
   
  authorize(){
    console.log("Authorized");
  }
 
    render() {
      const modalContent = <Form>
        <RigDropdown/>
        <ProblemTypesDropdown/>
        <TextArea id="problemNotesTextArea" labelText="Describe the problem:"/></Form>;
       return (
           <ModalButton buttonSize="lg" buttonColor="danger" buttonText={"Report Rig Issue or Damage"} 
                        modalTitle={"Rig Issue Report"}
                        modalContent={modalContent}
                        modalPrimaryButtonText="Signout"
                        modalPrimaryClick={this.authorize}/>
        );
     }
 }