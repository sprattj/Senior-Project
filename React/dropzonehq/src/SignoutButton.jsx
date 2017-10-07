import React from 'react';
import ModalButton from './ModalButton.jsx';
import InstructorDropdown from './InstructorDropdown.jsx';

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
      const modalContent = <InstructorDropdown/>
       return (
           <ModalButton buttonText={"Signout Rig"} modalTitle={"Signout Rig"}
                        modalContent={modalContent}
                        modalPrimaryButtonText="Signout"
                        modalPrimaryClick={this.authorize}/>
        );
     }
 }