import React from 'react';
import ModalButton from './ModalButton.jsx';

export default class DeleteEmployeeButton extends React.Component {
   
  authorize(){
    console.log("Authorized");
  }
 
    render() {
       return (
           <ModalButton buttonSize="md" buttonColor={"primary"} buttonText={"Delete"} modalTitle={"Delete Employee"}
                        modalContent={<p>Are you sure you want to delete this employee?</p>}
                        modalPrimaryButtonText="Delete"
                        modalPrimaryClick={this.authorize}/>
        );
     }
 }