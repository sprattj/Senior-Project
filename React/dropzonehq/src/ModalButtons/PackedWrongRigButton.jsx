import React from 'react';
import { Form } from 'reactstrap';
import ModalButton from './ModalButton.jsx';
import RigDropdown from '../Dropdowns/RigDropdown.jsx';
import PlaneLoadDropdown from '../Dropdowns/PlaneLoadDropdown.jsx';
import InstructorDropdown from '../Dropdowns/InstructorDropdown.jsx';
import ProblemTypesDropdown from '../Dropdowns/ProblemTypesDropdown.jsx';

/*
  A PackedWrongRigButton is a button for reporting that an employee
  marked the wrong rig as packed.
*/
export default class PackedWrongRigButton extends React.Component {
   
  authorize(){
    console.log("Authorized");
  }
 
    render() {
      const modalContent = <Form><RigDropdown/><ProblemTypesDropdown/></Form>;
       return (
           <ModalButton buttonSize="lg" buttonColor="danger" buttonText={"I packed the wrong rig"} 
                        modalTitle={"Rig Packing Correction"}
                        modalContent={modalContent}
                        modalPrimaryButtonText="Signout"
                        modalPrimaryClick={this.authorize}/>
        );
     }
 }