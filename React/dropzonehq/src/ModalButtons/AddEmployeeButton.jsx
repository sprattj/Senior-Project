import React from 'react';
import ModalButton from './ModalButton.jsx';
import {Form} from 'reactstrap';
import TextArea from '../TextInputs/TextArea.jsx';
import JobsDropdown from '../Dropdowns/JobsDropdown.jsx';

export default class AddEmployeeButton extends React.Component {
   
  authorize(){
    console.log("Authorized");
  }
 
    render() {
       const modalContent = <Form>
       <TextArea id="addEmployeeFirstNameTextArea" labelText="First Name:"/>
       <TextArea id="addEmployeeLastNameTextArea" labelText="Last Name:"/>
       <JobsDropdown/>
       </Form>;      
       return (
           <ModalButton buttonSize="md" buttonColor={"primary"} buttonText={"New Employee"} modalTitle={"New Employee"}
                        modalContent={modalContent}
                        modalPrimaryButtonText="Add"
                        modalPrimaryClick={this.authorize}/>
        );
     }
 }