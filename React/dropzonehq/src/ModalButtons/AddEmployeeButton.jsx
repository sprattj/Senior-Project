import React from 'react';
import ModalButton from './ModalButton.jsx';
import {Form, FormGroup, Input, Label, Row, Col,InputGroup, InputGroupAddon} from 'reactstrap';

export default class AddEmployeeButton extends React.Component {
   
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
        <br/>             
       <Col>
       <h3>Job(s)</h3>
        <FormGroup check>
          <Row>
            <Col>
            <Label check>
             <Input type="checkbox" />{' '}
              Rigger
            </Label>
            </Col>
            <Col>
            <Label check>
              <Input type="checkbox" />{' '}
              Loft Head
            </Label>
            </Col>  
            <Col>    
            <Label>
              <Input type="checkbox" />{' '}
              Loft Employee
            </Label>
            </Col>
         </Row>   
          <Row>
            <Col>
            <Label check>
             <Input type="checkbox" />{' '}
              Tandem Instructor
            </Label>
            </Col>
            <Col>
            <Label check>
              <Input type="checkbox" />{' '}
              AFP Instructor
            </Label>
            </Col>  
            <Col>    
            <Label>
              <Input type="checkbox" />{' '}
              Packer
            </Label>
            </Col>
         </Row> 
          <Row>
            <Col>
            <Label check>
             <Input type="checkbox" />{' '}
              Manifest
            </Label>
            </Col>
            <Col>
            <Label check>
              <Input type="checkbox" />{' '}
              Videographer
            </Label>
            </Col>  
            <Col>    
            <Label>
              <Input type="checkbox" />{' '}
              Hanger Master
            </Label>
            </Col>
         </Row>
         <Row>
            <Col>
            <Label check>
             <Input type="checkbox" />{' '}
              Administrator
            </Label>
            </Col>
         </Row>    
        </FormGroup>
        </Col>
       </Form>;      
       return (
           <ModalButton buttonSize="md" buttonColor={"primary"} buttonText={"New Employee"} modalTitle={"New Employee"}
                        modalContent={modalContent}
                        modalPrimaryButtonText="Add"
                        modalPrimaryClick={this.authorize}/>
        );
     }
 }