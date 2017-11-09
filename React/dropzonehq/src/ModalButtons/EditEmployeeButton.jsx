import React from 'react';
import ModalButton from './ModalButton.jsx';
import {Form, Input, InputGroup, InputGroupAddon} from 'reactstrap';


export default class EditEmployeeButton extends React.Component {
   
    constructor(props){
        super(props);
        this.authorize = this.authorize.bind(this);
    }
  authorize(){
      this.props.onClick(); //TODO keep state for the first name and last name and other info and send them here
    console.log("Authorized");
  }
 
    render() {
       const modalContent = <Form>
        <InputGroup>
            <InputGroupAddon id="addEmployeeFullName">First Name:</InputGroupAddon>
            <Input />
        </InputGroup>
        <br/>
        <InputGroup>
            <InputGroupAddon id="addEmployeeInfo">Last Name:</InputGroupAddon>
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