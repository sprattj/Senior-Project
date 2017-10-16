import React from 'react';
import ModalButton from './ModalButton.jsx';
import {Form} from 'reactstrap'
import TextArea from '../TextInputs/TextArea.jsx';
import JobsDropdown from '../Dropdowns/JobsDropdown.jsx';


export default class EditEmployeeButton extends React.Component {
   
  authorize(){
    console.log("Authorized");
  }
 
    render() {
       const modalContent = <Form>
       <TextArea id="editEmployeeFirstNameTextArea" labelText="First Name:"/>
       <TextArea id="editEmployeeLastNameTextArea" labelText="Last Name:"/>
       <JobsDropdown/>
       </Form>;
       return (
           <ModalButton buttonSize="md" buttonColor={"primary"} buttonText={"Edit"} modalTitle={"Edit Employee"}
                        modalContent={modalContent}
                        modalPrimaryButtonText="Save"
                        modalPrimaryClick={this.authorize}/>
        );
     }
 }