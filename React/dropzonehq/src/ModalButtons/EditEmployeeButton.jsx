import React from 'react';
import ModalButton from './ModalButton.jsx';
import {Form, Input, InputGroup, InputGroupAddon} from 'reactstrap';


export default class EditEmployeeButton extends React.Component {
   
  authorize(){
    console.log("Authorized");
  }
 
    render() {
       const modalContent = <Form>
        <InputGroup>
            <InputGroupAddon id="addEmployeeLastName">First Name:</InputGroupAddon>
            <Input />
        </InputGroup>
        <br/>
        <InputGroup>
            <InputGroupAddon id="addEmployeeLastName">Last Name:</InputGroupAddon>
            <Input />
        </InputGroup>  
       </Form>;
       return (
           <ModalButton buttonSize="md" buttonColor={"primary"} buttonText={"Edit"} modalTitle={"Edit Employee"}
                        modalContent={modalContent}
                        modalPrimaryButtonText="Save"
                        modalPrimaryClick={this.authorize}/>
        );
     }
 }