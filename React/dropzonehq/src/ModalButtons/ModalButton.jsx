import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import ModalDialog from '../ModalDialog.jsx';
import { reactstrapColors, reactstrapButtonSizes } from '../reactstrapStyles.js';

/*
  A ModalButton is a button that, when clicked, displays a modal
  with a title area, a content area, and 2 buttons: a primary button,
  (whose text and onClick are controlled via props), and a cancel button
  which always says 'Cancel' and has an onClick of closing the modal.

  The text on the button that launches the modal is controlled via buttonText prop.
  The title, content, button text, and button action inside the modal can be 
  controlled via the corresponding props (they all start with 'modal', 
  see propTypes at bottom)
*/
export default class ModalButton extends React.Component {

  //constructor (This is a stateful component)
    constructor(props) {
       super(props);
       this.state = {
         open: false
       }
       this.toggleModal = this.toggleModal.bind(this);
       this.verify = this.verify.bind(this);       
    }
 
    //change the state to toggle the modal's visibility
    toggleModal() {
       this.setState({
         open: !this.state.open
       });
    }

    verify(){
      if(this.props.modalPrimaryClick())
        this.toggleModal();
    }
 
    //render the button and the modal inside a div using all relevant props.
    //note that content is passed to the modal via props.children
    render() {
       return (
          <div>
              <Button size={this.props.buttonSize} color={this.props.buttonColor} onClick={this.toggleModal}>{this.props.buttonText}</Button>
            <ModalDialog  title={this.props.modalTitle} 
                          isOpen={this.state.open} 
                          onCancelClick={this.toggleModal.bind(this)}
                          primaryButtonText={this.props.modalPrimaryButtonText} 
                          onPrimaryClick={this.verify}>
                  {this.props.modalContent} 
            </ModalDialog>
          </div>
        );
     }
 }

 ModalButton.propTypes = {
   buttonSize: PropTypes.oneOf(reactstrapButtonSizes).isRequired, //the size of the outer button
   buttonColor: PropTypes.oneOf(reactstrapColors).isRequired, //the color of the outer button
   buttonText: PropTypes.string.isRequired, //the text of the outer button
   modalTitle: PropTypes.string.isRequired, //the title of the modal that the outer button launches
   modalContent: PropTypes.oneOfType([ //the content inside the body of the modal
     PropTypes.string,
     PropTypes.element
   ]).isRequired,
   modalPrimaryButtonText: PropTypes.string.isRequired, //the text of the button that's inside the modal
   modalPrimaryClick: PropTypes.func.isRequired //the function that gets called when the button in the modal is clicked
 }