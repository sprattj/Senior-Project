import React from 'react';
import { Form, Input, InputGroup, InputGroupAddon } from 'reactstrap';
import ModalWithVerify from '../ModalWithVerify.jsx';



export default class RentButton extends React.Component {

  constructor(props) {
    super(props);
    //bind our onchange methods so they can be passed properly 
    //with this.methodName from the onChange props in render
    this.rentItem = this.rentItem.bind(this);
    this.renterNameChange = this.renterNameChange.bind(this);
    
    //keep state for the values of the components in this modal
    this.state = {
        renterName: "testName"
    }
  }

  rentItem() {
    this.props.rent(this.props.index, this.state.renterName, this.props.item_id)
  }

  renterNameChange(event) {
    console.log(event.target.value);
    this.setState({
      renterName: event.target.value
    })
  }  

  render() {
    const modalContent =
      <Form>        
        <InputGroup>
          <InputGroupAddon >Renter Name </InputGroupAddon>
          <Input id="renterName" type="name" pattern="[a-z]*" onChange={this.renterNameChange} />
        </InputGroup>
      </Form>;
    return (
      <ModalWithVerify
        mainButtonColor="primary"
        mainButtonText="Rent"
        modalButtonText="Rent"
        modalTitle="Rent Item"
        ID="Rent"
        modalContent={modalContent}
        popoverTitle="Rent Item"
        verify={this.rentItem}
        pinChanged={this.props.pinChanged}
      />
    );
  }
}