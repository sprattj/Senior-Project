import React from 'react';
import ModalButton from './ModalButton.jsx';

/*
  A PackButton is a button for rigsheets.
  It says pack, and when clicked, displays a modal
  that prompts the user to authorize with their ID, 
  then marks the rig as packed.
*/
export default class PackButton extends React.Component {
   
  authorize(){
    console.log("Authorized");
  }
 
    render() {
       return (
           <ModalButton buttonSize="md" buttonColor={"primary"} buttonText={"Pack"} modalTitle={"Confirm action?"}
                        modalContent={<p>The modal body content</p>}
                        modalPrimaryButtonText="Authorize"
                        modalPrimaryClick={this.authorize}/>
        );
     }
 }