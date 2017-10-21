import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
 

/*A ModalDialog is a Reactstrap Modal that has a title, body content, 
  and 2 buttons: 
    1 whose action&text are controlled via props, 
    1 whose text is always 'Cancel' and whose action is controlled via props.
*/
 export default class ModalDialog extends React.Component {
     render() {
       return (
          <Modal toggle={this.props.onCancelClick} isOpen={this.props.isOpen}>
          <ModalHeader>{this.props.title}</ModalHeader>
          <ModalBody>
            {this.props.children}
          </ModalBody>
          <ModalFooter>
            <Button id={this.props.primaryButtonID} color="primary" onClick={this.props.onPrimaryClick}>{this.props.primaryButtonText}</Button>{' '}
            <Button color="secondary" onClick={this.props.onCancelClick}>Cancel</Button>
          </ModalFooter>
        </Modal>
       );
     }
 }

 ModalDialog.propTypes = {
    isOpen: PropTypes.bool.isRequired, //whether the modal is open
    title: PropTypes.string.isRequired, //the title at the top of the modal
    onPrimaryClick: PropTypes.func.isRequired, //the function to perform when the primary button is clicked
    primaryButtonText: PropTypes.string.isRequired, //the text on the primary button
    onCancelClick: PropTypes.func.isRequired //the function to perform when the cancel button is clicked
  }